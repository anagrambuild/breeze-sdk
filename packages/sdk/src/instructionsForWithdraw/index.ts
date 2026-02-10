import { ApiClient } from "../builder";
import InstructionsForWithdraw, { BodyForWithdrawInstructions } from "./types";

export async function getInstructionForWithdraw(
  api_client: ApiClient,
  api_key: string,
  fund_id?: string,
  amount?: number,
  user_key?: string,
  all?: boolean,
  payer_key?: string,
  base_asset?: string,
  strategy_id?: string,
  user_token_account?: string,
  create_wsol_ata?: boolean,
  unwrap_wsol_ata?: boolean,
  detect_wsol_ata?: boolean,
  exclude_fees?: boolean
) {
  const headers: Record<string, string> = {
    "x-api-key": api_key,
  };

  const body_content: BodyForWithdrawInstructions = {
    params: {
      fund_id,
      amount,
      user_key,
      all,
      payer_key,
      base_asset,
      strategy_id,
      user_token_account,
      create_wsol_ata,
      unwrap_wsol_ata,
      detect_wsol_ata,
      exclude_fees,
    }
  };

  return await api_client.request<InstructionsForWithdraw>(`withdraw/ix`, "POST", {
    headers,
    body: body_content,
  });
}