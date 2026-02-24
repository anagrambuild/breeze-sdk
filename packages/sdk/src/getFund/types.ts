export type LendFundStatus = 'Live' | 'Paused' | 'WithdrawOnly';

export interface FundOrganization {
  id: string;
  name: string;
}

export interface FundConstraint {
  yield_source_target: {
    yield_source_type: string;
    protocol: string;
  };
  constraint_type: 'MaxPercentage' | 'MaxBaseAssetAmount';
  value: number;
}

export interface YieldAllocation {
  index: number;
  yield_source_type: string;
  protocol: string;
  protocol_id: string;
  position_id: string;
  deposit_amount: number;
  deposit_timestamp: number;
  current_value: number;
  time_weighted_value: number;
}

export interface ProtocolOptions {
  kamino_reserve: string;
  marginfi_bank: string;
  drift_market: string;
  jup_lend_market: string;
  jup_lend_reserve: string;
}

export default interface Fund {
  fund_id: string;
  base_asset_token_mint: string;
  base_asset_token_decimals: number;
  base_asset_token_account: string;
  total_deposits: number;
  total_users: number;
  last_value_tracked_at: number;
  total_shares: number;
  share_price: number;
  current_value: number;
  authority: string;
  updated_at_timestamp: number;
  updated_at_slot: number;
  risk_max: number;
  risk_aversion_bps: number;
  allocated_to_yield: number;
  unallocated_amount: number;
  bump: number;
  token_account_bump: number;
  index_number: number;
  lookup_table: string;
  has_fees: boolean;
  constraints: FundConstraint[];
  allocations: YieldAllocation[];
  protocol_options: ProtocolOptions;
  last_rebalance_slot: number;
  status: LendFundStatus;
  withdraw_authority?: string;
  assigned_org?: FundOrganization;
}
