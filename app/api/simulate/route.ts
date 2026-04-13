import { NextResponse } from "next/server";
import { z } from "zod";

import { makeId, normalizeInput } from "@/lib/utils";
import { saveResult } from "@/lib/db";
import { runOneMirror } from "@/lib/oneai";

const simulateSchema = z.object({
  input: z.string().min(3).max(280)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = simulateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input."
        },
        { status: 400 }
      );
    }

    const inputText = parsed.data.input;
    const normalizedInput = normalizeInput(inputText);
    const id = makeId();

    const aiResult = await runOneMirror(normalizedInput);

    const result = {
      id,
      inputText,
      normalizedInput,
      worldType: aiResult.worldType,
      summary: aiResult.summary,
      shockLine: aiResult.shockLine,
      consequences: aiResult.consequences,
      scores: aiResult.scores,
      createdAt: new Date().toISOString()
    };

    await saveResult(result);

    return NextResponse.json({
      ok: true,
      resultId: id,
      result
    });
  } catch (error) {
    console.error("simulate route error", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to simulate world."
      },
      { status: 500 }
    );
  }
}
