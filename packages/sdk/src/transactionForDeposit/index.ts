import { ApiClient } from "../builder";
import TransactionForDeposit, { BodyForTxDeposit } from "./types";

export async function getTransactionForDeposit(
  api_client: ApiClient,
  api_key: string,
  fund_id: string,
  amount: number,
  user_key: string,
  all?: boolean,
  payer_key?: string
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
    }
  };

  return await api_client.request<TransactionForDeposit>(`deposit/tx`, "POST", {
    headers,
    body: body_content,
  });
}
