import { ApiClient } from "../builder";
import UserValueInfo from "./types";

export interface QueryForGettingUserValue {
  fund_id?: string;
  base_asset?: string;
  fiat_value?: string;
}

export async function getUserValue(
  api_client: ApiClient,
  user_id: string,
  api_key: string,
  query?: QueryForGettingUserValue
): Promise<UserValueInfo> {
  const headers: Record<string, string> = {
    "api-key": api_key,
  };
  
  let url = `user/${user_id}/current_value`;
  if (query) {
    const params = new URLSearchParams();
    if (query.fund_id) params.append('fund_id', query.fund_id);
    if (query.base_asset) params.append('base_asset', query.base_asset);
    if (query.fiat_value) params.append('fiat_value', query.fiat_value);
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }
  
  return await api_client.request<UserValueInfo>(url, "GET", { headers });
}
