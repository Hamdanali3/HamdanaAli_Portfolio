import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#08090b",
          borderRadius: "40px",
          border: "4px solid #c22e06",
          color: "#f3f2ee",
          fontFamily: "sans-serif",
          fontSize: "76px",
          fontWeight: 800,
          letterSpacing: "-0.04em",
        }}
      >
        HA
      </div>
    ),
    {
      ...size,
    }
  );
}
