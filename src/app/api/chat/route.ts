import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

const N8N_TIMEOUT_MS = 30_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getRateLimitKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  return ip;
}

function checkRateLimit(key: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function isValidMessages(messages: unknown): messages is Array<{ sender: string; text: string }> {
  if (!Array.isArray(messages)) return false;
  return messages.every(
    (m) =>
      m !== null &&
      typeof m === "object" &&
      typeof (m as Record<string, unknown>).sender === "string" &&
      typeof (m as Record<string, unknown>).text === "string" &&
      ((m as Record<string, unknown>).text as string).length <= 4000
  );
}

export async function POST(request: Request) {
  const rateKey = getRateLimitKey(request);
  const limit = checkRateLimit(rateKey);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { messages } = (body ?? {}) as { messages?: unknown };
  if (!isValidMessages(messages)) {
    return NextResponse.json(
      { error: "Invalid messages array" },
      { status: 400 }
    );
  }

  const n8nWebhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;
  if (!n8nWebhookUrl) {
    return NextResponse.json(
      { error: "N8N Chat Webhook URL is missing on the server" },
      { status: 500 }
    );
  }

  const cookieHeader = request.headers.get("cookie") || "";
  const sessionMatch = cookieHeader.match(/(?:^| )chat-session-id=([^;]+)/);
  let sessionId = sessionMatch?.[1] ?? null;
  const isNewSession = !sessionId || messages.length <= 2;

  if (isNewSession) {
    sessionId = `session_${randomUUID()}`;
  }

  const lastUserMessage = [...messages].reverse().find((m) => m.sender === "user");
  const userPrompt = lastUserMessage ? lastUserMessage.text : "";

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), N8N_TIMEOUT_MS);

  let n8nResponse: Response;
  try {
    n8nResponse = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userPrompt, sessionId }),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    const isAbort = err instanceof Error && err.name === "AbortError";
    return NextResponse.json(
      { error: isAbort ? "Upstream request timed out" : "Upstream fetch failed" },
      { status: 504 }
    );
  }
  clearTimeout(timeoutId);

  const n8nText = await n8nResponse.text();

  if (!n8nResponse.ok) {
    return NextResponse.json(
      { error: `Failed to fetch response from n8n` },
      { status: n8nResponse.status }
    );
  }

  let data: { text?: string };
  try {
    data = JSON.parse(n8nText);
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON response from automation server" },
      { status: 502 }
    );
  }
  const reply = data.text || "I couldn't process that response.";

  const response = NextResponse.json({ text: reply });

  if (isNewSession && sessionId) {
    response.cookies.set("chat-session-id", sessionId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return response;
}
