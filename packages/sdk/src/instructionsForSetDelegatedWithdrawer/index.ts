import { ApiClient } from "../builder";
import InstructionForSetDelegatedWithdrawer, {
  BodyForSetDelegatedWithdrawerInstructions,
} from "./types";

export async function getInstructionForSetDelegatedWithdrawer(
  api_client: ApiClient,
  bearer_token: string,
  fund_authority: string,
  delegated_withdrawer?: string | null,
  fund_id?: string,
  fund_index?: number,
) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${bearer_token}`,
  };

  const body_content: BodyForSetDelegatedWithdrawerInstructions = {
    fund_id,
    fund_index,
    fund_authority,
    delegated_withdrawer,
  };

  return await api_client.request<InstructionForSetDelegatedWithdrawer>(
    `fund/delegated-withdrawer/ix`,
    "POST",
    {
      headers,
      body: body_content,
    }
  );
}
