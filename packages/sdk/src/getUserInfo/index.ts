import { ApiClient } from "../builder";
import UserInfo from "./types";


export async function getUserInfo(api_client : ApiClient,user_id: string, api_key: string) {
  const headers: Record<string, string> = {
    "api-key": api_key,
  };
  return await api_client.request<UserInfo>(`user/${user_id}`, "GET", { headers });
}
