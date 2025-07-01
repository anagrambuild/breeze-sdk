import { ApiClient } from "../builder";
import TransactionForWithdraw, { BodyForTxWithdraw } from "./types";

export async function getTransactionForWithdraw(
  api_client: ApiClient,
  api_key: string,
  fund_id?: string,
  shares?: number,
  all?: boolean,
  payer_key?: string,
  user_key?: string
) {
  const headers: Record<string, string> = {
    "api-key": api_key,
  };
  
  const body_content: BodyForTxWithdraw = {
    params: {
      fund_id,
      shares,
      all,
      payer_key,
      user_key,
    }
  };

  return await api_client.request<TransactionForWithdraw>(`withdraw/tx`, "POST", {
    headers,
    body: body_content,
  });
}
