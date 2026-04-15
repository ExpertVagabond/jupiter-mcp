import { z } from "zod";
import { JupiterClient } from "../client.js";
import type { ToolRegistrar } from "../types.js";

export function registerTokenTools(register: ToolRegistrar, client: JupiterClient) {
  register(
    "jupiter_token_search",
    "Search for Solana tokens by name, symbol, or mint address. Returns metadata, verification status, organic scores, and trading metrics.",
    {
      query: z.string().describe("Token name, symbol, or mint address"),
      limit: z.number().optional().describe("Max results (default 10)"),
    },
    async (args) => {
      const result = await client.tokenSearch(args.query, args.limit);
      return JSON.stringify(result, null, 2);
    },
  );

  register(
    "jupiter_token_info",
    "Get detailed token metadata for a specific mint — verification status, organic score, daily volume, holder count.",
    {
      mint: z.string().describe("Token mint address"),
    },
    async (args) => {
      const result = await client.tokenInfo(args.mint);
      return JSON.stringify(result, null, 2);
    },
  );
}
