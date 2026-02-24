import { ApiClient } from "../builder";
import Fund from "./types";

export async function getFund(
  api_client: ApiClient,
  api_key: string,
  fund_id: string,
) {
  const headers: Record<string, string> = {
    "x-api-key": api_key,
  };

  return await api_client.request<Fund>(`fund/${fund_id}`, "GET", {
    headers,
  });
}
