import { z } from "zod";
import { JupiterClient } from "../client.js";
import type { ToolRegistrar } from "../types.js";

export function registerLendTools(register: ToolRegistrar, client: JupiterClient) {
  register(
    "jupiter_lend_markets",
    "List all Jupiter lending markets with current APY rates and yield opportunities.",
    {},
    async () => {
      const result = await client.lendMarkets();
      return JSON.stringify(result, null, 2);
    },
  );

  register(
    "jupiter_lend_yield",
    "Get yield/APY details for a specific token in Jupiter lending.",
    {
      mint: z.string().describe("Token mint address"),
    },
    async (args) => {
      const result = await client.lendYield(args.mint);
      return JSON.stringify(result, null, 2);
    },
  );
}
