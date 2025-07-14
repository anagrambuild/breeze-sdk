import { ApiClient } from "../builder";
import InstructionsForWithdraw, { BodyForWithdrawInstructions } from "./types";

export async function getInstructionForWithdraw(
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
  
  const body_content: BodyForWithdrawInstructions = {
    params: {
      fund_id,
      shares,
      user_key,
      all,
      payer_key,
    }
  };

  return await api_client.request<InstructionsForWithdraw>(`withdraw/ix`, "POST", {
    headers,
    body: body_content,
  });
}