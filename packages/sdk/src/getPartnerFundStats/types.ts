export default interface PartnerFundStatsInfo {
  success: boolean;
  result: PartnerFundStats[];
}

type PartnerFundStats = {
  time_stamps: string[];
  base_asset_value: number[];
  yeild_percentage: number[];
  fiat_value?: number[];
  meta: PartnerStatsMeta;
};

type PartnerStatsMeta = {
  base_asset: string;
  fund_id: string;
  fiat_currency?: string;
  start: string;
  end: string;
  granularity: string;
};