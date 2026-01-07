import { ApiClient } from "../builder";
import BreezeBalancesResponse from "./types";

export async function getBreezeBalances(
  api_client: ApiClient,
  api_key: string,
  user_id: string,
  asset?: string,
  sort_by?: string,
  sort_order?: string,
  page?: number,
  limit?: number,
  strategy_id?: string
) {
  const headers: Record<string, string> = {
    "x-api-key": api_key,
  };

  let endpoint = `breeze-balances/${user_id}`;
  const params: string[] = [];

  if (asset) {
    params.push(`asset=${asset}`);
  }
  if (sort_by) {
    params.push(`sort_by=${sort_by}`);
  }
  if (sort_order) {
    params.push(`sort_order=${sort_order}`);
  }
  if (page) {
    params.push(`page=${page}`);
  }
  if (limit) {
    params.push(`limit=${limit}`);
  }
  if (strategy_id) {
    params.push(`strategy_id=${strategy_id}`);
  }

  if (params.length > 0) {
    endpoint += `?${params.join('&')}`;
  }

  return await api_client.request<BreezeBalancesResponse>(endpoint, "GET", {
    headers,
  });
}
