# Jupiter MCP Server

MCP server wrapping the full Jupiter Developer Platform API.

## Stack
- TypeScript, MCP SDK 1.12, Zod
- Jupiter API at api.jup.ag (no RPC node needed)

## Build
```bash
npm install
npm run build     # tsc
npm run lint      # tsc --noEmit
```

## Run
```bash
JUPITER_API_KEY=your_key node dist/index.js
```
Or keyless at 0.5 RPS for prototyping.

## Tools (17)
- swap: jupiter_swap_quote, jupiter_swap_build
- tokens: jupiter_token_search, jupiter_token_info
- price: jupiter_price
- lend: jupiter_lend_markets, jupiter_lend_yield
- trigger: jupiter_limit_orders, jupiter_limit_order_create, jupiter_limit_order_cancel
- recurring: jupiter_dca_orders, jupiter_dca_create
- prediction: jupiter_prediction_markets, jupiter_prediction_market
- perps: jupiter_perps_markets, jupiter_perps_positions
- portfolio: jupiter_portfolio

## Submission
Frontier bounty: "Not Your Regular Bounty" (Jupiter, 3000 jupUSD)
Deadline: May 11 2026
