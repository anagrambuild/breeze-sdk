import { ApiClient } from "../builder";
import UserFunds from "./types";

export async function getUserFund(api_client : ApiClient,user_id: string, api_key: string) {
  const headers: Record<string, string> = {
    "api-key": api_key,
  };
  return await api_client.request<UserFunds>(`userfund/${user_id}`, "GET", { headers });
}
