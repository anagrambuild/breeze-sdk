import { ApiClient } from "../builder";
import Fund from "./types";

export async function getFund(
  api_client: ApiClient,
  bearer_token: string,
  fund_id: string,
) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${bearer_token}`,
  };

  return await api_client.request<Fund>(`fund/${fund_id}`, "GET", {
    headers,
  });
}
