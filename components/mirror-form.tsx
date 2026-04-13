"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MirrorForm() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, source: "web" })
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      router.push(`/result/${data.resultId}`);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="mirror-input" className="prompt-label">Describe a belief, instinct, or behavior.</label>
      <textarea
        id="mirror-input"
        className="prompt-input"
        placeholder="Example: I only care about winning."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={280}
      />
      <div className="row">
        <div className="helper">{error ? <span style={{ color: "#ff8d8d" }}>{error}</span> : "Keep it short, direct, and honest."}</div>
        <button className="button button-primary" type="submit" disabled={loading || input.trim().length < 3}>
          {loading ? "Simulating..." : "Simulate World"}
        </button>
      </div>
    </form>
  );
}
