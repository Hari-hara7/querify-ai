import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { sql } = body || {};

		if (!sql || typeof sql !== "string") {
			return NextResponse.json({ error: "`sql` is required in the request body" }, { status: 400 });
		}

		if (!process.env.GEMINI_API_KEY) {
			return NextResponse.json({ error: "API key not configured. Set GEMINI_API_KEY." }, { status: 500 });
		}

		const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
		const model = genAI.getGenerativeModel({
			model: "gemini-2.5-flash",
			generationConfig: { temperature: 0.2, maxOutputTokens: 400 },
		});

		const prompt = `Explain the following PostgreSQL query in clear, concise English. Return a JSON object with keys: explanation (string), what_it_returns (string), important_conditions (array of strings), potential_issues (array of strings). Only output valid JSON.\n\nSQL:\n${sql}`;

		const result = await model.generateContent(prompt);
		const text = result.response?.text()?.trim() || "";

		// Try to parse JSON returned by the model; fall back to raw text if parsing fails
		try {
			const parsed = JSON.parse(text);
			return NextResponse.json(parsed);
		} catch (e) {
			return NextResponse.json({ explanation: text });
		}
	} catch (err: any) {
		console.error("Explain API error:", err);
		return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
	}
}
