import { z } from "zod";
import { JupiterClient } from "../client.js";
import type { ToolRegistrar } from "../types.js";

export function registerPortfolioTools(register: ToolRegistrar, client: JupiterClient) {
  register(
    "jupiter_portfolio",
    "Get full portfolio for a wallet — all Jupiter positions across swaps, lending, DCA, limit orders, perps, and prediction markets.",
    {
      wallet: z.string().describe("Wallet address"),
    },
    async (args) => {
      const result = await client.portfolio(args.wallet);
      return JSON.stringify(result, null, 2);
    },
  );
}
