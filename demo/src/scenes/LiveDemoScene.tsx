import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { FONTS, COLORS, CLAMP } from "../theme";

const DEMO_STEPS = [
  {
    prompt: '"What\'s the price of SOL?"',
    tool: "jupiter_price",
    result: "SOL: $83.53  (-2.4% 24h)\nLiquidity: $674M",
  },
  {
    prompt: '"Get me a swap quote — 1 SOL → USDC"',
    tool: "jupiter_swap_quote",
    result: "Output: 83.48 USDC\nSlippage: 22bps (auto)\nRoute: Raydium via aggregator",
  },
  {
    prompt: '"Search for JUP token"',
    tool: "jupiter_token_search",
    result: "JUP — Jupiter\nPrice: $0.166  |  MCap: $591M\nHolders: 848K  |  FDV: $1.14B",
  },
  {
    prompt: '"Show trending prediction markets"',
    tool: "jupiter_prediction_events",
    result: "Champions League Winner\nUS Election 2026\n+ 47 more active events",
  },
];

export const LiveDemoScene: React.FC = () => {
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
          marginBottom: 10,
          opacity: headerFade,
        }}
      >
        Live API Calls
      </h2>
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 22,
          color: COLORS.muted,
          marginBottom: 40,
          opacity: headerFade,
        }}
      >
        Real data from Jupiter Developer Platform — no mocks
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1 }}>
        {DEMO_STEPS.map((step, i) => {
          const delay = 15 + i * 40;
          const promptFade = interpolate(frame, [delay, delay + 10], [0, 1], CLAMP);
          const toolFade = interpolate(frame, [delay + 8, delay + 18], [0, 1], CLAMP);
          const resultFade = interpolate(frame, [delay + 16, delay + 26], [0, 1], CLAMP);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 24,
                opacity: promptFade,
              }}
            >
              {/* Prompt */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 22,
                    color: COLORS.textBright,
                    marginBottom: 6,
                    opacity: promptFade,
                  }}
                >
                  {step.prompt}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 14,
                    color: COLORS.accent,
                    opacity: toolFade,
                  }}
                >
                  → {step.tool}
                </div>
              </div>

              {/* Result */}
              <div
                style={{
                  flex: 1,
                  fontFamily: FONTS.mono,
                  fontSize: 16,
                  color: COLORS.success,
                  backgroundColor: COLORS.bgCard,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  padding: 16,
                  whiteSpace: "pre-line",
                  opacity: resultFade,
                }}
              >
                {step.result}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
