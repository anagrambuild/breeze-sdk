import { ApiClient } from "../builder";
import FundsForBaseAssetInfo from "./types";

export async function getFundsForBaseAsset(
  api_client: ApiClient,
  base_asset: string,
  api_key: string
): Promise<FundsForBaseAssetInfo> {
  const headers: Record<string, string> = {
    "api-key": api_key,
  };
  
  return await api_client.request<FundsForBaseAssetInfo>(
    `fund/${base_asset}`,
    "GET",
    { headers }
  );
}