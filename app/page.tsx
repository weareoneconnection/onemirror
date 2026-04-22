import Link from "next/link";
import { MirrorForm } from "@/components/mirror-form";

export default function HomePage() {
  return (
    <main className="mirror-home">
      <div className="mirror-home-bg" />

      <div className="mirror-home-shell">
        <section className="topbar">
          <div className="brand-pill">
            <span className="brand-dot" />
            <span>OneAI Mirror</span>
          </div>

          <div className="topbar-right">
            <Link href="/about" className="about-link">
              What is this?
            </Link>
          </div>
        </section>

        <section className="hero-block">
          <div className="hero-copy">
            <div className="hero-kicker">Civilization Mirror</div>

            <h1 className="hero-title">
              What if the whole
              <br />
              world was like you?
            </h1>

            <p className="hero-subtitle">
              Type one belief, instinct, or behavior. OneAI Mirror turns it into
              a civilization-scale outcome you can feel, share, and compare.
            </p>

            <div className="hero-mini-proof">
              <div className="mini-proof-card">
                <div className="mini-proof-label">Input</div>
                <div className="mini-proof-value">“I only care about winning.”</div>
              </div>

              <div className="mini-proof-arrow">→</div>

              <div className="mini-proof-card strong">
                <div className="mini-proof-label">World</div>
                <div className="mini-proof-value">Hyper Competitive Order</div>
              </div>
            </div>
          </div>

          <div className="hero-form-wrap">
            <div className="form-card">
              <div className="form-card-head">
                <div className="form-card-title">Run your world simulation</div>
                <div className="form-card-subtitle">
                  One sentence is enough.
                </div>
              </div>

              <MirrorForm />

              <div className="form-footnote">
                Your result becomes a world type, a verdict, and a shareable shock line.
              </div>
            </div>
          </div>
        </section>

        <section className="social-proof-grid">
          <div className="proof-panel">
            <div className="proof-title">Why it spreads</div>
            <div className="proof-text">
              People do not just get a result. They get a world they helped create.
            </div>
          </div>

          <div className="proof-panel">
            <div className="proof-title">Why it works</div>
            <div className="proof-text">
              It transforms a private mindset into a public civilization outcome.
            </div>
          </div>

          <div className="proof-panel">
            <div className="proof-title">Why it sticks</div>
            <div className="proof-text">
              The output feels like a verdict, not a quiz.
            </div>
          </div>
        </section>

        <section className="bottom-cta">
          <div className="bottom-line">
            See the world your mind creates.
          </div>
        </section>
      </div>

      <style>{`
        .mirror-home {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          background: #05070a;
          color: #f5f7fb;
        }

        .mirror-home-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 80% 10%, rgba(143, 211, 255, 0.16), transparent 24%),
            radial-gradient(circle at 10% 90%, rgba(122, 141, 255, 0.14), transparent 28%),
            linear-gradient(180deg, #05070a 0%, #04060a 100%);
          pointer-events: none;
        }

        .mirror-home-shell {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 16px 16px 56px;
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
        }

        .brand-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 40px;
          padding: 0 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.10);
          color: rgba(245, 247, 251, 0.92);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .brand-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: 2px solid rgba(245, 247, 251, 0.78);
          display: inline-block;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .about-link {
          color: rgba(255, 255, 255, 0.68);
          font-size: 14px;
          text-decoration: none;
        }

        .hero-block {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
          align-items: stretch;
        }

        .hero-copy {
          padding: 10px 2px 0;
        }

        .hero-kicker {
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(143, 211, 255, 0.94);
          font-weight: 800;
          margin-bottom: 14px;
        }

        .hero-title {
          margin: 0;
          font-size: clamp(40px, 14vw, 84px);
          line-height: 0.93;
          letter-spacing: -0.07em;
          font-weight: 950;
          text-wrap: balance;
        }

        .hero-subtitle {
          margin: 18px 0 0;
          max-width: 720px;
          color: rgba(245, 247, 251, 0.78);
          font-size: 16px;
          line-height: 1.8;
        }

        .hero-mini-proof {
          margin-top: 18px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .mini-proof-card {
          padding: 14px 14px 15px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
        }

        .mini-proof-card.strong {
          background: linear-gradient(135deg, rgba(143, 211, 255, 0.08), rgba(122, 141, 255, 0.10));
          border-color: rgba(143, 211, 255, 0.16);
        }

        .mini-proof-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 8px;
        }

        .mini-proof-value {
          font-size: 18px;
          line-height: 1.45;
          color: #f5f7fb;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .mini-proof-arrow {
          display: none;
        }

        .hero-form-wrap {
          min-width: 0;
        }

        .form-card {
          padding: 16px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.045);
          border: 1px solid rgba(255, 255, 255, 0.10);
          box-shadow: 0 22px 80px rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(10px);
        }

        .form-card-head {
          margin-bottom: 14px;
        }

        .form-card-title {
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.05;
        }

        .form-card-subtitle {
          margin-top: 6px;
          color: rgba(255, 255, 255, 0.64);
          font-size: 14px;
        }

        .form-footnote {
          margin-top: 12px;
          color: rgba(255, 255, 255, 0.56);
          font-size: 13px;
          line-height: 1.65;
        }

        .social-proof-grid {
          margin-top: 18px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .proof-panel {
          padding: 16px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .proof-title {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .proof-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          line-height: 1.7;
        }

        .bottom-cta {
          margin-top: 22px;
          padding: 4px 2px 0;
        }

        .bottom-line {
          color: rgba(255, 255, 255, 0.56);
          font-size: 13px;
          text-align: center;
          line-height: 1.7;
        }

        @media (min-width: 720px) {
          .mirror-home-shell {
            padding: 22px 20px 64px;
          }

          .hero-block {
            grid-template-columns: minmax(0, 1.08fr) minmax(380px, 0.92fr);
            gap: 22px;
            align-items: center;
          }

          .hero-subtitle {
            font-size: 18px;
          }

          .hero-mini-proof {
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
          }

          .mini-proof-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.42);
            font-size: 26px;
            font-weight: 900;
          }

          .form-card {
            padding: 20px;
            border-radius: 30px;
          }

          .social-proof-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
          }

          .bottom-line {
            font-size: 14px;
          }
        }

        @media (min-width: 1100px) {
          .mirror-home-shell {
            padding-top: 24px;
          }

          .hero-block {
            gap: 28px;
          }

          .form-card {
            padding: 22px;
          }
        }
      `}</style>
    </main>
  );
}