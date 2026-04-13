import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const world = searchParams.get("world") || "Unknown World";
  const summary =
    searchParams.get("summary") ||
    "This mindset creates a different civilization.";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#05070a",
          color: "#f5f7fb",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 85% 15%, rgba(143,211,255,0.20), transparent 22%), radial-gradient(circle at 10% 90%, rgba(122,141,255,0.18), transparent 25%), linear-gradient(180deg, #05070a 0%, #04060a 100%)"
          }}
        />

        <div
          style={{
            position: "absolute",
            top: -120,
            right: -60,
            width: 420,
            height: 420,
            borderRadius: 999,
            background: "rgba(143,211,255,0.10)",
            filter: "blur(90px)"
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: -140,
            left: -80,
            width: 360,
            height: 360,
            borderRadius: 999,
            background: "rgba(122,141,255,0.10)",
            filter: "blur(90px)"
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "42px 46px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(245,247,251,0.82)",
                fontSize: 22,
                fontWeight: 600
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 999,
                  border: "2px solid rgba(245,247,251,0.7)",
                  display: "flex"
                }}
              />
              <div style={{ display: "flex" }}>OneAI Mirror</div>
            </div>

            <div
              style={{
                display: "flex",
                padding: "10px 16px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.03)",
                color: "rgba(255,255,255,0.62)",
                fontSize: 18,
                letterSpacing: "0.12em",
                textTransform: "uppercase"
              }}
            >
              World Simulation
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 980
            }}
          >
            <div
              style={{
                display: "flex",
                color: "rgba(143,211,255,0.92)",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: 18
              }}
            >
              Civilization Outcome
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 72,
                fontWeight: 800,
                letterSpacing: "-0.06em",
                lineHeight: 0.95,
                marginBottom: 22,
                maxWidth: 980
              }}
            >
              If the world was like you...
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 44,
                fontWeight: 750,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                marginBottom: 24,
                color: "#ffffff"
              }}
            >
              {world}
            </div>

            <div
              style={{
                display: "flex",
                maxWidth: 920,
                fontSize: 26,
                lineHeight: 1.45,
                color: "rgba(245,247,251,0.78)"
              }}
            >
              {truncateText(summary, 180)}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 20
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  color: "rgba(255,255,255,0.54)"
                }}
              >
                See the world your mind creates.
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  color: "rgba(255,255,255,0.38)"
                }}
              >
                oneai mirror
              </div>
            </div>

            <div
              style={{
                display: "flex",
                padding: "14px 20px",
                borderRadius: 20,
                background:
                  "linear-gradient(135deg, rgba(143,211,255,0.16), rgba(122,141,255,0.16))",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "#f5f7fb",
                fontSize: 22,
                fontWeight: 700
              }}
            >
              What kind of world do you create?
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}

function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1)}…`;
}