import { ApiClient, BreezeApiError } from './builder';
import { getUserYield } from './getUserYield';
import { getUserBalances } from './getUserBalances';
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
    this.apiClient = new ApiClient(config.baseUrl || 'https://api.breeze.baby/', config.timeout);
    this.apiKey = config.apiKey;
  }

  async getUserYield(options: {
    userId: string;
    fundId?: string;
    page?: number;
    limit?: number;
  }) {
    return getUserYield(
      this.apiClient,
      this.apiKey,
      options.userId,
      options.fundId,
      options.page,
      options.limit
    );
  }

  async getUserBalances(options: {
    userId: string;
    asset?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
  }) {
    return getUserBalances(
      this.apiClient,
      this.apiKey,
      options.userId,
      options.asset,
      options.sortBy,
      options.sortOrder,
      options.page,
      options.limit
    );
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
    amount: number;
    userKey: string;
    all?: boolean;
    payerKey?: string;
  }) {
    return getTransactionForWithdraw(
      this.apiClient,
      this.apiKey,
      options.fundId,
      options.amount,
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
    amount: number;
    userKey: string;
    all?: boolean;
    payerKey?: string;
  }) {
    return getInstructionForWithdraw(
      this.apiClient,
      this.apiKey,
      options.fundId,
      options.amount,
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