
export default interface UserStats {
  success: boolean;
  result: Stats[];
}

type Stats = {
    time_stamps: string[]
    base_asset_value: number[],
    fiat_value?: number[],
    yeild_percentage: number[],
    meta: StatsMeta,
}

type StatsMeta = {
    base_asset: string,
    fund_id: string,
    fiat_currency?: string,
    start: string,
    end: string,
    granularity: string,
}