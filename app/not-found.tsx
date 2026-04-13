import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell">
      <div className="container panel section-card" style={{ maxWidth: 720 }}>
        <div className="badge">Result not found</div>
        <h1 style={{ fontSize: 42, lineHeight: 1.05, letterSpacing: "-0.04em" }}>This simulation is gone.</h1>
        <p className="result-summary">The requested result was not found in the database.</p>
        <div className="footer-actions" style={{ marginTop: 20 }}><Link href="/" className="button button-primary">Create New Simulation</Link></div>
      </div>
    </main>
  );
}
