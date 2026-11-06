import { ImageResponse } from "next/og";

export const alt = "Hamdan Ali: Full-Stack Developer · AI-Powered Products";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08090b",
          color: "#f3f2ee",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
            paddingBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                backgroundColor: "#c22e06",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              HA
            </div>
            <span
              style={{
                fontSize: "18px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#c0c6d4",
              }}
            >
              HAMDAN ALI · PORTFOLIO
            </span>
          </div>
          <span
            style={{
              fontSize: "16px",
              letterSpacing: "0.12em",
              color: "#10b981",
              textTransform: "uppercase",
            }}
          >
            ISLAMABAD &amp; CHITRAL · PAKISTAN
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "20px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#ff693d",
              fontWeight: 600,
            }}
          >
            Full-Stack Developer · AI-Powered Products
          </div>

          <div
            style={{
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              color: "#f3f2ee",
              maxWidth: "980px",
            }}
          >
            Shipping web, mobile &amp; AI products built for real users.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "26px",
            fontSize: "18px",
            color: "#9da4b4",
          }}
        >
          <div style={{ display: "flex", gap: "28px" }}>
            <span>02 Live Cloud Platforms</span>
            <span>·</span>
            <span>96 Automated Tests</span>
            <span>·</span>
            <span>284 Verified Universities</span>
          </div>
          <span style={{ color: "#f3f2ee", fontWeight: 600 }}>@Hamdanali3</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
