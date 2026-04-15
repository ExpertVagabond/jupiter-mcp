import { z } from "zod";
import { JupiterClient } from "../client.js";
import type { ToolRegistrar } from "../types.js";

export function registerPriceTools(register: ToolRegistrar, client: JupiterClient) {
  register(
    "jupiter_price",
    "Get current USD prices for one or more Solana tokens. Pass mint addresses comma-separated.",
    {
      mints: z.string().describe("Comma-separated mint addresses"),
      showExtraInfo: z.boolean().optional().describe("Include confidence, depth, and last swap time"),
    },
    async (args) => {
      const ids = args.mints.split(",").map((s: string) => s.trim());
      const result = await client.price(ids, args.showExtraInfo);
      return JSON.stringify(result, null, 2);
    },
  );
}
