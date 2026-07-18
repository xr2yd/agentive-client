import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    const n8nWebhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;
    if (!n8nWebhookUrl) {
      return NextResponse.json({ error: "N8N Chat Webhook URL is missing on the server" }, { status: 500 });
    }

    // Get or generate session ID from cookies
    const cookieHeader = request.headers.get("cookie") || "";
    const getCookie = (name: string) => {
      const match = cookieHeader.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : null;
    };

    let sessionId = getCookie("chat-session-id");
    let isNewSession = false;

    // Reset session if the chat was cleared from frontend (only containing initial msg + user msg)
    if (!sessionId || messages.length <= 2) {
      sessionId = "session_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      isNewSession = true;
    }

    // Get the last user message to send as prompt
    const lastUserMessage = [...messages].reverse().find((m: any) => m.sender === "user");
    const userPrompt = lastUserMessage ? lastUserMessage.text : "";

    // Forward the message to the n8n Webhook
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userPrompt,
        sessionId: sessionId,
      }),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error("n8n Webhook error:", errorText);
      return NextResponse.json({ error: "Failed to fetch response from n8n workflow" }, { status: n8nResponse.status });
    }

    const data = await n8nResponse.json();
    const reply = data.text || "I couldn't process that response.";

    const response = NextResponse.json({ text: reply });

    // Set cookie if it is a new/reset session
    if (isNewSession) {
      response.cookies.set("chat-session-id", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        sameSite: "lax",
      });
    }

    return response;
  } catch (error: any) {
    console.error("Chat API route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
