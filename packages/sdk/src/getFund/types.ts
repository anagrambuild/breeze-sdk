export default interface FundData {
  success?: boolean;
  sucess?: boolean; // Handle typo in API response
  result: Fund;
}

type Fund = {
  fund_id: string;
  base_asset: string;
  base_asset_decimals: number;
  user_id: string;
  total_shares: number;
  share_price: number;
  current_value: number;
  updated_at_timestamp: number;
  updated_at_slot: number;
  risk_max: number;
  current_risk: number;
  unallocated_amount: number;
  last_recalculate_value_timestamp: number;
  last_rebalance_timestamp: number;
  last_rebalance_slot: number;
  constraints: FundConstraint[];
  allocations: FundAlocation[];
  fund_index: number;
  lut_address: string;
};

type FundAlocation = {
  source_type: string;
  amount: number;
  current_value: number;
  allocation_score: number;
};

type FundConstraint = {
  source_type: string;
  max_allocation?: number;
  min_allocation?: number;
};
