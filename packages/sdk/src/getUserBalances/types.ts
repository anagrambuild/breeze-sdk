export default interface UserBalances {
  balances: Array<{
    asset: string;
    symbol: string;
    wallet_balance: string;
    total_balance: string;
    total_yield: string;
    fund_positions: Array<{
      fund_id: string;
      fund_name: string;
      position_value: string;
      yield_earned: string;
      apy: string;
    }>;
  }>;
  total_portfolio_value: string;
  total_yield_earned: string;
}