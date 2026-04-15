import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { FONTS, COLORS, CLAMP } from "../theme";

const FINDINGS = [
  { icon: "✓", label: "Keyless access (0.5 RPS)", detail: "First API call in 8 minutes, no signup", good: true },
  { icon: "✓", label: "llms.txt", detail: "Best docs entry point for AI agents", good: true },
  { icon: "✓", label: "Clean JSON responses", detail: "Flat structures, clear field names, LLM-parseable", good: true },
  { icon: "✓", label: "Swap V2 /order", detail: "All routers compete, auto-slippage estimation", good: true },
  { icon: "△", label: "No Lend discovery endpoint", detail: "Can deposit but can't list markets or APYs", good: false },
  { icon: "△", label: "Perps API returns 404", detail: "Documented as WIP, but no label in nav", good: false },
  { icon: "△", label: "Docs SPA invisible to agents", detail: "curl gets empty HTML, only browser renders", good: false },
  { icon: "△", label: "Agent Skills undiscoverable", detail: "npx skills add — no package found", good: false },
];

export const DXFindingsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const headerFade = interpolate(frame, [0, 15], [0, 1], CLAMP);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        padding: 80,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          fontFamily: FONTS.heading,
          fontSize: 48,
          color: COLORS.textBright,
          margin: 0,
          marginBottom: 40,
          opacity: headerFade,
        }}
      >
        DX Findings
      </h2>

      <div style={{ display: "flex", gap: 40, flex: 1 }}>
        {/* Good */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 22,
              color: COLORS.success,
              marginBottom: 8,
              opacity: headerFade,
            }}
          >
            What works
          </div>
          {FINDINGS.filter((f) => f.good).map((f, i) => {
            const delay = 10 + i * 12;
            const opacity = interpolate(frame, [delay, delay + 12], [0, 1], CLAMP);
            return (
              <div
                key={i}
                style={{
                  opacity,
                  backgroundColor: COLORS.bgCard,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <div style={{ fontFamily: FONTS.heading, fontSize: 20, color: COLORS.textBright, marginBottom: 4 }}>
                  {f.icon} {f.label}
                </div>
                <div style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.muted }}>{f.detail}</div>
              </div>
            );
          })}
        </div>

        {/* Gaps */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 22,
              color: COLORS.orange,
              marginBottom: 8,
              opacity: headerFade,
            }}
          >
            Gaps found
          </div>
          {FINDINGS.filter((f) => !f.good).map((f, i) => {
            const delay = 50 + i * 12;
            const opacity = interpolate(frame, [delay, delay + 12], [0, 1], CLAMP);
            return (
              <div
                key={i}
                style={{
                  opacity,
                  backgroundColor: COLORS.bgCard,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <div style={{ fontFamily: FONTS.heading, fontSize: 20, color: COLORS.textBright, marginBottom: 4 }}>
                  {f.icon} {f.label}
                </div>
                <div style={{ fontFamily: FONTS.body, fontSize: 16, color: COLORS.muted }}>{f.detail}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
