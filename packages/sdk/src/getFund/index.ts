import { ApiClient } from "../builder";
import FundData from "./types";


export async function getFund(api_client : ApiClient,fund_id: string, api_key: string) {
  const headers: Record<string, string> = {
    "api-key": api_key,
  };
  return await api_client.request<FundData>(`getfund/${fund_id}`, "GET", { headers });
}
