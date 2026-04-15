import { z } from "zod";
import { JupiterClient } from "../client.js";
import type { ToolRegistrar } from "../types.js";

export function registerRecurringTools(register: ToolRegistrar, client: JupiterClient) {
  register(
    "jupiter_dca_orders",
    "Get active DCA (Dollar Cost Average) orders for a wallet — recurring schedules and progress.",
    {
      wallet: z.string().describe("Wallet address"),
    },
    async (args) => {
      const result = await client.recurringOrders(args.wallet);
      return JSON.stringify(result, null, 2);
    },
  );

  register(
    "jupiter_dca_create",
    "Create a DCA order — recurring swap on a schedule. Returns transaction to sign. Example: buy $10 SOL every hour.",
    {
      inputMint: z.string().describe("Mint of token to spend (e.g. USDC)"),
      outputMint: z.string().describe("Mint of token to accumulate (e.g. SOL)"),
      inAmount: z.string().describe("Total amount to spend over DCA period (base units)"),
      inAmountPerCycle: z.string().describe("Amount per cycle (base units)"),
      cycleSecondsApart: z.number().describe("Seconds between cycles (3600 = hourly)"),
      maker: z.string().describe("Wallet address"),
      minOutAmountPerCycle: z.string().optional().describe("Min output per cycle (slippage protection)"),
      maxOutAmountPerCycle: z.string().optional().describe("Max output per cycle"),
    },
    async (args) => {
      const result = await client.recurringCreate(args);
      return JSON.stringify(result, null, 2);
    },
  );
}
