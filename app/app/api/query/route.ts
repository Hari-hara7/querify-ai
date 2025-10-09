import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/db";
import { isSafeSQL } from "@/utils/sqlValidator";
import { getDynamicSchema } from "@/utils/getSchema";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question) return NextResponse.json({ error: "Question required" }, { status: 400 });

    const schema = await getDynamicSchema();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
Convert the user's question to a safe PostgreSQL SELECT query using this schema:
${schema}

Rules:
- Only SELECT queries
- Use JOINs if needed
- Add LIMIT 1000 if not specified
- Output only SQL

Question: "${question}"
`;

    const result = await model.generateContent(prompt);

    // Safe extraction for Gemini
    let sql = result.candidates?.[0]?.content?.[0]?.text?.trim() || "";

    // fallback if AI fails
    if (!sql) sql = "SELECT * FROM orders LIMIT 10;";

    // Clean up code blocks
    sql = sql.replace(/```sql|```/gi, "").trim();

    if (!isSafeSQL(sql)) return NextResponse.json({ error: "Unsafe SQL generated" }, { status: 400 });

    const data = await db.$queryRawUnsafe(sql);

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return NextResponse.json({
        sql,
        data: [],
        message: "No data found for this query."
      });
    }

    return NextResponse.json({ sql, data });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}
