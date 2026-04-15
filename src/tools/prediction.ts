import { z } from "zod";
import { JupiterClient } from "../client.js";
import type { ToolRegistrar } from "../types.js";

export function registerPredictionTools(register: ToolRegistrar, client: JupiterClient) {
  register(
    "jupiter_prediction_markets",
    "List Jupiter prediction markets — binary markets on real-world events. Filter by status.",
    {
      status: z.string().optional().describe("Filter: 'active' or 'resolved'"),
      limit: z.number().optional().describe("Max results"),
    },
    async (args) => {
      const result = await client.predictionMarkets(args);
      return JSON.stringify(result, null, 2);
    },
  );

  register(
    "jupiter_prediction_market",
    "Get details for a specific prediction market — odds, volume, resolution status.",
    {
      marketId: z.string().describe("Market ID"),
    },
    async (args) => {
      const result = await client.predictionMarket(args.marketId);
      return JSON.stringify(result, null, 2);
    },
  );
}
