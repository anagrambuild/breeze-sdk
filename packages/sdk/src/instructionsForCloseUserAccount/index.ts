import { ApiClient } from "../builder";
import InstructionsForCloseUserAccount, { BodyForCloseUserAccountInstructions } from "./types";

export async function getInstructionsForCloseUserAccount(
  api_client: ApiClient,
  api_key: string,
  user_account?: string,
  user_pubkey?: string,
  strategy_id?: string,
  mint?: string,
  payer?: string,
  funds_recipient?: string,
  user_token_account?: string
) {
  const headers: Record<string, string> = {
    "x-api-key": api_key,
  };

  const body_content: BodyForCloseUserAccountInstructions = {
    params: {
      user_account,
      user_pubkey,
      strategy_id,
      mint,
      payer,
      funds_recipient,
      user_token_account,
    }
  };

  return await api_client.request<InstructionsForCloseUserAccount>(`close-user-account/ix`, "POST", {
    headers,
    body: body_content,
  });
}
