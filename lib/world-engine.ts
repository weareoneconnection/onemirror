import { clamp } from "@/lib/utils";
import type { MirrorResult, MirrorScores, WorldType } from "@/types/mirror";

type DerivedWorld = {
  worldType: WorldType;
  summary: string;
  shockLine: string;
  consequences: string[];
};

function hasAny(text: string, keywords: string[]): boolean {
  return keywords.some((word) => text.includes(word));
}

export function scoreInput(input: string): MirrorScores {
  const text = input.toLowerCase();

  let trust = 50;
  let cooperation = 50;
  let empathy = 50;
  let stability = 50;
  let conflict = 50;
  let openness = 50;
  let extraction = 50;
  let longTermism = 50;

  if (hasAny(text, ["don't trust", "do not trust", "trust nobody", "trust no one", "suspicious"])) {
    trust -= 35;
    cooperation -= 18;
    conflict += 20;
    openness -= 18;
  }

  if (hasAny(text, ["only care about money", "only care about winning", "selfish", "use people", "profit first"])) {
    empathy -= 30;
    extraction += 30;
    cooperation -= 15;
    conflict += 15;
    longTermism -= 10;
  }

  if (hasAny(text, ["help people", "care for others", "support others", "kind", "compassion"])) {
    empathy += 28;
    trust += 18;
    cooperation += 22;
    stability += 12;
    extraction -= 18;
  }

  if (hasAny(text, ["avoid conflict", "peace", "understand others", "listen", "forgive"])) {
    conflict -= 20;
    empathy += 14;
    trust += 10;
    cooperation += 12;
    stability += 8;
  }

  if (hasAny(text, ["build", "long term", "future", "patient", "sustainable"])) {
    longTermism += 24;
    stability += 16;
    cooperation += 8;
  }

  if (hasAny(text, ["control", "efficiency", "strict order", "obedience"])) {
    stability += 14;
    openness -= 24;
    empathy -= 8;
    trust -= 5;
  }

  if (hasAny(text, ["open", "free", "curious", "creative", "explore"])) {
    openness += 22;
    trust += 6;
  }

  return {
    trust: clamp(trust),
    cooperation: clamp(cooperation),
    empathy: clamp(empathy),
    stability: clamp(stability),
    conflict: clamp(conflict),
    openness: clamp(openness),
    extraction: clamp(extraction),
    longTermism: clamp(longTermism)
  };
}

export function deriveWorld(scores: MirrorScores): DerivedWorld {
  const { trust, cooperation, empathy, stability, conflict, openness, extraction, longTermism } = scores;

  if (trust < 25 && cooperation < 25 && conflict > 70) {
    return {
      worldType: "fragmented-collapse",
      summary: "Low trust spreads through every institution. Cooperation breaks down, fear replaces coordination, and society fragments into isolated survival units.",
      shockLine: "This mindset does not merely weaken society. It makes shared civilization unstable.",
      consequences: [
        "Institutions lose legitimacy.",
        "People optimize for self-protection instead of shared progress.",
        "Economic and social systems become brittle under pressure."
      ]
    };
  }

  if (trust < 35 && openness < 35 && conflict > 55) {
    return {
      worldType: "guarded-tribalism",
      summary: "People withdraw into defensive groups. Loyalty narrows, outsiders become threats, and coordination happens only inside small protected circles.",
      shockLine: "This world can function locally, but it struggles to build anything bigger than a tribe.",
      consequences: [
        "Shared identity shrinks.",
        "Collaboration across groups becomes rare.",
        "Collective progress slows under suspicion."
      ]
    };
  }

  if (stability > 65 && openness < 30 && empathy < 45) {
    return {
      worldType: "cold-efficiency-state",
      summary: "Systems become highly ordered, but human warmth is sacrificed. Efficiency improves, yet emotional life and openness are constrained.",
      shockLine: "This world survives by control, not by trust.",
      consequences: [
        "Order is maintained through rigid structures.",
        "Creativity and dissent decline.",
        "Human connection becomes secondary to system performance."
      ]
    };
  }

  if (extraction > 70 && empathy < 35) {
    return {
      worldType: "extractive-economy",
      summary: "Everything becomes transactional. People are valued for utility, not dignity, and long-term trust erodes under constant extraction.",
      shockLine: "This world can look rich on the surface while becoming spiritually and socially hollow.",
      consequences: [
        "Relationships become instruments.",
        "Short-term wins override long-term health.",
        "Wealth concentrates while trust decays."
      ]
    };
  }

  if (cooperation < 45 && extraction > 55 && trust < 50) {
    return {
      worldType: "hyper-competitive-order",
      summary: "Society becomes a permanent contest. Winning matters more than belonging, and performance outranks solidarity.",
      shockLine: "This world produces motion, but not meaning.",
      consequences: [
        "Burnout becomes structural.",
        "Collective resilience weakens.",
        "People compare constantly and connect less deeply."
      ]
    };
  }

  if (cooperation > 72 && trust > 68 && empathy > 62 && longTermism > 55) {
    return {
      worldType: "cooperative-civilization",
      summary: "Trust compounds across society. People coordinate more easily, institutions strengthen, and progress becomes more resilient over time.",
      shockLine: "This mindset does not just improve your life. It upgrades civilization itself.",
      consequences: [
        "Coordination costs fall.",
        "Communities solve problems faster.",
        "Long-term progress becomes more achievable."
      ]
    };
  }

  if (empathy > 72 && trust > 60) {
    return {
      worldType: "compassion-network",
      summary: "A culture of care spreads through the network. People feel seen, supported, and more willing to contribute beyond immediate self-interest.",
      shockLine: "This world grows because people stop treating each other as obstacles.",
      consequences: [
        "Mutual support becomes normal.",
        "Conflict de-escalates faster.",
        "Belonging strengthens contribution."
      ]
    };
  }

  return {
    worldType: "resilient-open-world",
    summary: "This world remains open, adaptive, and capable of learning. It is not perfect, but it stays flexible enough to recover and evolve.",
    shockLine: "This mindset creates a world that can bend without breaking.",
    consequences: [
      "Openness supports innovation.",
      "Trust remains repairable under pressure.",
      "People keep enough freedom to experiment and rebuild."
    ]
  };
}

export function runRuleSimulation(inputText: string, normalizedInput: string, id: string, source?: string): MirrorResult {
  const scores = scoreInput(normalizedInput);
  const world = deriveWorld(scores);

  return {
    id,
    inputText,
    normalizedInput,
    worldType: world.worldType,
    summary: world.summary,
    shockLine: world.shockLine,
    consequences: world.consequences,
    scores,
    source: source ?? null,
    createdAt: new Date().toISOString()
  };
}
