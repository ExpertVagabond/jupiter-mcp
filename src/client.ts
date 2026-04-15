/**
 * Jupiter API Client — thin wrapper over all Jupiter Developer Platform endpoints.
 * One client, all products. No RPC node required.
 */

const API_BASE = "https://api.jup.ag";

interface RequestOptions {
  method?: "GET" | "POST";
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
}

export class JupiterClient {
  private apiKey: string | undefined;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  private async request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
    const { method = "GET", body, params } = opts;
    let url = `${API_BASE}${path}`;

    if (params) {
      const qs = new URLSearchParams();
      for (const [k, v] of Object.entries(params)) {
        if (v !== undefined) qs.set(k, String(v));
      }
      const qstr = qs.toString();
      if (qstr) url += `?${qstr}`;
    }

    const headers: Record<string, string> = {
      "Accept": "application/json",
    };
    if (this.apiKey) {
      headers["x-api-key"] = this.apiKey;
    }
    if (body) {
      headers["Content-Type"] = "application/json";
    }

    const resp = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      throw new Error(`Jupiter API ${resp.status}: ${text.slice(0, 500)}`);
    }

    return resp.json() as Promise<T>;
  }

  // ── Swap V2 ──────────────────────────────────────────────

  /** Get a quote + assembled transaction via managed /order path */
  async swapOrder(params: {
    inputMint: string;
    outputMint: string;
    amount: string;
    taker: string;
    slippageBps?: number;
    referralAccount?: string;
    referralFee?: number;
  }) {
    return this.request("/swap/v2/order", { params: params as any });
  }

  /** Execute a signed /order transaction */
  async swapExecute(signedTransaction: string, requestId: string) {
    return this.request("/swap/v2/execute", {
      method: "POST",
      body: { signedTransaction, requestId },
    });
  }

  /** Get a quote + raw swap instructions via /build path */
  async swapBuild(params: {
    inputMint: string;
    outputMint: string;
    amount: string;
    taker: string;
    slippageBps?: number;
  }) {
    return this.request("/swap/v2/build", { params: params as any });
  }

  // ── Tokens ───────────────────────────────────────────────

  /** Search tokens by name, symbol, or mint address */
  async tokenSearch(query: string, limit?: number) {
    return this.request("/tokens/v2/search", {
      params: { query, limit },
    });
  }

  /** Get token metadata and trading metrics by mint */
  async tokenInfo(mint: string) {
    return this.request(`/tokens/v2/${mint}`);
  }

  // ── Price ────────────────────────────────────────────────

  /** Get USD prices for one or more token mints */
  async price(ids: string[], showExtraInfo?: boolean) {
    return this.request("/price/v3", {
      params: {
        ids: ids.join(","),
        showExtraInfo: showExtraInfo ? "true" : undefined,
      },
    });
  }

  // ── Lend ─────────────────────────────────────────────────

  /** List available lending markets/yields */
  async lendMarkets() {
    return this.request("/lend/v1/markets");
  }

  /** Get yield details for a specific token */
  async lendYield(mint: string) {
    return this.request(`/lend/v1/earn/yields`, {
      params: { mint },
    });
  }

  // ── Trigger (Limit Orders) ───────────────────────────────

  /** Get open limit orders for a wallet */
  async triggerOrders(wallet: string) {
    return this.request("/trigger/v2/orders", {
      params: { wallet },
    });
  }

  /** Create a limit order (returns transaction to sign) */
  async triggerCreate(params: {
    inputMint: string;
    outputMint: string;
    inAmount: string;
    outAmount: string;
    maker: string;
    expiredAt?: string;
  }) {
    return this.request("/trigger/v2/orders/price", {
      method: "POST",
      body: params,
    });
  }

  /** Cancel a limit order */
  async triggerCancel(params: { maker: string; orders: string[] }) {
    return this.request("/trigger/v2/orders/cancel", {
      method: "POST",
      body: params,
    });
  }

  // ── Recurring (DCA) ──────────────────────────────────────

  /** Get active DCA orders for a wallet */
  async recurringOrders(wallet: string) {
    return this.request("/recurring/v1/orders", {
      params: { wallet },
    });
  }

  /** Create a DCA order (returns transaction to sign) */
  async recurringCreate(params: {
    inputMint: string;
    outputMint: string;
    inAmount: string;
    inAmountPerCycle: string;
    cycleSecondsApart: number;
    maker: string;
    minOutAmountPerCycle?: string;
    maxOutAmountPerCycle?: string;
  }) {
    return this.request("/recurring/v1/createOrder", {
      method: "POST",
      body: params,
    });
  }

  // ── Prediction Markets ───────────────────────────────────

  /** List available prediction markets */
  async predictionMarkets(params?: { status?: string; limit?: number }) {
    return this.request("/prediction/v1/markets", { params: params as any });
  }

  /** Get market details */
  async predictionMarket(marketId: string) {
    return this.request(`/prediction/v1/markets/${marketId}`);
  }

  // ── Perps ────────────────────────────────────────────────

  /** List perpetual markets */
  async perpsMarkets() {
    return this.request("/perps/v1/markets");
  }

  /** Get position info for a wallet */
  async perpsPositions(wallet: string) {
    return this.request("/perps/v1/positions", {
      params: { wallet },
    });
  }

  // ── Portfolio ────────────────────────────────────────────

  /** Get aggregated portfolio positions */
  async portfolio(wallet: string) {
    return this.request("/portfolio/v1/positions", {
      params: { wallet },
    });
  }
}
