export default interface UserBalances {
  data: Array<{
    token_address: string;
    token_symbol: string;
    token_name: string;
    decimals: number;
    total_balance: number;
    yield_balance: {
      fund_id: string;
      funds: string; // amount of funds
      amount_of_yield: string;
      fund_apy: number;
    };
  }>;
  meta: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_more: boolean;
  }
}