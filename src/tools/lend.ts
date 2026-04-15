import { z } from "zod";
import { JupiterClient } from "../client.js";
import type { ToolRegistrar } from "../types.js";

export function registerLendTools(register: ToolRegistrar, client: JupiterClient) {
  register(
    "jupiter_lend_deposit",
    "Create a deposit transaction for Jupiter Lend Earn. Returns a base64-encoded unsigned transaction to sign and submit.",
    {
      asset: z.string().describe("Token mint address to deposit (e.g. USDC: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v)"),
      signer: z.string().describe("Wallet address making the deposit"),
      amount: z.string().describe("Amount to deposit in base units"),
    },
    async (args) => {
      const result = await client.lendDeposit(args);
      return JSON.stringify(result, null, 2);
    },
  );

  register(
    "jupiter_lend_withdraw",
    "Create a withdraw transaction for Jupiter Lend Earn. Returns a base64-encoded unsigned transaction.",
    {
      asset: z.string().describe("Token mint address to withdraw"),
      signer: z.string().describe("Wallet address"),
      amount: z.string().describe("Amount to withdraw in base units"),
    },
    async (args) => {
      const result = await client.lendWithdraw(args);
      return JSON.stringify(result, null, 2);
    },
  );
}
