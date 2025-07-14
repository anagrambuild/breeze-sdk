import { ApiClient } from "../builder";
import TransactionForWithdraw, { BodyForTxWithdraw } from "./types";

export async function getTransactionForWithdraw(
  api_client: ApiClient,
  api_key: string,
  fund_id: string,
  shares: number,
  user_key: string,
  all?: boolean,
  payer_key?: string
) {
  const headers: Record<string, string> = {
    "api-key": api_key,
  };
  
  const body_content: BodyForTxWithdraw = {
    params: {
      fund_id,
      shares,
      user_key,
      all,
      payer_key,
    }
  };

  return await api_client.request<TransactionForWithdraw>(`withdraw/tx`, "POST", {
    headers,
    body: body_content,
  });
}
