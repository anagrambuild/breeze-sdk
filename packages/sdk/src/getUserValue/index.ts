import { ApiClient } from "../builder";
import UserValueInfo from "./types";

export async function getUserValue(api_client : ApiClient,user_id: string, api_key: string) {
  const headers: Record<string, string> = {
    "api-key": api_key,
  };
  return await api_client.request<UserValueInfo>(`user/${user_id}/current_value`, "GET", { headers });
}
