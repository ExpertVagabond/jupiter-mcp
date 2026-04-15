import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { FONTS, COLORS, CLAMP } from "../theme";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], CLAMP);
  const slideUp = interpolate(frame, [5, 30], [40, 0], CLAMP);
  const tagFade = interpolate(frame, [25, 45], [0, 1], CLAMP);
  const toolsFade = interpolate(frame, [40, 60], [0, 1], CLAMP);

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
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 28,
            color: COLORS.accent,
            letterSpacing: 4,
            marginBottom: 24,
            opacity: tagFade,
          }}
        >
          MCP SERVER
        </div>
        <h1
          style={{
            fontFamily: FONTS.heading,
            fontSize: 96,
            fontWeight: 700,
            color: COLORS.textBright,
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          jupiter-mcp
        </h1>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 32,
            color: COLORS.muted,
            marginTop: 24,
            opacity: tagFade,
          }}
        >
          Every Jupiter API in one MCP server
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: 60,
          opacity: toolsFade,
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 900,
        }}
      >
        {["Swap", "Tokens", "Price", "Lend", "Limit Orders", "DCA", "Prediction", "Perps", "Portfolio"].map(
          (tool, i) => (
            <div
              key={tool}
              style={{
                fontFamily: FONTS.mono,
                fontSize: 18,
                color: COLORS.accent,
                backgroundColor: COLORS.dimmed,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: "8px 18px",
                opacity: interpolate(frame, [45 + i * 3, 55 + i * 3], [0, 1], CLAMP),
              }}
            >
              {tool}
            </div>
          ),
        )}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 50,
          fontFamily: FONTS.mono,
          fontSize: 18,
          color: COLORS.muted,
          opacity: toolsFade,
        }}
      >
        17 tools · TypeScript · MCP SDK 1.12
      </div>
    </AbsoluteFill>
  );
};
