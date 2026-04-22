"use client";

import { useMemo, useState } from "react";

type Props = {
  resultId: string;
  summary: string;
  worldType: string;
  shockLine?: string;
  lang?: "zh" | "en";
};

export function ResultActions({
  resultId,
  summary,
  worldType,
  shockLine,
  lang = "en"
}: Props) {
  const [copied, setCopied] = useState<null | "link" | "post">(null);

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    (typeof window !== "undefined" ? window.location.origin : "");

  const resultUrl = `${appUrl}/result/${resultId}`;

  const postText = useMemo(() => {
    if (lang === "zh") {
      return [
        `我在 OneAI Mirror 得到的结果是：${worldType}`,
        shockLine || summary,
        "",
        "如果整个世界都像你，会变成什么样？",
        resultUrl
      ].join("\n");
    }

    return [
      `My OneAI Mirror result: ${worldType}`,
      shockLine || summary,
      "",
      "What if the whole world was like you?",
      resultUrl
    ].join("\n");
  }, [lang, resultUrl, shockLine, summary, worldType]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(resultUrl);
      setCopied("link");
      window.setTimeout(() => setCopied(null), 1600);
    } catch (error) {
      console.error("Failed to copy link", error);
    }
  }

  async function copyPost() {
    try {
      await navigator.clipboard.writeText(postText);
      setCopied("post");
      window.setTimeout(() => setCopied(null), 1600);
    } catch (error) {
      console.error("Failed to copy post", error);
    }
  }

  function shareToX() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      postText
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const t = lang === "zh"
    ? {
        title: "Share",
        subtitle: "把这一结果发出去",
        link: copied === "link" ? "已复制" : "复制链接",
        x: "分享到 X",
        post: copied === "post" ? "已复制" : "复制文案",
        hint: "先让用户看到结论，再让他们分享。"
      }
    : {
        title: "Share",
        subtitle: "Turn this result into a post",
        link: copied === "link" ? "Copied" : "Copy Link",
        x: "Share to X",
        post: copied === "post" ? "Copied" : "Copy Post",
        hint: "Make the result easy to screenshot, easy to share."
      };

  return (
    <div className="result-actions-wrap">
      <div className="result-actions-copy">
        <div className="result-actions-title">{t.title}</div>
        <div className="result-actions-subtitle">{t.subtitle}</div>
      </div>

      <div className="result-actions-buttons">
        <button type="button" onClick={copyLink} className="share-btn secondary">
          {t.link}
        </button>
        <button type="button" onClick={shareToX} className="share-btn primary">
          {t.x}
        </button>
        <button type="button" onClick={copyPost} className="share-btn secondary">
          {t.post}
        </button>
      </div>

      <div className="result-actions-hint">{t.hint}</div>

      <style>{`
        .result-actions-wrap {
          display: grid;
          gap: 14px;
        }

        .result-actions-copy {
          display: grid;
          gap: 4px;
        }

        .result-actions-title {
          font-size: 14px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .result-actions-subtitle {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .result-actions-buttons {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        .share-btn {
          height: 48px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.12);
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.02em;
          cursor: pointer;
          transition: transform 120ms ease, opacity 120ms ease, border-color 120ms ease;
        }

        .share-btn:hover {
          transform: translateY(-1px);
        }

        .share-btn.primary {
          background: linear-gradient(135deg, #a8d4ff, #90a3ff);
          color: #08111d;
          border-color: transparent;
        }

        .share-btn.secondary {
          background: rgba(255,255,255,0.04);
          color: #f5f7fb;
        }

        .result-actions-hint {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          .result-actions-wrap {
            gap: 12px;
          }

          .result-actions-subtitle {
            font-size: 16px;
          }

          .result-actions-buttons {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .share-btn {
            height: 50px;
            border-radius: 14px;
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}