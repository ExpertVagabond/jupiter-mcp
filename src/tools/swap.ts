import { z } from "zod";
import { JupiterClient } from "../client.js";
import type { ToolRegistrar } from "../types.js";

export function registerSwapTools(register: ToolRegistrar, client: JupiterClient) {
  register(
    "jupiter_swap_quote",
    "Get a swap quote via Jupiter's managed /order path. Returns the best price across all routers (Metis, RFQ, Dflow, OKX).",
    {
      inputMint: z.string().describe("Mint address of token to sell (SOL: So11111111111111111111111111111111111111112)"),
      outputMint: z.string().describe("Mint address of token to buy (USDC: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v)"),
      amount: z.string().describe("Amount in smallest unit (lamports). For 1 SOL: '1000000000'"),
      taker: z.string().describe("Wallet address executing the swap"),
      slippageBps: z.number().optional().describe("Max slippage in basis points (default 50 = 0.5%)"),
    },
    async (args) => {
      const result = await client.swapOrder(args);
      return JSON.stringify(result, null, 2);
    },
  );

  register(
    "jupiter_swap_build",
    "Get raw swap instructions for custom transaction construction. Use when composing Jupiter swaps with other instructions (flashloans, multi-step). Metis router only.",
    {
      inputMint: z.string().describe("Mint address of token to sell"),
      outputMint: z.string().describe("Mint address of token to buy"),
      amount: z.string().describe("Amount in smallest unit"),
      taker: z.string().describe("Wallet address"),
      slippageBps: z.number().optional().describe("Max slippage in basis points"),
    },
    async (args) => {
      const result = await client.swapBuild(args);
      return JSON.stringify(result, null, 2);
    },
  );
}
