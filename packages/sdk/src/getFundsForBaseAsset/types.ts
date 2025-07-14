export default interface FundsForBaseAssetInfo {
  success?: boolean;
  sucess?: boolean; // Handle server typo
  result: FundInfo[];
}

type FundInfo = {
  fund_id: string;
  base_asset: string;
  name?: string;
  description?: string;
  total_value?: number;
  created_at?: string;
};