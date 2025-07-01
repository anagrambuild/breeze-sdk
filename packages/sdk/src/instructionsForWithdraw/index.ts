import { ApiClient } from "../builder";
import InstructionsForWithdraw, { BodyForWithdrawInstructions } from "./types";

export async function getInstructionsForWithdraw(
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
  
  const body_content: BodyForWithdrawInstructions = {
    params: {
      fund_id,
      shares,
      all,
      payer_key,
      user_key,
    }
  };

  return await api_client.request<InstructionsForWithdraw>(`withdraw/ix`, "POST", {
    headers,
    body: body_content,
  });
}