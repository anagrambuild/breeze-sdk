import { ApiClient } from "../builder";
import CreateUserFundResponse, { CreateUserFundBody } from "./types";

export async function createUserFund(
  api_client: ApiClient,
  api_key: string,
  fund_id: string,
  user_key: string
) {
  const headers: Record<string, string> = {
    "api-key": api_key,
  };

  const body_content: CreateUserFundBody = {
    params: {
      fund_id: fund_id,
      user_key: user_key,
    }
  };

  return await api_client.request<CreateUserFundResponse>(`create_user_fund/tx`, "POST", {
    headers,
    body: body_content,
  });
}