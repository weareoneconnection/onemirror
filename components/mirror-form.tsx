"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export function MirrorForm() {
  const router = useRouter();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmed = input.trim();
  const count = input.length;
  const canSubmit = trimmed.length >= 2 && !loading;

  const lang = useMemo<"zh" | "en">(() => {
    return /[\u4e00-\u9fff]/.test(input) ? "zh" : "en";
  }, [input]);

  const copy =
    lang === "zh"
      ? {
          label: "写下一句话",
          placeholder:
            "例如：我只想赢\n例如：只要对我有利就行\n例如：这句话能不能当推文发？",
          helper: "输入一个念头、偏好或习惯，OneAI Mirror 会把它放大成一个世界。",
          button: loading ? "正在模拟..." : "生成我的世界",
          errorFallback: "出了点问题，请再试一次。",
          footer: "你的结果会生成：世界类型、结论、冲击句、系统后果。",
          counterSuffix: "字"
        }
      : {
          label: "Write one line",
          placeholder:
            "Example: I only care about winning\nExample: As long as it benefits me\nExample: Would this make a good tweet?",
          helper:
            "Enter one belief, instinct, or behavior. OneAI Mirror scales it into a world.",
          button: loading ? "Simulating..." : "Generate My World",
          errorFallback: "Something went wrong. Please try again.",
          footer:
            "Your result becomes a world type, a verdict, a shock line, and system-level consequences.",
          counterSuffix: "chars"
        };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          input: trimmed
        })
      });

      const data = await response.json();

      if (!response.ok || !data?.ok) {
        setError(data?.error || copy.errorFallback);
        return;
      }

      if (!data?.resultId) {
        setError(copy.errorFallback);
        return;
      }

      router.push(`/result/${data.resultId}`);
    } catch (err) {
      console.error(err);
      setError(copy.errorFallback);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mirror-form">
      <label htmlFor="mirror-input" className="mirror-label">
        {copy.label}
      </label>

      <div className="mirror-input-wrap">
        <textarea
          id="mirror-input"
          className="mirror-textarea"
          placeholder={copy.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={280}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="sentences"
          spellCheck={false}
        />
      </div>

      <div className="mirror-helper-row">
        <div className={`mirror-helper ${error ? "is-error" : ""}`}>
          {error || copy.helper}
        </div>

        <div className="mirror-counter">
          {count}/280 {copy.counterSuffix}
        </div>
      </div>

      <button
        type="submit"
        className="mirror-submit"
        disabled={!canSubmit}
      >
        {copy.button}
      </button>

      <div className="mirror-footer">{copy.footer}</div>

      <style>{`
        .mirror-form {
          display: grid;
          gap: 12px;
        }

        .mirror-label {
          display: block;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.62);
        }

        .mirror-input-wrap {
          position: relative;
        }

        .mirror-textarea {
          width: 100%;
          min-height: 148px;
          border: 1px solid rgba(255, 255, 255, 0.10);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.04);
          color: #f5f7fb;
          padding: 16px 16px 18px;
          font-size: 18px;
          line-height: 1.7;
          letter-spacing: -0.02em;
          resize: vertical;
          outline: none;
          transition: border-color 120ms ease, box-shadow 120ms ease, background 120ms ease;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
        }

        .mirror-textarea:focus {
          border-color: rgba(143, 211, 255, 0.36);
          box-shadow: 0 0 0 4px rgba(143, 211, 255, 0.08);
          background: rgba(255, 255, 255, 0.05);
        }

        .mirror-textarea::placeholder {
          color: rgba(255, 255, 255, 0.36);
        }

        .mirror-helper-row {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          align-items: flex-start;
        }

        .mirror-helper {
          flex: 1;
          color: rgba(255, 255, 255, 0.62);
          font-size: 13px;
          line-height: 1.65;
        }

        .mirror-helper.is-error {
          color: #ff9e9e;
        }

        .mirror-counter {
          white-space: nowrap;
          color: rgba(255, 255, 255, 0.42);
          font-size: 12px;
          line-height: 1.6;
          padding-top: 1px;
        }

        .mirror-submit {
          width: 100%;
          min-height: 54px;
          border: 0;
          border-radius: 18px;
          background: linear-gradient(135deg, #a8d4ff, #90a3ff);
          color: #08111d;
          font-size: 16px;
          font-weight: 900;
          letter-spacing: -0.02em;
          cursor: pointer;
          transition: transform 120ms ease, opacity 120ms ease, box-shadow 120ms ease;
          box-shadow: 0 12px 30px rgba(122, 141, 255, 0.18);
        }

        .mirror-submit:hover {
          transform: translateY(-1px);
        }

        .mirror-submit:disabled {
          opacity: 0.52;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .mirror-footer {
          color: rgba(255, 255, 255, 0.48);
          font-size: 12px;
          line-height: 1.65;
        }

        @media (max-width: 640px) {
          .mirror-form {
            gap: 10px;
          }

          .mirror-textarea {
            min-height: 136px;
            border-radius: 18px;
            padding: 14px 14px 16px;
            font-size: 17px;
            line-height: 1.65;
          }

          .mirror-helper-row {
            flex-direction: column;
            gap: 6px;
          }

          .mirror-counter {
            padding-top: 0;
          }

          .mirror-submit {
            min-height: 52px;
            border-radius: 16px;
            font-size: 15px;
          }
        }
      `}</style>
    </form>
  );
}