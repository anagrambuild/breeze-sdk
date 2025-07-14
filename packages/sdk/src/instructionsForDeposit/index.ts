import { ApiClient } from "../builder";
import InstructionsForDeposit, { BodyForDepositInstructions } from "./types";

export async function getInstructionsForDeposit(
  api_client: ApiClient,
  api_key: string,
  fund_id: string,
  amount: number,
  user_key: string,
  all?: boolean,
  payer_key?: string
) {
  const headers: Record<string, string> = {
    "api-key": api_key,
  };
  
  const body_content: BodyForDepositInstructions = {
    params: {
      fund_id,
      amount,
      user_key,
      all,
      payer_key,
    }
  };

  return await api_client.request<InstructionsForDeposit>(`deposit/ix`, "POST", {
    headers,
    body: body_content,
  });
}