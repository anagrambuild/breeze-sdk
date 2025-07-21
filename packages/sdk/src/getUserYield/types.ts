export default interface UserYield {
  pagination: {
    limit: number;
    page: number;
    total_items: number;
    total_pages: number;
  };
  total_yield_earned: string;
  yields: Array<{
    apy: string;
    base_asset: string;
    entry_date: string;
    fund_id: string;
    fund_name: string;
    last_updated: string;
    position_value: string;
    yield_earned: string;
  }>;
}