"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  resultId: string;
  summary: string;
  worldType: string;
};

export function ResultActions({ resultId, summary, worldType }: Props) {
  const [origin, setOrigin] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const resultUrl = useMemo(() => {
    if (!origin) return "";
    return `${origin}/result/${resultId}`;
  }, [origin, resultId]);

  const shareText = useMemo(() => {
    const cleanSummary = truncateText(summary, 180);

    return [
      "I asked OneAI Mirror what happens if the whole world was like me.",
      "",
      `Result: ${worldType}.`,
      cleanSummary,
      "",
      "See yours:",
      resultUrl
    ].join("\n");
  }, [summary, worldType, resultUrl]);

  const xText = useMemo(() => {
    const cleanSummary = truncateText(summary, 120);

    return [
      "I asked OneAI Mirror what happens if the whole world was like me.",
      "",
      `Result: ${worldType}.`,
      cleanSummary,
      "",
      "See yours:"
    ].join("\n");
  }, [summary, worldType]);

  const shareToX = useMemo(() => {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      xText
    )}&url=${encodeURIComponent(resultUrl)}`;
  }, [xText, resultUrl]);

  const shareToTelegram = useMemo(() => {
    return `https://t.me/share/url?url=${encodeURIComponent(
      resultUrl
    )}&text=${encodeURIComponent(
      `I asked OneAI Mirror what happens if the whole world was like me.\n\nResult: ${worldType}.\n${truncateText(
        summary,
        140
      )}`
    )}`;
  }, [resultUrl, summary, worldType]);

  async function handleCopyLink() {
    if (!resultUrl) return;

    try {
      await navigator.clipboard.writeText(resultUrl);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 1600);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  }

  async function handleCopyText() {
    if (!shareText) return;

    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedText(true);
      window.setTimeout(() => setCopiedText(false), 1600);
    } catch (error) {
      console.error("Failed to copy share text:", error);
    }
  }

  async function handleNativeShare() {
    if (!resultUrl) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${worldType} | OneAI Mirror`,
          text: `I asked OneAI Mirror what happens if the whole world was like me.\n\nResult: ${worldType}.`,
          url: resultUrl
        });
      } else {
        await handleCopyLink();
      }
    } catch (error) {
      console.error("Native share failed:", error);
    }
  }

  return (
    <div
      style={{
        display: "grid",
        gap: 20
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "flex-start"
        }}
      >
        <div style={{ maxWidth: 620 }}>
          <h2
            className="section-title"
            style={{
              margin: 0,
              marginBottom: 10,
              fontSize: 22
            }}
          >
            Share Your Result
          </h2>
          <p
            style={{
              margin: 0,
              color: "var(--muted)",
              lineHeight: 1.7,
              fontSize: 15
            }}
          >
            Turn your result into a shareable moment. The best-performing posts are
            short, sharp, and curiosity-driven.
          </p>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.04)",
            color: "var(--muted)",
            fontSize: 13
          }}
        >
          <span>◉</span>
          <span>Ready to spread</span>
        </div>
      </div>

      <div
        style={{
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.03)",
          padding: 18
        }}
      >
        <div
          style={{
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "var(--muted)",
            marginBottom: 12
          }}
        >
          Share Preview
        </div>

        <div
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: "#eaf1fb",
            whiteSpace: "pre-wrap"
          }}
        >
          {shareText || "Preparing share preview..."}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 14
        }}
      >
        <ActionCard
          title="Copy Link"
          description="Copy the direct result URL for fast sharing anywhere."
          onClick={handleCopyLink}
          primary
          status={copiedLink ? "Copied" : undefined}
        />

        <ActionCard
          title="Copy Share Text"
          description="Copy the full post text with result summary and link."
          onClick={handleCopyText}
          status={copiedText ? "Copied" : undefined}
        />

        <ActionLinkCard
          title="Share to X"
          description="Open a prefilled post optimized for viral curiosity."
          href={shareToX}
        />

        <ActionLinkCard
          title="Share to Telegram"
          description="Send your result directly into chats and channels."
          href={shareToTelegram}
        />
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
        <button
          type="button"
          onClick={handleNativeShare}
          className="button button-secondary"
          style={{
            minWidth: 180,
            borderRadius: 16
          }}
        >
          Share Anywhere
        </button>

        <div
          style={{
            color: "var(--muted)",
            fontSize: 13,
            lineHeight: 1.6,
            textAlign: "right"
          }}
        >
          Tip: posts that start with a question or surprising result usually spread better.
        </div>
      </div>
    </div>
  );
}

function ActionCard({
  title,
  description,
  onClick,
  primary = false,
  status
}: {
  title: string;
  description: string;
  onClick: () => void | Promise<void>;
  primary?: boolean;
  status?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: 18,
        borderRadius: 24,
        border: primary
          ? "1px solid rgba(143,211,255,0.28)"
          : "1px solid rgba(255,255,255,0.08)",
        background: primary
          ? "linear-gradient(135deg, rgba(143,211,255,0.10), rgba(122,141,255,0.10))"
          : "rgba(255,255,255,0.03)",
        color: "var(--text)",
        cursor: "pointer",
        transition: "transform 0.15s ease, border-color 0.15s ease",
        display: "grid",
        gap: 10
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "-0.02em"
          }}
        >
          {title}
        </div>

        {status ? (
          <span
            style={{
              padding: "6px 10px",
              borderRadius: 999,
              background: "rgba(119,230,165,0.12)",
              border: "1px solid rgba(119,230,165,0.24)",
              color: "#c8f6da",
              fontSize: 12,
              fontWeight: 700
            }}
          >
            {status}
          </span>
        ) : null}
      </div>

      <div
        style={{
          color: "var(--muted)",
          lineHeight: 1.7,
          fontSize: 14
        }}
      >
        {description}
      </div>
    </button>
  );
}

function ActionLinkCard({
  title,
  description,
  href
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        textAlign: "left",
        padding: 18,
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        color: "var(--text)",
        transition: "transform 0.15s ease, border-color 0.15s ease",
        display: "grid",
        gap: 10
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "-0.02em"
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "var(--muted)",
          lineHeight: 1.7,
          fontSize: 14
        }}
      >
        {description}
      </div>
    </a>
  );
}

function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1)}…`;
}