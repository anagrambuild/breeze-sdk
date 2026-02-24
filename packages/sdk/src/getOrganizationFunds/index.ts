import { ApiClient } from "../builder";
import OrganizationFundsResponse from "./types";

export async function getOrganizationFunds(
  api_client: ApiClient,
  bearer_token: string,
) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${bearer_token}`,
  };

  return await api_client.request<OrganizationFundsResponse>(`funds`, "GET", {
    headers,
  });
}
