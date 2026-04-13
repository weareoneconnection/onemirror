import { prisma } from "@/lib/prisma";
import type { MirrorResult } from "@/types/mirror";

export async function saveResult(result: MirrorResult): Promise<MirrorResult> {
  await prisma.mirrorResult.upsert({
    where: { id: result.id },
    update: {
      inputText: result.inputText,
      normalizedInput: result.normalizedInput,
      worldType: result.worldType,
      summary: result.summary,
      shockLine: result.shockLine,
      consequencesJson: JSON.stringify(result.consequences),
      trustScore: result.scores.trust,
      cooperationScore: result.scores.cooperation,
      empathyScore: result.scores.empathy,
      stabilityScore: result.scores.stability,
      conflictScore: result.scores.conflict,
      opennessScore: result.scores.openness,
      extractionScore: result.scores.extraction,
      longTermismScore: result.scores.longTermism,
      source: result.source ?? null
    },
    create: {
      id: result.id,
      inputText: result.inputText,
      normalizedInput: result.normalizedInput,
      worldType: result.worldType,
      summary: result.summary,
      shockLine: result.shockLine,
      consequencesJson: JSON.stringify(result.consequences),
      trustScore: result.scores.trust,
      cooperationScore: result.scores.cooperation,
      empathyScore: result.scores.empathy,
      stabilityScore: result.scores.stability,
      conflictScore: result.scores.conflict,
      opennessScore: result.scores.openness,
      extractionScore: result.scores.extraction,
      longTermismScore: result.scores.longTermism,
      source: result.source ?? null
    }
  });

  return result;
}

export async function getResult(id: string): Promise<MirrorResult | null> {
  const row = await prisma.mirrorResult.findUnique({ where: { id } });
  if (!row) return null;

  return {
    id: row.id,
    inputText: row.inputText,
    normalizedInput: row.normalizedInput,
    worldType: row.worldType as MirrorResult["worldType"],
    summary: row.summary,
    shockLine: row.shockLine,
    consequences: JSON.parse(row.consequencesJson) as string[],
    scores: {
      trust: row.trustScore,
      cooperation: row.cooperationScore,
      empathy: row.empathyScore,
      stability: row.stabilityScore,
      conflict: row.conflictScore,
      openness: row.opennessScore,
      extraction: row.extractionScore,
      longTermism: row.longTermismScore
    },
    source: row.source,
    createdAt: row.createdAt.toISOString()
  };
}
