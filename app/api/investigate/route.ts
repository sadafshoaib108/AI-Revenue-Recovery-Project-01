import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();

    const prompt = `You are an ecommerce revenue analyst.

A problem was detected in an online store:
Problem: ${title}
Details: ${description}

Respond ONLY in this JSON format, no extra text, no markdown:
{
  "cause": "likely root cause, 1-2 sentences",
  "recommendation": "specific recommended action, 1-2 sentences",
  "impact": "HIGH, MEDIUM, or LOW"
}`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    console.log("GROQ RAW RESPONSE:", JSON.stringify(data, null, 2));

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const raw = data.choices?.[0]?.message?.content ?? "{}";
    const clean = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("AI investigation error:", err);
    return NextResponse.json(
      { error: "Failed to investigate problem" },
      { status: 500 }
    );
  }
}