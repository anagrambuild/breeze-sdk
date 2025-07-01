import { ApiClient } from "../builder";
import UserStats from "./types";

export async function getUserStats(
  api_client: ApiClient,
  user_id: string,
  api_key: string,
  start: string,
  end: string
): Promise<UserStats> {
  const headers: Record<string, string> = {
    "api-key": api_key,
  };
  return await api_client.request<UserStats>(
    `user/${user_id}/stats?start=${start}&end=${end}`,
    "GET",
    { headers }
  );
}
