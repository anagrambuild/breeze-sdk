import { ApiClient } from "../builder";
import TransactionForDeposit, { BodyForTxDeposit } from "./types";

export async function getTransactionForDeposit(
  api_client: ApiClient,
  api_key: string,
  fund_id?: string,
  amount?: number,
  all?: boolean,
  payer_key?: string,
  user_key?: string
) {
  const headers: Record<string, string> = {
    "api-key": api_key,
  };
  
  const body_content: BodyForTxDeposit = {
    params: {
      fund_id,
      amount,
      all,
      payer_key,
      user_key,
    }
  };

  return await api_client.request<TransactionForDeposit>(`deposit/tx`, "POST", {
    headers,
    body: body_content,
  });
}
