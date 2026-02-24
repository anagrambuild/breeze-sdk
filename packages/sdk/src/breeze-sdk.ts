import { ApiClient } from './builder';
import { getUserYield } from './getUserYield';
import { getUserBalances } from './getUserBalances';
import { getBreezeBalances } from './getBreezeBalances';
import { getStrategyInfo } from './getStrategyInfo';
import { getTransactionForDeposit } from './transactionForDeposit';
import { getTransactionForWithdraw } from './transactionForWithdraw';
import { getInstructionsForDeposit } from './instructionsForDeposit';
import { getInstructionForWithdraw } from './instructionsForWithdraw';
import { getTransactionForCloseUserAccount } from './transactionForCloseUserAccount';
import { getInstructionsForCloseUserAccount } from './instructionsForCloseUserAccount';
import { getInstructionForSetDelegatedWithdrawer } from './instructionsForSetDelegatedWithdrawer';
import { getFund } from './getFund';
import { getOrganizationFunds } from './getOrganizationFunds';
import { getHealth } from './health';

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

  async getBreezeBalances(options: {
    userId: string;
    asset?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
    strategyId: string;
  }) {
    return getBreezeBalances(
      this.apiClient,
      this.apiKey,
      options.userId,
      options.asset,
      options.sortBy,
      options.sortOrder,
      options.page,
      options.limit,
      options.strategyId
    );
  }

  async getStrategyInfo(strategyId: string) {
    return getStrategyInfo(this.apiClient, this.apiKey, strategyId);
  }

  // Fund operations (bearer token auth)
  async getFund(options: {
    fundId: string;
    bearerToken: string;
  }) {
    return getFund(this.apiClient, options.bearerToken, options.fundId);
  }

  async getOrganizationFunds(options: {
    bearerToken: string;
  }) {
    return getOrganizationFunds(this.apiClient, options.bearerToken);
  }

  async getSetDelegatedWithdrawerInstruction(options: {
    bearerToken: string;
    fundAuthority: string;
    delegatedWithdrawer?: string | null;
    fundId?: string;
    fundIndex?: number;
  }) {
    return getInstructionForSetDelegatedWithdrawer(
      this.apiClient,
      options.bearerToken,
      options.fundAuthority,
      options.delegatedWithdrawer,
      options.fundId,
      options.fundIndex
    );
  }

  // Transaction operations
  async createDepositTransaction(options: {
    fundId?: string;
    amount?: number;
    userKey?: string;
    all?: boolean;
    payerKey?: string;
    baseAsset?: string;
    strategyId?: string;
    userTokenAccount?: string;
  }) {
    return getTransactionForDeposit(
      this.apiClient,
      this.apiKey,
      options.fundId,
      options.amount,
      options.userKey,
      options.all,
      options.payerKey,
      options.baseAsset,
      options.strategyId,
      options.userTokenAccount
    );
  }

  async createWithdrawTransaction(options: {
    amount?: number;
    userKey?: string;
    all?: boolean;
    payerKey?: string;
    baseAsset?: string;
    strategyId?: string;
    userTokenAccount?: string;
    createWsolAta?: boolean;
    unwrapWsolAta?: boolean;
    detectWsolAta?: boolean;
    excludeFees?: boolean;
  }) {
    return getTransactionForWithdraw(
      this.apiClient,
      this.apiKey,
      options.amount,
      options.userKey,
      options.all,
      options.payerKey,
      options.baseAsset,
      options.strategyId,
      options.userTokenAccount,
      options.createWsolAta,
      options.unwrapWsolAta,
      options.detectWsolAta,
      options.excludeFees
    );
  }

  // Authority/delegated withdraw-out convenience method.
  async createWithdrawOutTransaction(options: {
    strategyId: string;
    baseAsset: string;
    targetUserKey: string;
    authorityKey: string;
    amount?: number;
    all?: boolean;
    userTokenAccount?: string;
    createWsolAta?: boolean;
    unwrapWsolAta?: boolean;
    detectWsolAta?: boolean;
    excludeFees?: boolean;
  }) {
    return getTransactionForWithdraw(
      this.apiClient,
      this.apiKey,
      options.amount,
      options.targetUserKey,
      options.all,
      options.authorityKey,
      options.baseAsset,
      options.strategyId,
      options.userTokenAccount,
      options.createWsolAta,
      options.unwrapWsolAta,
      options.detectWsolAta,
      options.excludeFees
    );
  }

  async getDepositInstructions(options: {
    fundId?: string;
    amount?: number;
    userKey?: string;
    all?: boolean;
    payerKey?: string;
    baseAsset?: string;
    strategyId?: string;
    userTokenAccount?: string;
  }) {
    return getInstructionsForDeposit(
      this.apiClient,
      this.apiKey,
      options.fundId,
      options.amount,
      options.userKey,
      options.all,
      options.payerKey,
      options.baseAsset,
      options.strategyId,
      options.userTokenAccount
    );
  }

  async getWithdrawInstruction(options: {
    amount?: number;
    userKey?: string;
    all?: boolean;
    payerKey?: string;
    baseAsset?: string;
    strategyId?: string;
    userTokenAccount?: string;
    createWsolAta?: boolean;
    unwrapWsolAta?: boolean;
    detectWsolAta?: boolean;
    excludeFees?: boolean;
  }) {
    return getInstructionForWithdraw(
      this.apiClient,
      this.apiKey,
      options.amount,
      options.userKey,
      options.all,
      options.payerKey,
      options.baseAsset,
      options.strategyId,
      options.userTokenAccount,
      options.createWsolAta,
      options.unwrapWsolAta,
      options.detectWsolAta,
      options.excludeFees
    );
  }

  // Authority/delegated withdraw-out convenience method.
  async getWithdrawOutInstruction(options: {
    strategyId: string;
    baseAsset: string;
    targetUserKey: string;
    authorityKey: string;
    amount?: number;
    all?: boolean;
    userTokenAccount?: string;
    createWsolAta?: boolean;
    unwrapWsolAta?: boolean;
    detectWsolAta?: boolean;
    excludeFees?: boolean;
  }) {
    return getInstructionForWithdraw(
      this.apiClient,
      this.apiKey,
      options.amount,
      options.targetUserKey,
      options.all,
      options.authorityKey,
      options.baseAsset,
      options.strategyId,
      options.userTokenAccount,
      options.createWsolAta,
      options.unwrapWsolAta,
      options.detectWsolAta,
      options.excludeFees
    );
  }

  // Close user account operations
  async createCloseUserAccountTransaction(options: {
    userAccount?: string;
    userPubkey?: string;
    strategyId?: string;
    mint?: string;
    payer?: string;
    fundsRecipient?: string;
    userTokenAccount?: string;
  }) {
    return getTransactionForCloseUserAccount(
      this.apiClient,
      this.apiKey,
      options.userAccount,
      options.userPubkey,
      options.strategyId,
      options.mint,
      options.payer,
      options.fundsRecipient,
      options.userTokenAccount
    );
  }

  async getCloseUserAccountInstructions(options: {
    userAccount?: string;
    userPubkey?: string;
    strategyId?: string;
    mint?: string;
    payer?: string;
    fundsRecipient?: string;
    userTokenAccount?: string;
  }) {
    return getInstructionsForCloseUserAccount(
      this.apiClient,
      this.apiKey,
      options.userAccount,
      options.userPubkey,
      options.strategyId,
      options.mint,
      options.payer,
      options.fundsRecipient,
      options.userTokenAccount
    );
  }

  // Health check
  async getHealth() {
    return getHealth(this.apiClient, this.apiKey);
  }

  // Utility methods
  updateApiKey(newApiKey: string) {
    this.apiKey = newApiKey;
  }

  getApiClient() {
    return this.apiClient;
  }
}
