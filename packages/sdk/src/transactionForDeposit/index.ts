import { ApiClient } from "../builder";
import { BodyForTxDeposit, TransactionForDeposit } from "./types";

export async function getTransactionForDeposit(
  api_client: ApiClient,
  api_key: string,
  fund_id?: string,
  amount?: number,
  user_key?: string,
  all?: boolean,
  payer_key?: string,
  base_asset?: string,
  strategy_id?: string,
  user_token_account?: string
) {
  const headers: Record<string, string> = {
    "x-api-key": api_key,
  };
  
  const body_content: BodyForTxDeposit = {
    params: {
      fund_id,
      amount,
      user_key,
      all,
      payer_key,
      base_asset,
      strategy_id,
      user_token_account,
    }
  };

  return await api_client.request<TransactionForDeposit>(`deposit/tx`, "POST", {
    headers,
    body: body_content,
  });
}
