import { z } from "zod";
import { JupiterClient } from "../client.js";
import type { ToolRegistrar } from "../types.js";

export function registerPredictionTools(register: ToolRegistrar, client: JupiterClient) {
  register(
    "jupiter_prediction_events",
    "List Jupiter prediction events — binary markets on real-world events. Filter by category, sort by volume or date, include market data.",
    {
      provider: z.enum(["kalshi", "polymarket"]).optional().describe("Data source (default: polymarket)"),
      includeMarkets: z.boolean().optional().describe("Include market data in response"),
      category: z.string().optional().describe("Filter: all, crypto, sports, politics, esports, culture, economics, tech"),
      sortBy: z.enum(["volume", "beginAt"]).optional().describe("Sort field"),
      sortDirection: z.enum(["asc", "desc"]).optional().describe("Sort order"),
      filter: z.enum(["new", "live", "trending"]).optional().describe("Named filter: new (24h), live (active), trending"),
      start: z.number().optional().describe("Pagination start index"),
      end: z.number().optional().describe("Pagination end index"),
    },
    async (args) => {
      const result = await client.predictionEvents(args);
      return JSON.stringify(result, null, 2);
    },
  );
}
