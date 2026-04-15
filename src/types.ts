import type { z } from "zod";

/** Tool registration function — matches McpServer.tool() signature with Zod */
export type ToolRegistrar = (
  name: string,
  description: string,
  schema: Record<string, z.ZodType>,
  handler: (args: any) => Promise<string>,
) => void;
