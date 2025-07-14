import { ApiClient, BreezeApiError } from './builder';
import { getFund } from './getFund';
import { getUserInfo } from './getUserInfo';
import { getUserStats, QueryForGettingUserFundStats } from './getUserStats';
import { getUserValue, QueryForGettingUserValue } from './getUserValue';
import { getFundsForBaseAsset } from './getFundsForBaseAsset';
import { getPartnerFundStats, QueryForGettingPartnerFundStats } from './getPartnerFundStats';
import { getTransactionForDeposit } from './transactionForDeposit';
import { getTransactionForWithdraw } from './transactionForWithdraw';
import { getInstructionsForDeposit } from './instructionsForDeposit';
import { getInstructionForWithdraw } from './instructionsForWithdraw';

export interface BreezeSDKConfig {
  baseUrl?: string;
  apiKey: string;
  timeout?: number;
}

export class BreezeSDK {
  private apiClient: ApiClient;
  private apiKey: string;

  constructor(config: BreezeSDKConfig) {
    this.apiClient = new ApiClient(config.baseUrl, config.timeout);
    this.apiKey = config.apiKey;
  }

  // Fund operations
  async getFund(fundId: string) {
    return getFund(this.apiClient, fundId, this.apiKey);
  }

  async getFundsForBaseAsset(baseAsset: string) {
    return getFundsForBaseAsset(this.apiClient, baseAsset, this.apiKey);
  }

  // User operations
  async getUserInfo(userId: string) {
    return getUserInfo(this.apiClient, userId, this.apiKey);
  }

  async getUserValue(userId: string, options?: {
    fundId?: string;
    baseAsset?: string;
    fiatValue?: string;
  }) {
    const query: QueryForGettingUserValue | undefined = options ? {
      fund_id: options.fundId,
      base_asset: options.baseAsset,
      fiat_value: options.fiatValue
    } : undefined;
    return getUserValue(this.apiClient, userId, this.apiKey, query);
  }

  async getUserStats(userId: string, start: string, end: string, options?: {
    fundId?: string;
    baseAsset?: string;
    fiatValue?: string;
  }) {
    const query: Omit<QueryForGettingUserFundStats, 'start' | 'end'> | undefined = options ? {
      fund_id: options.fundId,
      base_asset: options.baseAsset,
      fiat_value: options.fiatValue
    } : undefined;
    return getUserStats(this.apiClient, userId, this.apiKey, start, end, query);
  }

  // Partner operations
  async getPartnerFundStats(organizationId: string, start: string, end: string, options?: {
    organizationId?: string;
    baseAsset?: string;
    fiatValue?: string;
  }) {
    const query: Omit<QueryForGettingPartnerFundStats, 'start' | 'end'> | undefined = options ? {
      organization_id: options.organizationId,
      base_asset: options.baseAsset,
      fiat_value: options.fiatValue
    } : undefined;
    return getPartnerFundStats(this.apiClient, organizationId, this.apiKey, start, end, query);
  }

  // Transaction operations
  async createDepositTransaction(options: {
    fundId: string;
    amount: number;
    userKey: string;
    all?: boolean;
    payerKey?: string;
  }) {
    return getTransactionForDeposit(
      this.apiClient,
      this.apiKey,
      options.fundId,
      options.amount,
      options.userKey,
      options.all,
      options.payerKey
    );
  }

  async createWithdrawTransaction(options: {
    fundId: string;
    shares: number;
    userKey: string;
    all?: boolean;
    payerKey?: string;
  }) {
    return getTransactionForWithdraw(
      this.apiClient,
      this.apiKey,
      options.fundId,
      options.shares,
      options.userKey,
      options.all,
      options.payerKey
    );
  }

  async getDepositInstructions(options: {
    fundId: string;
    amount: number;
    userKey: string;
    all?: boolean;
    payerKey?: string;
  }) {
    return getInstructionsForDeposit(
      this.apiClient,
      this.apiKey,
      options.fundId,
      options.amount,
      options.userKey,
      options.all,
      options.payerKey
    );
  }

  async getWithdrawInstruction(options: {
    fundId: string;
    shares: number;
    userKey: string;
    all?: boolean;
    payerKey?: string;
  }) {
    return getInstructionForWithdraw(
      this.apiClient,
      this.apiKey,
      options.fundId,
      options.shares,
      options.userKey,
      options.all,
      options.payerKey
    );
  }

  // Utility methods
  updateApiKey(newApiKey: string) {
    this.apiKey = newApiKey;
  }

  getApiClient() {
    return this.apiClient;
  }
}