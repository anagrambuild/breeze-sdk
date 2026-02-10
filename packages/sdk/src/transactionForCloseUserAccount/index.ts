import { ApiClient } from "../builder";
import { BodyForTxCloseUserAccount, TransactionForCloseUserAccount } from "./types";

export async function getTransactionForCloseUserAccount(
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

  const body_content: BodyForTxCloseUserAccount = {
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

  return await api_client.request<TransactionForCloseUserAccount>(`close-user-account/tx`, "POST", {
    headers,
    body: body_content,
  });
}
