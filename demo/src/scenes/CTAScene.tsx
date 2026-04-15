import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { FONTS, COLORS, CLAMP } from "../theme";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], CLAMP);
  const slideUp = interpolate(frame, [5, 25], [30, 0], CLAMP);
  const repoFade = interpolate(frame, [30, 45], [0, 1], CLAMP);
  const statsFade = interpolate(frame, [45, 60], [0, 1], CLAMP);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      <div
        style={{
          opacity: fadeIn,
          transform: `translateY(${slideUp}px)`,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.heading,
            fontSize: 64,
            fontWeight: 700,
            color: COLORS.textBright,
            margin: 0,
            marginBottom: 16,
          }}
        >
          jupiter-mcp
        </h2>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 28,
            color: COLORS.muted,
            marginBottom: 48,
          }}
        >
          The Jupiter MCP server that doesn't exist yet — until now.
        </div>
      </div>

      <div
        style={{
          opacity: repoFade,
          fontFamily: FONTS.mono,
          fontSize: 26,
          color: COLORS.accent,
          backgroundColor: COLORS.bgCard,
          border: `1px solid ${COLORS.accent}`,
          borderRadius: 12,
          padding: "16px 40px",
          marginBottom: 48,
        }}
      >
        github.com/ExpertVagabond/jupiter-mcp
      </div>

      <div
        style={{
          display: "flex",
          gap: 60,
          opacity: statsFade,
        }}
      >
        {[
          { value: "17", label: "Tools" },
          { value: "9", label: "Products" },
          { value: "0", label: "Dependencies*" },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: FONTS.heading,
                fontSize: 56,
                fontWeight: 700,
                color: COLORS.accent,
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontFamily: FONTS.body, fontSize: 20, color: COLORS.muted }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontFamily: FONTS.mono,
          fontSize: 16,
          color: COLORS.muted,
          opacity: statsFade,
        }}
      >
        * Beyond MCP SDK — pure fetch, no external deps
      </div>
    </AbsoluteFill>
  );
};
