import { ApiClient } from "../builder";
import StrategyInfo from "./types";

export async function getStrategyInfo(
  api_client: ApiClient,
  api_key: string,
  strategy_id: string
) {
  const headers: Record<string, string> = {
    "x-api-key": api_key,
  };

  return await api_client.request<StrategyInfo>(
    `strategy-info/${strategy_id}`,
    "GET",
    { headers }
  );
}
