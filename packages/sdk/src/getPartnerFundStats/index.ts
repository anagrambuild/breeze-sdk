import { ApiClient } from "../builder";
import PartnerFundStatsInfo from "./types";

export interface QueryForGettingPartnerFundStats {
  organization_id?: string;
  base_asset?: string;
  fiat_value?: string;
  start: string;
  end: string;
}

export async function getPartnerFundStats(
  api_client: ApiClient,
  organization_id: string,
  api_key: string,
  start: string,
  end: string,
  query?: Omit<QueryForGettingPartnerFundStats, 'start' | 'end'>
): Promise<PartnerFundStatsInfo> {
  const headers: Record<string, string> = {
    "api-key": api_key,
  };
  
  const params = new URLSearchParams();
  params.append('start', start);
  params.append('end', end);
  
  if (query) {
    if (query.organization_id) params.append('organization_id', query.organization_id);
    if (query.base_asset) params.append('base_asset', query.base_asset);
    if (query.fiat_value) params.append('fiat_value', query.fiat_value);
  }
  
  const url = `partner/${organization_id}/stats?${params.toString()}`;
  return await api_client.request<PartnerFundStatsInfo>(url, "GET", { headers });
}