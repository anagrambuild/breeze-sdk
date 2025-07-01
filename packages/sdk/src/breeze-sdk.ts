import { ApiClient, BreezeApiError } from './builder';
import { getFund } from './getFund';
import { getUserFund } from './getUserFund';
import { getUserInfo } from './getUserInfo';
import { getUserStats } from './getUserStats';
import { getUserValue } from './getUserValue';
import { getTransactionForDeposit } from './transactionForDeposit';
import { getTransactionForWithdraw } from './transactionForWithdraw';
import { getInstructionsForDeposit } from './instructionsForDeposit';
import { getInstructionsForWithdraw } from './instructionsForWithdraw';
import { createUserFund } from './createUserFund';

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

  // User operations
  async getUserInfo(userId: string) {
    return getUserInfo(this.apiClient, userId, this.apiKey);
  }

  async getUserFunds(userId: string) {
    return getUserFund(this.apiClient, userId, this.apiKey);
  }

  async getUserValue(userId: string) {
    return getUserValue(this.apiClient, userId, this.apiKey);
  }

  async getUserStats(userId: string, startDate: string, endDate: string) {
    return getUserStats(this.apiClient, userId, this.apiKey, startDate, endDate);
  }

  // Transaction operations
  async createDepositTransaction(options: {
    fundId?: string;
    amount?: number;
    all?: boolean;
    payerKey?: string;
    userKey?: string;
  }) {
    return getTransactionForDeposit(
      this.apiClient,
      this.apiKey,
      options.fundId,
      options.amount,
      options.all,
      options.payerKey,
      options.userKey
    );
  }

  async createWithdrawTransaction(options: {
    fundId?: string;
    shares?: number;
    all?: boolean;
    payerKey?: string;
    userKey?: string;
  }) {
    return getTransactionForWithdraw(
      this.apiClient,
      this.apiKey,
      options.fundId,
      options.shares,
      options.all,
      options.payerKey,
      options.userKey
    );
  }

  async getDepositInstructions(options: {
    fundId?: string;
    amount?: number;
    all?: boolean;
    payerKey?: string;
    userKey?: string;
  }) {
    return getInstructionsForDeposit(
      this.apiClient,
      this.apiKey,
      options.fundId,
      options.amount,
      options.all,
      options.payerKey,
      options.userKey
    );
  }

  async getWithdrawInstructions(options: {
    fundId?: string;
    shares?: number;
    all?: boolean;
    payerKey?: string;
    userKey?: string;
  }) {
    return getInstructionsForWithdraw(
      this.apiClient,
      this.apiKey,
      options.fundId,
      options.shares,
      options.all,
      options.payerKey,
      options.userKey
    );
  }

  async createUserFundTransaction(fundId: string, userKey: string) {
    return createUserFund(this.apiClient, this.apiKey, fundId, userKey);
  }

  // Utility methods
  updateApiKey(newApiKey: string) {
    this.apiKey = newApiKey;
  }

  getApiClient() {
    return this.apiClient;
  }
}