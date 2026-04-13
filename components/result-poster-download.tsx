// components/result-poster-download.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";

type Props = {
  inputText: string;
  worldType: string;
  summary: string;
  shockLine: string;
  scores: {
    trust: number;
    cooperation: number;
    empathy: number;
    stability: number;
    conflict: number;
    openness: number;
  };
};

export function ResultPosterDownload({
  inputText,
  worldType,
  summary,
  shockLine,
  scores
}: Props) {
  const posterRef = useRef<HTMLDivElement | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const shortInput = useMemo(() => truncateText(inputText, 120), [inputText]);
  const shortSummary = useMemo(() => truncateText(summary, 180), [summary]);
  const shortShock = useMemo(() => truncateText(shockLine, 110), [shockLine]);

  async function handleDownload() {
    if (!posterRef.current) return;

    try {
      setDownloading(true);

      const dataUrl = await toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        backgroundColor: "#05070a"
      });

      const link = document.createElement("a");
      link.download = `oneai-mirror-${slugify(worldType)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to download poster:", error);
    } finally {
      setDownloading(false);
    }
  }

  async function handleCopyCaption() {
    const text = [
      "I asked OneAI Mirror what happens if the whole world was like me.",
      "",
      `Result: ${worldType}.`,
      shortShock,
      "",
      "What kind of world do you create?"
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error("Failed to copy caption:", error);
    }
  }

  return (
    <div
      style={{
        display: "grid",
        gap: 18
      }}
    >
      <div
        ref={posterRef}
        style={{
          width: "100%",
          maxWidth: 920,
          margin: "0 auto",
          borderRadius: 32,
          overflow: "hidden",
          background: "#05070a",
          color: "#f5f7fb",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.38)",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 85% 12%, rgba(143,211,255,0.16), transparent 22%), radial-gradient(circle at 12% 88%, rgba(122,141,255,0.14), transparent 24%), linear-gradient(180deg, #05070a 0%, #04060a 100%)"
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: 28,
            display: "grid",
            gap: 22
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 16px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(245,247,251,0.86)",
                fontSize: 14,
                fontWeight: 700
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  border: "2px solid rgba(245,247,251,0.72)",
                  display: "inline-block"
                }}
              />
              OneAI Mirror
            </div>

            <div
              style={{
                display: "inline-flex",
                padding: "9px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.62)",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase"
              }}
            >
              World Simulation
            </div>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            <div
              style={{
                color: "rgba(143,211,255,0.96)",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 700
              }}
            >
              Civilization Outcome
            </div>

            <div
              style={{
                fontSize: 42,
                lineHeight: 0.98,
                letterSpacing: "-0.05em",
                fontWeight: 800
              }}
            >
              {worldType}
            </div>

            <div
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: "rgba(245,247,251,0.76)"
              }}
            >
              {shortSummary}
            </div>

            <div
              style={{
                fontSize: 22,
                lineHeight: 1.45,
                fontWeight: 800,
                color: "#ffffff"
              }}
            >
              {shortShock}
            </div>
          </div>

          <div
            style={{
              padding: 18,
              borderRadius: 24,
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.08)"
            }}
          >
            <div
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "rgba(255,255,255,0.52)",
                marginBottom: 10
              }}
            >
              Input
            </div>
            <div
              style={{
                fontSize: 18,
                lineHeight: 1.65,
                color: "#eaf1fb"
              }}
            >
              “{shortInput}”
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 12
            }}
          >
            <PosterMetric label="Trust" value={scores.trust} inverse={false} />
            <PosterMetric label="Cooperation" value={scores.cooperation} inverse={false} />
            <PosterMetric label="Empathy" value={scores.empathy} inverse={false} />
            <PosterMetric label="Stability" value={scores.stability} inverse={false} />
            <PosterMetric label="Conflict" value={scores.conflict} inverse />
            <PosterMetric label="Openness" value={scores.openness} inverse={false} />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "flex-end",
              flexWrap: "wrap",
              paddingTop: 4
            }}
          >
            <div style={{ display: "grid", gap: 6 }}>
              <div
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.54)"
                }}
              >
                See the world your mind creates.
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.34)"
                }}
              >
                What kind of world do you create?
              </div>
            </div>

            <div
              style={{
                padding: "12px 16px",
                borderRadius: 18,
                background:
                  "linear-gradient(135deg, rgba(143,211,255,0.16), rgba(122,141,255,0.16))",
                border: "1px solid rgba(255,255,255,0.1)",
                fontSize: 15,
                fontWeight: 700,
                color: "#f5f7fb"
              }}
            >
              oneai mirror
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div
          style={{
            color: "var(--muted)",
            fontSize: 14,
            lineHeight: 1.7
          }}
        >
          Download this result as a share-ready poster for X, Telegram, or Discord.
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap"
          }}
        >
          <button
            type="button"
            onClick={handleCopyCaption}
            className="button button-secondary"
            style={{ borderRadius: 16 }}
          >
            {copied ? "Caption Copied" : "Copy Caption"}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="button button-primary"
            style={{ borderRadius: 16 }}
            disabled={downloading}
          >
            {downloading ? "Generating..." : "Download Poster"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PosterMetric({
  label,
  value,
  inverse
}: {
  label: string;
  value: number;
  inverse: boolean;
}) {
  const tone = getScoreTone(value, inverse);

  const toneMap = {
    good: {
      border: "rgba(119,230,165,0.24)",
      glow: "rgba(119,230,165,0.08)"
    },
    mid: {
      border: "rgba(255,209,102,0.24)",
      glow: "rgba(255,209,102,0.08)"
    },
    danger: {
      border: "rgba(255,107,107,0.24)",
      glow: "rgba(255,107,107,0.08)"
    }
  };

  return (
    <div
      style={{
        borderRadius: 22,
        padding: 14,
        border: `1px solid ${toneMap[tone].border}`,
        background: toneMap[tone].glow,
        display: "grid",
        gap: 10
      }}
    >
      <div
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.56)"
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: "-0.04em"
        }}
      >
        {value}%
      </div>

      <div
        style={{
          height: 7,
          borderRadius: 999,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${Math.max(4, value)}%`,
            height: "100%",
            borderRadius: 999,
            background:
              "linear-gradient(90deg, rgba(143,211,255,0.98), rgba(122,141,255,0.98))"
          }}
        />
      </div>
    </div>
  );
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

function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1)}…`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}