import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { FONTS, COLORS, CLAMP } from "../theme";

const TOOL_GROUPS = [
  { name: "Swap", tools: ["jupiter_swap_quote", "jupiter_swap_build"], desc: "Best price across all routers" },
  { name: "Tokens", tools: ["jupiter_token_search", "jupiter_token_info"], desc: "Metadata, organic scores, volume" },
  { name: "Price", tools: ["jupiter_price"], desc: "USD pricing for any Solana token" },
  { name: "Lend", tools: ["jupiter_lend_deposit", "jupiter_lend_withdraw"], desc: "Deposit/withdraw from Earn" },
  { name: "Limit Orders", tools: ["jupiter_limit_orders", "jupiter_limit_order_create", "jupiter_limit_order_cancel"], desc: "Single, OCO, OTOCO" },
  { name: "DCA", tools: ["jupiter_dca_orders", "jupiter_dca_create"], desc: "Recurring swaps on schedule" },
  { name: "Prediction", tools: ["jupiter_prediction_events"], desc: "Polymarket + Kalshi markets" },
  { name: "Perps", tools: ["jupiter_perps_markets", "jupiter_perps_positions"], desc: "Perpetual futures" },
  { name: "Portfolio", tools: ["jupiter_portfolio"], desc: "All positions in one view" },
];

export const ToolsScene: React.FC = () => {
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
          fontSize: 56,
          color: COLORS.textBright,
          margin: 0,
          marginBottom: 40,
          opacity: headerFade,
        }}
      >
        17 Tools, 9 Products
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
          flex: 1,
        }}
      >
        {TOOL_GROUPS.map((group, i) => {
          const delay = 10 + i * 8;
          const opacity = interpolate(frame, [delay, delay + 15], [0, 1], CLAMP);
          const slideX = interpolate(frame, [delay, delay + 15], [-20, 0], CLAMP);

          return (
            <div
              key={group.name}
              style={{
                opacity,
                transform: `translateX(${slideX}px)`,
                backgroundColor: COLORS.bgCard,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                padding: 24,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.heading,
                  fontSize: 24,
                  fontWeight: 600,
                  color: COLORS.accent,
                  marginBottom: 8,
                }}
              >
                {group.name}
              </div>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 16,
                  color: COLORS.muted,
                  marginBottom: 12,
                }}
              >
                {group.desc}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {group.tools.map((tool) => (
                  <code
                    key={tool}
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 13,
                      color: COLORS.text,
                      backgroundColor: COLORS.dimmed,
                      borderRadius: 4,
                      padding: "3px 8px",
                    }}
                  >
                    {tool}
                  </code>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
