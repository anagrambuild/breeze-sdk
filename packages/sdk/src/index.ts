// Main SDK class
export { BreezeSDK, type BreezeSDKConfig } from './breeze-sdk';

// Low-level API client and error handling
export { ApiClient, BreezeApiError, type RequestOptions } from './builder';

// Individual function exports for advanced usage
export { getFund } from './getFund';
export { getUserFund } from './getUserFund';
export { getUserInfo } from './getUserInfo';
export { getUserStats } from './getUserStats';
export { getUserValue } from './getUserValue';
export { getTransactionForDeposit } from './transactionForDeposit';
export { getTransactionForWithdraw } from './transactionForWithdraw';
export { getInstructionsForDeposit } from './instructionsForDeposit';
export { getInstructionsForWithdraw } from './instructionsForWithdraw';
export { createUserFund } from './createUserFund';

// Type exports
export type { default as FundData } from './getFund/types';
export type { default as UserInfo } from './getUserInfo/types';
export type { default as TransactionForDeposit, BodyForTxDeposit } from './transactionForDeposit/types';
export type { default as TransactionForWithdraw, BodyForTxWithdraw } from './transactionForWithdraw/types';
export type { default as InstructionsForDeposit, BodyForDepositInstructions } from './instructionsForDeposit/types';
export type { default as InstructionsForWithdraw, BodyForWithdrawInstructions } from './instructionsForWithdraw/types';
export type { default as CreateUserFundResponse, CreateUserFundBody } from './createUserFund/types';

