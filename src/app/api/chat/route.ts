import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "cohere/north-mini-code:free";

    if (!apiKey) {
      return NextResponse.json({ error: "OpenRouter API Key is missing on the server" }, { status: 500 });
    }

    // System instruction prompt to strictly enforce role and domain knowledge
    const systemPrompt = {
      role: "system",
      content: `You are the Agentive Customer Support and AI Agentic/Automation Consultant. Your name is Agentive Advisor.

AGENTIVE INFO & KNOWLEDGE BASE:
- Agentive is an AI automation platform that deploys custom AI Agents to automate business operations.
- Operational Domains: Customer Support (automatic ticket resolution), Sales Operations (lead scoring & CRM syncing), Inventory Syncing (Shopify, WooCommerce, ERP), and Security Audits (anomaly checks).
- Active Integrations: Shopify (order updates, stock triggers), Hubspot (lead data mapping), Slack (notifications/alerts), database cron updates.
- Portal Features:
  - Overview: Bento grid KPIs, status (Active/Idle), remaining subscription countdown, live activity feed logs.
  - AI Consultation (this chat): Continuously analyze systems to suggest workflow and automation improvements.
  - Performance Reports: SVG accuracy charts, CSS weekly savings stats, and domain distribution breakdown.
  - Book Consultation: Interactive calendar to book a 30-min call with support engineers via Google Meet.
  - Subscription & Payments: Cycle renewal checkout via Stripe, billing statements log.
  - API & Configuration: Generate webhook credentials, adjust reasoning depth (speed vs quality sliders), and toggle active integrations.

CRITICAL DOMAIN-LOCK CONSTRAINTS:
1. You are ONLY allowed to answer questions related to Agentive, AI agents, and AI automation.
2. If the user asks about ANYTHING else (including but not limited to: cooking recipes, general history, general geography, unrelated programming/code scripts like sorting arrays, explaining physics, writing poems, general trivia, personal questions), you MUST politely refuse.
3. Response Template for Off-Domain queries: "I am sorry, but as your Agentive AI Advisor, I can only answer questions related to Agentive systems, AI agents, and workflow automations. Please let me know how I can help optimize your business processes!" (If the user asks in Indonesian, translate this refusal template to Indonesian: "Mohon maaf, sebagai AI Advisor Agentive, saya hanya dapat menjawab pertanyaan terkait sistem Agentive, AI agent, dan otomatisasi alur kerja. Silakan beri tahu saya bagaimana saya bisa membantu mengoptimalkan proses bisnis Anda!")
4. Keep your tone professional, structured, helpful, and concise. Use Markdown formatting (lists, bolding) to make answers easy to scan.
5. LANGUAGE ADAPTABILITY: You MUST respond in the same language used by the user in their query (e.g. if they ask in Indonesian, answer in Indonesian; if they ask in English, answer in English).`
    };

    // Prepare message payload for OpenRouter
    // Next.js client history is structured as { role, text }, we map to OpenRouter's { role, content }
    const formattedMessages = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text
    }));

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://client.agentive.com", // Site URL for OpenRouter ranking
        "X-Title": "Agentive Client Portal",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: [systemPrompt, ...formattedMessages],
        temperature: 0.3, // Lower temperature for more consistent, constraint-abiding responses
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API error:", errorText);
      return NextResponse.json({ error: "Failed to fetch response from AI model" }, { status: response.status });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I couldn't process that response.";

    return NextResponse.json({ text: reply });
  } catch (error: any) {
    console.error("Chat API route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
