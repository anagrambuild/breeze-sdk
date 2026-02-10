// Main SDK class
export { BreezeSDK, type BreezeSDKConfig } from './breeze-sdk';

// Low-level API client and error handling
export { ApiClient, BreezeApiError, type RequestOptions } from './builder';

// Individual function exports for advanced usage
export { getUserYield } from './getUserYield';
export { getUserBalances } from './getUserBalances';
export { getBreezeBalances } from './getBreezeBalances';
export { getStrategyInfo } from './getStrategyInfo';
export { getTransactionForDeposit } from './transactionForDeposit';
export { getTransactionForWithdraw } from './transactionForWithdraw';
export { getInstructionsForDeposit } from './instructionsForDeposit';
export { getInstructionForWithdraw } from './instructionsForWithdraw';
export { getTransactionForCloseUserAccount } from './transactionForCloseUserAccount';
export { getInstructionsForCloseUserAccount } from './instructionsForCloseUserAccount';
export { getHealth } from './health';

// Type exports
export type { default as UserYield } from './getUserYield/types';
export type { default as UserBalances } from './getUserBalances/types';
export type { default as BreezeBalancesResponse, BreezeBalance } from './getBreezeBalances/types';
export type { default as StrategyInfo } from './getStrategyInfo/types';
export type { TransactionForDeposit, BodyForTxDeposit } from './transactionForDeposit/types';
export type { TransactionForWithdraw, BodyForTxWithdraw } from './transactionForWithdraw/types';
export type { default as InstructionsForDeposit, BodyForDepositInstructions } from './instructionsForDeposit/types';
export type { default as InstructionsForWithdraw, BodyForWithdrawInstructions } from './instructionsForWithdraw/types';
export type { TransactionForCloseUserAccount, BodyForTxCloseUserAccount } from './transactionForCloseUserAccount/types';
export type { default as InstructionsForCloseUserAccount, BodyForCloseUserAccountInstructions } from './instructionsForCloseUserAccount/types';
export type { HealthResponse } from './health/types';

