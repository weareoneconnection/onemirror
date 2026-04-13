import type { MirrorResult } from "@/types/mirror";

export type OneMirrorOutput = {
  worldType:
    | "fragmented-collapse"
    | "guarded-tribalism"
    | "cold-efficiency-state"
    | "extractive-economy"
    | "hyper-competitive-order"
    | "cooperative-civilization"
    | "compassion-network"
    | "resilient-open-world";
  summary: string;
  shockLine: string;
  consequences: string[];
  scores: {
    trust: number;
    cooperation: number;
    empathy: number;
    stability: number;
    conflict: number;
    openness: number;
    extraction: number;
    longTermism: number;
  };
  socialPost?: {
    hook: string;
    body: string;
    cta: string;
  };
};

type OneAIResponse = {
  success: boolean;
  attempts?: number;
  usage?: unknown;
  usageTotal?: unknown;
  data?: unknown;
  error?: string;
  details?: unknown;
  latencyMs?: number;
};

const ONEAI_API_BASE_URL = process.env.ONEAI_API_BASE_URL;
const ONEAI_API_KEY = process.env.ONEAI_API_KEY;
const ONEAI_TIMEOUT_MS = Number(process.env.ONEAI_TIMEOUT_MS || "25000");

/**
 * Call OneAI one_mirror workflow and return structured output.
 */
export async function runOneMirror(input: string): Promise<OneMirrorOutput> {
  if (!ONEAI_API_BASE_URL) {
    throw new Error("Missing ONEAI_API_BASE_URL");
  }

  if (!ONEAI_API_KEY) {
    throw new Error("Missing ONEAI_API_KEY");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ONEAI_TIMEOUT_MS);

  try {
    const response = await fetch(ONEAI_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ONEAI_API_KEY
      },
      body: JSON.stringify({
        type: "one_mirror",
        input: {
          input
        }
      }),
      signal: controller.signal,
      cache: "no-store"
    });

    let json: OneAIResponse | null = null;

    try {
      json = (await response.json()) as OneAIResponse;
    } catch {
      throw new Error(`OneAI returned non-JSON response (${response.status})`);
    }

    if (!response.ok || !json.success) {
      throw new Error(
        json?.error || `OneAI request failed with status ${response.status}`
      );
    }

    const data = json.data;

    if (!isOneMirrorOutput(data)) {
      throw new Error("OneAI returned invalid one_mirror payload");
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("This operation was aborted");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Compatibility wrapper for older code paths that expect:
 * import { enrichWithOneAI } from "@/lib/oneai"
 *
 * It takes an existing MirrorResult and overwrites text/scores/worldType
 * using OneAI output.
 */
export async function enrichWithOneAI(
  result: MirrorResult
): Promise<MirrorResult> {
  const input =
    (typeof result.normalizedInput === "string" && result.normalizedInput.trim()) ||
    result.inputText;

  const ai = await runOneMirror(input);

  return {
    ...result,
    worldType: ai.worldType,
    summary: ai.summary,
    shockLine: ai.shockLine,
    consequences: ai.consequences,
    scores: ai.scores
  };
}

function isOneMirrorOutput(value: unknown): value is OneMirrorOutput {
  if (!value || typeof value !== "object") return false;

  const v = value as Record<string, unknown>;
  const scores = v.scores as Record<string, unknown> | undefined;

  const validWorldTypes = new Set([
    "fragmented-collapse",
    "guarded-tribalism",
    "cold-efficiency-state",
    "extractive-economy",
    "hyper-competitive-order",
    "cooperative-civilization",
    "compassion-network",
    "resilient-open-world"
  ]);

  return (
    typeof v.worldType === "string" &&
    validWorldTypes.has(v.worldType) &&
    typeof v.summary === "string" &&
    typeof v.shockLine === "string" &&
    Array.isArray(v.consequences) &&
    v.consequences.every((x) => typeof x === "string") &&
    !!scores &&
    typeof scores.trust === "number" &&
    typeof scores.cooperation === "number" &&
    typeof scores.empathy === "number" &&
    typeof scores.stability === "number" &&
    typeof scores.conflict === "number" &&
    typeof scores.openness === "number" &&
    typeof scores.extraction === "number" &&
    typeof scores.longTermism === "number"
  );
}