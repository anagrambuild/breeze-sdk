export default interface StrategyInfo {
  strategy_id: string;
  strategy_name: string;
  assets: string[];
  apy: number;
  apy_per_asset: Record<string, number>; // HashMap<String, f64> maps to Record<string, number>
}
