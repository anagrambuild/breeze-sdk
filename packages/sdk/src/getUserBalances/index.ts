import { ApiClient } from "../builder";
import UserBalances from "./types";

export async function getUserBalances(
  api_client: ApiClient,
  api_key: string,
  user_id: string,
  asset?: string,
  sort_by?: string,
  sort_order?: string
) {
  const headers: Record<string, string> = {
    "x-api-key": api_key,
  };
  
  let endpoint = `user-balances/${user_id}`;
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
  
  if (params.length > 0) {
    endpoint += `?${params.join('&')}`;
  }

  return await api_client.request<UserBalances>(endpoint, "GET", {
    headers,
  });
}