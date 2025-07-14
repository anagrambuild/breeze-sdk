export default interface UserValueInfo {
  success: boolean;
  result: Record<string, Value[]>; // Keys are asset names like "USDC", "PYUSD", etc.
}

type Value = {
  fund_id: string;
  base_asset_value: number;
  fiat_value?: number;
  percent_of_fund: number;
  total_fund_value: number;
};
