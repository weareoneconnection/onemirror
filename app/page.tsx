import Link from "next/link";
import { MirrorForm } from "@/components/mirror-form";

export default function HomePage() {
  return (
    <main className="page-shell">
      <div className="container">
        <section className="hero">
          <div className="brand"><span>◉</span><span>OneAI Mirror</span></div>
          <h1>What if the whole world was like you?</h1>
          <p>Describe how you think or act. We simulate the kind of world that emerges when your mindset becomes civilization-scale.</p>
        </section>
        <section className="panel prompt-card"><MirrorForm /></section>
        <section style={{ marginTop: 18, textAlign: "center" }}><Link href="/about" className="helper">What is OneAI Mirror?</Link></section>
      </div>
    </main>
  );
}
