// Main SDK class
export { BreezeSDK, type BreezeSDKConfig } from './breeze-sdk';

// Low-level API client and error handling
export { ApiClient, BreezeApiError, type RequestOptions } from './builder';

// Individual function exports for advanced usage
export { getUserYield } from './getUserYield';
export { getUserBalances } from './getUserBalances';
export { getTransactionForDeposit } from './transactionForDeposit';
export { getTransactionForWithdraw } from './transactionForWithdraw';
export { getInstructionsForDeposit } from './instructionsForDeposit';
export { getInstructionForWithdraw } from './instructionsForWithdraw';

// Type exports
export type { default as UserYield } from './getUserYield/types';
export type { default as UserBalances } from './getUserBalances/types';
export type { default as TransactionForDeposit, BodyForTxDeposit } from './transactionForDeposit/types';
export type { default as TransactionForWithdraw, BodyForTxWithdraw } from './transactionForWithdraw/types';
export type { default as InstructionsForDeposit, BodyForDepositInstructions } from './instructionsForDeposit/types';
export type { default as InstructionsForWithdraw, BodyForWithdrawInstructions } from './instructionsForWithdraw/types';

