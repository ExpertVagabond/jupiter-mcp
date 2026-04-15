# Jupiter Developer Platform — DX Report

**Builder:** Matthew Karsten (Purple Squirrel Media)
**Project:** jupiter-mcp — MCP server wrapping the full Jupiter Developer Platform
**Build tool:** Claude Code (Opus 4.6)
**Time to first API call:** ~8 minutes (keyless, no signup required)
**Time to working MCP server:** ~45 minutes
**Date:** April 2026

---

## Executive Summary

I built an MCP server that wraps every Jupiter API into 17 tools usable by any AI agent. The goal was to create the "Jupiter MCP" that the docs list as "Coming soon" — giving Claude Code, Cursor, and other agents native access to swap, lend, DCA, limit orders, prediction markets, perps, and portfolio.

The good: Jupiter's API design is genuinely agent-friendly. JSON-native, no RPC node required, keyless access for prototyping. The Swap V2 and Token APIs are best-in-class. The bad: several documented products don't have discoverable REST endpoints, the AI stack tools are hard to find, and the docs have real navigation gaps.

---

## Onboarding Experience

### What worked well

**Keyless access (0.5 RPS) is brilliant.** I was calling the Swap API within minutes of reading the docs. No signup, no API key, no OAuth flow. This is the single best DX decision in the platform. Every DeFi API should copy this.

**The llms.txt file is immediately useful.** I fetched `dev.jup.ag/docs/llms.txt` and got a structured overview of every product and endpoint. This was faster than navigating the docs site. For AI-assisted development, this is the primary entry point — not the docs homepage.

**API response design is LLM-friendly.** Responses are flat JSON with clear field names. The Price API returns `usdPrice`, `liquidity`, `priceChange24h` — no nested wrapper objects, no pagination tokens for simple queries. The Token Search API returns `holderCount`, `fdv`, `mcap`, `organicScore` in a single call. An agent can parse these without any prompt engineering.

**Swap V2 /order path is the right default.** Returns an assembled transaction with all routers competing. The docs clearly explain when to use /order vs /build. This kind of opinionated guidance ("Start with /order") saves real time.

### What slowed me down

**The docs site (developers.jup.ag) is a single-page app that returns empty content to fetch requests.** This means AI agents can't scrape it. The llms.txt partially compensates, but the detailed API reference pages (parameters, error codes, response schemas) aren't accessible without a browser. For an AI-first platform, the docs should be statically rendered or have a raw markdown fallback.

**dev.jup.ag vs developers.jup.ag redirect confusion.** The llms.txt references `dev.jup.ag` paths, but they 301 to `developers.jup.ag`. The redirected URLs then 404. I spent time chasing broken links before realizing the docs are only accessible through the SPA. Recommendation: make the redirect chain work end-to-end, or serve docs at both domains.

**No "list all endpoints" reference.** The docs organize by product (Swap, Tokens, Price, etc.) but there's no single page showing every endpoint with its method, path, and required params. When building an API wrapper, I need to know: what are ALL the paths? The llms.txt gets close but omits query parameters and request body schemas.

---

## API-by-API Findings

### Swap V2 — Excellent
- `/swap/v2/order` GET: Works perfectly. Returns quote + assembled transaction.
- `/swap/v2/build` GET: Works. Returns raw instructions for composability.
- `/swap/v2/execute` POST: Documented clearly.
- **DX note:** The automatic slippage estimation (RTSE, 22bps on my test) is a great default. No need to guess slippage values.
- **Suggestion:** Include common mint addresses in the docs (SOL, USDC, JUP) so builders don't have to look them up. Every example should be copy-paste runnable.

### Tokens — Excellent
- `/tokens/v2/search` GET: Rich data — name, symbol, decimals, holderCount, fdv, mcap, organicScore, volume stats (5m/1h/6h/24h), plus Twitter/website links.
- `/tokens/v2/{mint}` GET: Same rich data for a specific token.
- **DX note:** The `organicScore` and `stats5m` fields are unique — no other Solana API surfaces these. Great for agent decision-making.
- **Suggestion:** Document what `organicScore` means and how it's calculated. It's the most interesting field but has zero documentation.

### Price — Good
- `/price/v3?ids=` GET: Works well. Returns `usdPrice`, `liquidity`, `priceChange24h`.
- **DX note:** The `showExtraInfo` param adds confidence intervals and depth — useful for agents evaluating trade safety.
- **Gotcha:** Price API uses v3, Swap uses v2, Tokens uses v2, Lend uses v1. Version inconsistency adds cognitive load.

### Lend — Incomplete
- `/lend/v1/earn/deposit` POST: Documented, returns unsigned transaction.
- **Critical gap:** There is no endpoint to list available lending markets or current yields. You can deposit but you can't discover what to deposit into. An agent needs to know: "What tokens can I lend? What are the current APYs?" This is a blocking gap for any automated lending integration.
- **Suggestion:** Add `GET /lend/v1/earn/markets` returning available tokens with current APY, TVL, and utilization rate.

### Trigger (Limit Orders) — Good
- `/trigger/v2/orders` GET: List open orders by wallet.
- `/trigger/v2/orders/price` POST: Create limit order.
- `/trigger/v2/orders/cancel` POST: Cancel orders.
- **DX note:** The endpoint naming (`/orders/price` for create) is unintuitive. Expected `/orders/create` or just `POST /orders`.
- **Suggestion:** The docs mention OCO and OTOCO but I couldn't find the parameters to actually create them. Are they the same endpoint with extra fields? Document this.

### Recurring (DCA) — Good
- `/recurring/v1/orders` GET: List DCA orders.
- `/recurring/v1/createOrder` POST: Create DCA order.
- **DX note:** Works as documented. The camelCase endpoint (`createOrder`) breaks REST convention — expected `POST /recurring/v1/orders` (same path, POST method distinguishes create).

### Prediction Markets — Good
- `/prediction/v1/events` GET: Works well. Returns Polymarket and Kalshi data with rich filtering (category, trending, live, new).
- **DX note:** The docs reference `/prediction/v1/markets`, `/prediction/v1/order`, etc. but the actual working endpoint is `/events`. Had to discover this by probing. The docs page only documents the events endpoint despite mentioning many more.
- **Suggestion:** Document which prediction endpoints are live vs planned. I can list events but can't find how to place a prediction order via REST.

### Perps — Not Available
- `/perps/v1/markets` returns 404.
- The docs explicitly state the Perps API is "work in progress."
- **DX note:** The Perps product is listed alongside Swap, Tokens, etc. in the main navigation with no indication it's WIP until you click into it. This creates a false expectation. Mark WIP products clearly in the nav.

### Portfolio — Untested
- `/portfolio/v1/positions` GET: Documented but requires an API key and wallet with positions. Could not test with keyless access.

---

## AI Stack Feedback

### llms.txt — Most Useful
The LLM-optimized docs index at `dev.jup.ag/docs/llms.txt` was my primary reference. It gave me the product overview, endpoint structure, and enough context to start building immediately. This is the right approach — structured text that agents can consume without parsing HTML.

**What's missing:** Response schemas. The llms.txt lists endpoints and parameters but not what comes back. For an agent building prompts around Jupiter data, knowing the response shape is essential.

### Agent Skills — Could Not Test
The docs mention `npx skills add` for installing Agent Skills, but:
1. The docs don't specify what package to install or where the skills come from
2. There's no npm package called `@jup-ag/skills` that I could find
3. The skills concept (context files for coding agents) is interesting but undiscoverable

**Suggestion:** Make Agent Skills installable with a clear one-liner and document what each skill contains. Example: `npx @jup-ag/skills add swap` should install a `.claude/skills/jupiter-swap.md` file.

### Jupiter CLI — Not Tested
The CLI (`@jup-ag/cli`) is documented as JSON-native and non-interactive, which is exactly what agents need. I chose to build an MCP server instead because MCP is the standard agent interface — the CLI would require shell access, which not all agents have.

**Observation:** The CLI and MCP server serve different deployment contexts. CLI is great for shell-enabled agents (Claude Code, terminal bots). MCP is better for hosted agents (ChatGPT, Claude.ai). Both should exist.

### Docs MCP — "Coming Soon"
The docs list "Jupiter MCP" as coming soon. This is exactly what I built. The fact that it took ~45 minutes to build a working MCP server from the existing REST APIs suggests the Jupiter team could ship this quickly. The API design is already agent-friendly — it just needs the MCP transport layer.

---

## If I Were Rebuilding developers.jup.ag

### 1. Make docs agent-accessible
The SPA-only docs are invisible to AI agents. Serve the same content as static HTML or markdown at the same URLs. If `developers.jup.ag/docs/swap` returns content to a browser, it should return content to `curl` too.

### 2. One page, all endpoints
Add a single reference page listing every endpoint: method, path, required params, response shape. Format it as a table. This is the first thing any wrapper builder needs.

### 3. Mark product maturity
The nav shows Swap, Tokens, Price, Lend, Trigger, Recurring, Prediction, Perps as equal peers. But Perps has no REST API, Lend is missing discovery endpoints, and Prediction has undocumented endpoints. Add maturity labels: `[GA]`, `[Beta]`, `[WIP]`.

### 4. Add a discovery endpoint for Lend
`GET /lend/v1/earn/markets` → list of tokens with current APY, TVL, and utilization. Without this, no agent can autonomously decide where to lend.

### 5. Ship the MCP server
The REST APIs are already MCP-ready. The response shapes are clean, the endpoints are stateless, and the auth is simple. Wrap them in an MCP server (I can contribute mine) and list it in the MCP registry. This turns every MCP-compatible agent into a Jupiter user.

### 6. Document organicScore
The Token API's `organicScore` is unique and powerful. Document what it measures, how it's calculated, and what ranges are meaningful. This is a competitive advantage that's currently hidden.

---

## What I Wish Existed

1. **`GET /lend/v1/earn/markets`** — Discover available lending markets and yields
2. **WebSocket or SSE price feed** — For agents monitoring prices in real-time (polling /price/v3 works but wastes rate limit)
3. **Response schemas in llms.txt** — JSON schema or TypeScript types for every endpoint response
4. **Batch endpoints** — `POST /price/v3/batch` accepting an array of requests instead of comma-separated mints in a query string
5. **Agent Skills as installable context** — Make `npx @jup-ag/skills add swap` actually work
6. **Error code reference** — I got a few 404s and the response body was `{"message":"Cannot GET:/jup-integrators/v1/..."}` which leaks internal routing paths. Return structured error codes instead.

---

## Summary

Jupiter's Developer Platform has the best foundation for agent integration I've seen in DeFi. The keyless access, JSON-native APIs, and llms.txt show genuine commitment to AI-first development. The gaps are documentation and discoverability, not engineering. Fix the docs, add the missing Lend discovery endpoint, ship the MCP server, and this platform becomes the default way agents interact with Solana DeFi.

The 17-tool MCP server I built is at [github.com/ExpertVagabond/jupiter-mcp](https://github.com/ExpertVagabond/jupiter-mcp). It works today with keyless access. Happy to contribute it upstream.
