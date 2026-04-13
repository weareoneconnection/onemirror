export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResult } from "@/lib/db";
import { ResultActions } from "@/components/result-actions";
import { ResultPosterDownload } from "@/components/result-poster-download";
type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getResult(id);

  if (!result) {
    return {
      title: "Result Not Found | OneAI Mirror",
      description: "This simulation result could not be found."
    };
  }

  const worldType = formatWorldType(result.worldType);
  const title = `${worldType} | OneAI Mirror`;
  const description =
    result.shockLine || result.summary || "See the world your mind creates.";

  const ogUrl = `/api/og?world=${encodeURIComponent(worldType)}&summary=${encodeURIComponent(
    truncateText(description, 140)
  )}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [ogUrl],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl]
    }
  };
}

export default async function ResultPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getResult(id);

  if (!result) notFound();

  const worldType = formatWorldType(result.worldType);
  const verdict = getVerdict(result.scores);
  const scoreCards = [
    { label: "Trust Index", value: result.scores.trust, tone: getScoreTone(result.scores.trust, false) },
    { label: "Cooperation", value: result.scores.cooperation, tone: getScoreTone(result.scores.cooperation, false) },
    { label: "Empathy", value: result.scores.empathy, tone: getScoreTone(result.scores.empathy, false) },
    { label: "Stability", value: result.scores.stability, tone: getScoreTone(result.scores.stability, false) },
    { label: "Conflict Risk", value: result.scores.conflict, tone: getScoreTone(result.scores.conflict, true) },
    { label: "Openness", value: result.scores.openness, tone: getScoreTone(result.scores.openness, false) }
  ];

  return (
    <main className="page-shell">
      <div className="container result-shell" style={{ maxWidth: 1120 }}>
        <section
          className="panel result-header"
          style={{
            position: "relative",
            overflow: "hidden",
            padding: 32,
            borderRadius: 32
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at top right, rgba(143,211,255,0.16), transparent 28%), radial-gradient(circle at bottom left, rgba(122,141,255,0.16), transparent 24%)",
              pointerEvents: "none"
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                alignItems: "center",
                marginBottom: 16
              }}
            >
              <span className="badge">OneAI Mirror</span>
              <span className="badge">Your World Simulation</span>
              <span className="badge">{new Date(result.createdAt).toLocaleString()}</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.3fr 0.7fr",
                gap: 24,
                alignItems: "start"
              }}
            >
              <div>
                <div className="kicker">Civilization Outcome</div>
                <h1 className="result-title" style={{ marginBottom: 14 }}>
                  {worldType}
                </h1>
                <p className="result-summary" style={{ fontSize: 19 }}>
                  {result.summary}
                </p>
                <p className="shock" style={{ marginTop: 22 }}>
                  {result.shockLine}
                </p>
              </div>

              <div
                className="panel"
                style={{
                  padding: 20,
                  borderRadius: 24,
                  background: "rgba(255,255,255,0.04)"
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: 12
                  }}
                >
                  Verdict
                </div>

                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: "-0.04em",
                    marginBottom: 12
                  }}
                >
                  {verdict.label}
                </div>

                <p
                  style={{
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    margin: 0
                  }}
                >
                  {verdict.text}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16
          }}
        >
          <div className="panel section-card" style={{ borderRadius: 28 }}>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              Input
            </h2>
            <blockquote className="input-quote" style={{ fontSize: 18 }}>
              “{result.inputText}”
            </blockquote>
          </div>

          <div className="panel section-card" style={{ borderRadius: 28 }}>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              World Type
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  letterSpacing: "-0.04em"
                }}
              >
                {worldType}
              </div>
              <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.75 }}>
                This is the civilization pattern your mindset tends to produce when scaled across society.
              </p>
            </div>
          </div>
        </section>

        <section className="panel section-card" style={{ borderRadius: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 16
            }}
          >
            <h2 className="section-title" style={{ margin: 0 }}>
              World Metrics
            </h2>
            <span className="badge">Signal Profile</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 14
            }}
          >
            {scoreCards.map((item) => (
              <Metric key={item.label} label={item.label} value={item.value} tone={item.tone} />
            ))}
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16
          }}
        >
          <div className="panel section-card" style={{ borderRadius: 28 }}>
            <h2 className="section-title">Consequences</h2>
            <ul className="list" style={{ marginTop: 12 }}>
              {result.consequences.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="panel section-card" style={{ borderRadius: 28 }}>
            <h2 className="section-title">Civilization Reading</h2>
            <div
              style={{
                display: "grid",
                gap: 12
              }}
            >
              <InsightRow
                title="Social Trust"
                text={readTrust(result.scores.trust)}
              />
              <InsightRow
                title="Coordination Capacity"
                text={readCooperation(result.scores.cooperation)}
              />
              <InsightRow
                title="Conflict Outlook"
                text={readConflict(result.scores.conflict)}
              />
            </div>
          </div>
        </section>

        <section className="panel section-card" style={{ borderRadius: 28 }}>
          <ResultActions
            resultId={result.id}
            summary={result.summary}
            worldType={worldType}
          />
        </section>
        <section
  className="panel section-card"
  style={{
    borderRadius: 28,
    background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))"
  }}
>
  <ResultPosterDownload
    inputText={result.inputText}
    worldType={worldType}
    summary={result.summary}
    shockLine={result.shockLine}
    scores={{
      trust: result.scores.trust,
      cooperation: result.scores.cooperation,
      empathy: result.scores.empathy,
      stability: result.scores.stability,
      conflict: result.scores.conflict,
      openness: result.scores.openness
    }}
  />
</section>
        <div
          className="footer-actions"
          style={{
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Link href="/" className="button button-secondary">
            Try Another Reality
          </Link>

          <div style={{ color: "var(--muted)", fontSize: 14 }}>
            One thought. One world. One consequence.
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .result-hero-grid,
            .result-two-col,
            .result-metrics-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </main>
  );
}

function Metric({
  label,
  value,
  tone
}: {
  label: string;
  value: number;
  tone: "good" | "mid" | "danger";
}) {
  const toneMap = {
    good: {
      border: "rgba(119,230,165,0.28)",
      glow: "rgba(119,230,165,0.08)"
    },
    mid: {
      border: "rgba(255,209,102,0.28)",
      glow: "rgba(255,209,102,0.08)"
    },
    danger: {
      border: "rgba(255,107,107,0.28)",
      glow: "rgba(255,107,107,0.08)"
    }
  };

  return (
    <div
      className="metric"
      style={{
        borderRadius: 24,
        border: `1px solid ${toneMap[tone].border}`,
        background: toneMap[tone].glow
      }}
    >
      <span className="metric-label">{label}</span>
      <div className="metric-value">{value}%</div>
      <div
        style={{
          height: 8,
          borderRadius: 999,
          background: "rgba(255,255,255,0.07)",
          overflow: "hidden",
          marginTop: 14
        }}
      >
        <div
          style={{
            width: `${Math.max(4, value)}%`,
            height: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg, rgba(143,211,255,0.95), rgba(122,141,255,0.95))"
          }}
        />
      </div>
    </div>
  );
}

function InsightRow({ title, text }: { title: string; text: string }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)"
      }}
    >
      <div
        style={{
          fontSize: 13,
          color: "var(--muted)",
          marginBottom: 8,
          textTransform: "uppercase",
          letterSpacing: "0.12em"
        }}
      >
        {title}
      </div>
      <div style={{ lineHeight: 1.75, color: "#dce6f5" }}>{text}</div>
    </div>
  );
}

function formatWorldType(worldType: string): string {
  return worldType
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1)}…`;
}

function getScoreTone(
  value: number,
  inverse: boolean
): "good" | "mid" | "danger" {
  if (inverse) {
    if (value >= 70) return "danger";
    if (value >= 40) return "mid";
    return "good";
  }

  if (value >= 70) return "good";
  if (value >= 40) return "mid";
  return "danger";
}

function getVerdict(scores: {
  trust: number;
  cooperation: number;
  empathy: number;
  stability: number;
  conflict: number;
  openness: number;
}) {
  const positive = scores.trust + scores.cooperation + scores.empathy + scores.stability + scores.openness;
  const negative = scores.conflict;

  if (positive >= 350 && negative <= 35) {
    return {
      label: "Civilization Upgrade",
      text: "This pattern increases the probability of durable trust, resilient systems, and meaningful collective progress."
    };
  }

  if (negative >= 75) {
    return {
      label: "Structural Fragmentation",
      text: "Scaled across society, this mindset increases breakdown risk. Coordination weakens, institutions harden, and conflict spreads faster."
    };
  }

  return {
    label: "Unstable Mixed World",
    text: "This mindset can produce partial order, but without enough coherence to guarantee flourishing at civilization scale."
  };
}

function readTrust(value: number): string {
  if (value >= 70) return "Trust compounds. People assume cooperation is possible, which lowers friction across society.";
  if (value >= 40) return "Trust exists, but remains conditional. Coordination works, though it is not deeply resilient.";
  return "Trust is weak. People default to defense, suspicion, and short-term protection.";
}

function readCooperation(value: number): string {
  if (value >= 70) return "Coordination becomes natural. Groups can act with more speed, less noise, and higher shared leverage.";
  if (value >= 40) return "Some cooperation is possible, but momentum is fragile and often dependent on context.";
  return "Collective action struggles. People speak, react, and compete, but rarely move as one.";
}

function readConflict(value: number): string {
  if (value >= 70) return "Conflict becomes systemic. Friction is no longer occasional; it becomes part of the structure itself.";
  if (value >= 40) return "Tension remains manageable, but pressure can escalate quickly under stress.";
  return "Conflict stays relatively contained. Energy is more available for building than for fighting.";
}
