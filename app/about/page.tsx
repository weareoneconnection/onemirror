import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="page-shell">
      <div className="container panel section-card" style={{ maxWidth: 780 }}>
        <div className="badge">OneAI Mirror</div>
        <h1 style={{ fontSize: 42, lineHeight: 1.05, letterSpacing: "-0.04em" }}>See the world your mind creates.</h1>
        <p className="result-summary">OneAI Mirror turns a single behavior, instinct, or worldview into a civilization-scale simulation. It is not a personality test. It is a consequence engine.</p>
        <p className="result-summary">Ask a dangerous question: if everyone behaved like this, what kind of world would emerge?</p>
        <div className="footer-actions" style={{ marginTop: 20 }}><Link href="/" className="button button-primary">Try Mirror</Link></div>
      </div>
    </main>
  );
}
