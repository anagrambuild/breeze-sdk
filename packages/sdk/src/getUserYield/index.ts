import { ApiClient } from "../builder";
import UserYield from "./types";

export async function getUserYield(
  api_client: ApiClient,
  api_key: string,
  user_id: string,
  fund_id?: string,
  page?: number,
  limit?: number
) {
  const headers: Record<string, string> = {
    "x-api-key": api_key,
  };
  
  let endpoint = `user-yield/${user_id}`;
  const params: string[] = [];
  
  if (fund_id) {
    params.push(`fund_id=${fund_id}`);
  }
  if (page !== undefined) {
    params.push(`page=${page}`);
  }
  if (limit !== undefined) {
    params.push(`limit=${limit}`);
  }
  
  if (params.length > 0) {
    endpoint += `?${params.join('&')}`;
  }

  return await api_client.request<UserYield>(endpoint, "GET", {
    headers,
  });
}