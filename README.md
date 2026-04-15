# jupiter-mcp

MCP server for the [Jupiter Developer Platform](https://developers.jup.ag) — 17 tools covering swap, tokens, price, lend, limit orders, DCA, prediction markets, perps, and portfolio.

Any MCP-compatible AI agent (Claude Code, Cursor, ChatGPT, etc.) gets native access to Jupiter's full DeFi stack on Solana.

## Quick Start

```bash
# Install
git clone https://github.com/ExpertVagabond/jupiter-mcp.git
cd jupiter-mcp
npm install && npm run build

# Run (keyless — 0.5 RPS, no signup needed)
node dist/index.js

# Run with API key (higher rate limits)
JUPITER_API_KEY=your_key node dist/index.js
```

### Add to Claude Code

```json
// ~/.claude/settings.json
{
  "mcpServers": {
    "jupiter": {
      "command": "node",
      "args": ["/path/to/jupiter-mcp/dist/index.js"],
      "env": {
        "JUPITER_API_KEY": "your_key_or_omit_for_keyless"
      }
    }
  }
}
```

## Tools (17)

| Tool | Description |
|------|-------------|
| `jupiter_swap_quote` | Get swap quote via managed /order path (all routers compete) |
| `jupiter_swap_build` | Get raw swap instructions for custom transactions |
| `jupiter_token_search` | Search tokens by name, symbol, or mint |
| `jupiter_token_info` | Token metadata, organic scores, trading metrics |
| `jupiter_price` | USD prices for any Solana token |
| `jupiter_lend_deposit` | Create a lending deposit transaction |
| `jupiter_lend_withdraw` | Create a lending withdrawal transaction |
| `jupiter_limit_orders` | List open limit orders for a wallet |
| `jupiter_limit_order_create` | Create limit / OCO / OTOCO orders |
| `jupiter_limit_order_cancel` | Cancel open limit orders |
| `jupiter_dca_orders` | List active DCA schedules |
| `jupiter_dca_create` | Create recurring DCA orders |
| `jupiter_prediction_events` | Browse prediction markets (Polymarket, Kalshi) |
| `jupiter_perps_markets` | List perpetual futures markets |
| `jupiter_perps_positions` | Get open perp positions |
| `jupiter_portfolio` | Full portfolio view across all Jupiter products |

## Example

```
You: "What's the price of SOL and JUP?"

Agent calls: jupiter_price({ mints: "So11...112,JUPyi...vCN" })

→ SOL: $83.53 (-2.4% 24h), JUP: $0.166
```

```
You: "Get me a quote to swap 1 SOL for USDC"

Agent calls: jupiter_swap_quote({
  inputMint: "So11111111111111111111111111111111111111112",
  outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  amount: "1000000000",
  taker: "your_wallet"
})

→ 83.48 USDC, 22bps slippage, aggregator routing via Raydium
```

## Architecture

```
src/
  index.ts          MCP server entry — registers all tools
  client.ts         Jupiter API client (thin fetch wrapper, no dependencies)
  types.ts          Shared types
  tools/
    swap.ts         Swap V2 (/order + /build)
    tokens.ts       Token search + metadata
    price.ts        USD pricing
    lend.ts         Lending deposit/withdraw
    trigger.ts      Limit orders (create/cancel/list)
    recurring.ts    DCA orders
    prediction.ts   Prediction markets
    perps.ts        Perpetual futures
    portfolio.ts    Portfolio aggregation
```

## DX Report

See [DX-REPORT.md](./DX-REPORT.md) for a detailed developer experience report covering every Jupiter API, the AI stack (llms.txt, Agent Skills, CLI, Docs MCP), and specific recommendations.

## License

MIT
