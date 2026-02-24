import Fund, { FundOrganization } from '../getFund/types';

export interface FundWithStrategyInfo {
  fund: Fund;
  strategy_name?: string;
  assigned_org?: FundOrganization;
}

export default interface OrganizationFundsResponse {
  funds: FundWithStrategyInfo[];
  is_admin: boolean;
}
