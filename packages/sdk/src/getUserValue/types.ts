export default interface UserValueInfo {
  success: boolean;
  result: UserValue;
}

type UserValue = {
  base_asset: string;
  value: Value[];
};

type Value = {
  fund_id: string;
  base_asset_value: number;
  fiat_value?: number;
  percent_of_fund: number;
  total_fund_value: number;
};
