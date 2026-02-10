import { ApiClient } from "../builder";
import { HealthResponse } from "./types";

export async function getHealth(
  api_client: ApiClient,
  api_key: string
) {
  const headers: Record<string, string> = {
    "x-api-key": api_key,
  };

  return await api_client.request<HealthResponse>(`health`, "GET", {
    headers,
  });
}
