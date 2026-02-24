import { ApiClient } from "../builder";
import OrganizationFundsResponse from "./types";

export async function getOrganizationFunds(
  api_client: ApiClient,
  api_key: string,
) {
  const headers: Record<string, string> = {
    "x-api-key": api_key,
  };

  return await api_client.request<OrganizationFundsResponse>(`funds`, "GET", {
    headers,
  });
}
