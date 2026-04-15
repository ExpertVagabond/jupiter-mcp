import { z } from "zod";
import { JupiterClient } from "../client.js";
import type { ToolRegistrar } from "../types.js";

export function registerPerpsTools(register: ToolRegistrar, client: JupiterClient) {
  register(
    "jupiter_perps_markets",
    "List Jupiter perpetual futures markets — trading pairs, funding rates, open interest.",
    {},
    async () => {
      const result = await client.perpsMarkets();
      return JSON.stringify(result, null, 2);
    },
  );

  register(
    "jupiter_perps_positions",
    "Get open perpetual positions for a wallet — leverage, entry price, PnL, liquidation price.",
    {
      wallet: z.string().describe("Wallet address"),
    },
    async (args) => {
      const result = await client.perpsPositions(args.wallet);
      return JSON.stringify(result, null, 2);
    },
  );
}
