import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt } = await req.json();

    const response = await fetch("https://sodeom.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer free",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Sodeom API error:", errorText);
      return NextResponse.json(
        { reply: "Sorry, I'm having trouble connecting right now. Please try again in a moment." },
        { status: 200 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { reply: "I understand your question. For more details, please visit our website or call us directly." },
        { status: 200 }
      );
    }

    return NextResponse.json({ reply: reply.trim() });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "Sorry, I encountered an error. Please try again." },
      { status: 200 }
    );
  }
}
