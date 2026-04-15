#!/usr/bin/env node
/**
 * Jupiter MCP Server
 *
 * Exposes the full Jupiter Developer Platform as MCP tools:
 * swap, tokens, price, lend, trigger (limit orders), recurring (DCA),
 * prediction markets, perps, and portfolio.
 *
 * Usage:
 *   JUPITER_API_KEY=your_key jupiter-mcp
 *
 * Or without a key (0.5 RPS keyless access for prototyping):
 *   jupiter-mcp
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { JupiterClient } from "./client.js";
import { registerSwapTools } from "./tools/swap.js";
import { registerTokenTools } from "./tools/tokens.js";
import { registerPriceTools } from "./tools/price.js";
import { registerLendTools } from "./tools/lend.js";
import { registerTriggerTools } from "./tools/trigger.js";
import { registerRecurringTools } from "./tools/recurring.js";
import { registerPredictionTools } from "./tools/prediction.js";
import { registerPerpsTools } from "./tools/perps.js";
import { registerPortfolioTools } from "./tools/portfolio.js";

const apiKey = process.env.JUPITER_API_KEY;
const client = new JupiterClient(apiKey);

const server = new McpServer({
  name: "jupiter-mcp",
  version: "0.1.0",
});

let toolCount = 0;

function register(
  name: string,
  description: string,
  shape: Record<string, z.ZodType>,
  handler: (args: any) => Promise<string>,
) {
  server.tool(name, description, shape, async (args) => {
    try {
      const text = await handler(args);
      return { content: [{ type: "text" as const, text }] };
    } catch (err: any) {
      return {
        content: [{ type: "text" as const, text: `Error: ${err.message}` }],
        isError: true,
      };
    }
  });
  toolCount++;
}

// Register all tool modules
registerSwapTools(register, client);
registerTokenTools(register, client);
registerPriceTools(register, client);
registerLendTools(register, client);
registerTriggerTools(register, client);
registerRecurringTools(register, client);
registerPredictionTools(register, client);
registerPerpsTools(register, client);
registerPortfolioTools(register, client);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`jupiter-mcp running — ${toolCount} tools, ${apiKey ? "authenticated" : "keyless (0.5 RPS)"}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
