import { z } from "zod";
import { JupiterClient } from "../client.js";
import type { ToolRegistrar } from "../types.js";

export function registerTriggerTools(register: ToolRegistrar, client: JupiterClient) {
  register(
    "jupiter_limit_orders",
    "Get all open limit orders for a wallet — pending trigger orders with price targets and amounts.",
    {
      wallet: z.string().describe("Wallet address"),
    },
    async (args) => {
      const result = await client.triggerOrders(args.wallet);
      return JSON.stringify(result, null, 2);
    },
  );

  register(
    "jupiter_limit_order_create",
    "Create a limit order. Returns a transaction to sign. Supports single, OCO (TP/SL), and OTOCO orders.",
    {
      inputMint: z.string().describe("Mint of token to sell"),
      outputMint: z.string().describe("Mint of token to buy"),
      inAmount: z.string().describe("Amount to sell in base units"),
      outAmount: z.string().describe("Min amount to receive (sets limit price)"),
      maker: z.string().describe("Wallet address creating the order"),
      expiredAt: z.string().optional().describe("ISO 8601 expiration time"),
    },
    async (args) => {
      const result = await client.triggerCreate(args);
      return JSON.stringify(result, null, 2);
    },
  );

  register(
    "jupiter_limit_order_cancel",
    "Cancel one or more open limit orders.",
    {
      maker: z.string().describe("Wallet that created the orders"),
      orders: z.array(z.string()).describe("Order public keys to cancel"),
    },
    async (args) => {
      const result = await client.triggerCancel(args);
      return JSON.stringify(result, null, 2);
    },
  );
}
