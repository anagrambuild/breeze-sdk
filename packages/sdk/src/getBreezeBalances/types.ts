export default interface BreezeBalancesResponse {
  data: BreezeBalance[];
  meta: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_more: boolean;
  };
}

export interface BreezeBalance {
  strategy_name: string;
  strategy_id: string;
  fund_id: string;
  token_address: string;
  token_symbol: string;
  token_name: string;
  decimals: number;
  total_position_value: number; // u128 but comes as number from JSON
  total_deposited_value: number; // u128 but comes as number from JSON
  yield_earned: number; // u128 but comes as number from JSON
  apy: number;
  last_updated: string;
}
