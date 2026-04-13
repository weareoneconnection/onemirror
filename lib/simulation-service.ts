import { enrichWithOneAI } from "@/lib/oneai";
import { runRuleSimulation } from "@/lib/world-engine";
import type { MirrorResult } from "@/types/mirror";

export async function runMirrorSimulation(params: {
  id: string;
  inputText: string;
  normalizedInput: string;
  source?: string;
}): Promise<MirrorResult> {
  const base = runRuleSimulation(params.inputText, params.normalizedInput, params.id, params.source);
  const enhancement = await enrichWithOneAI(base);

  if (!enhancement) {
    return base;
  }

  return {
    ...base,
    summary: enhancement.summary,
    shockLine: enhancement.shockLine,
    consequences: enhancement.consequences
  };
}
