export default interface UserYield {
  data: Array<{
    fund_id: string;
    fund_name: string;
    base_asset: string;
    position_value: string;
    yield_earned: string;
    apy: string;
    entry_date: string;
    last_updated: string;
  }>;
  meta: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_more: boolean;
  }
}