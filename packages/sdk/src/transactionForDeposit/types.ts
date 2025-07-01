export default interface TransactionForDeposit {
  success: boolean;
  result: string;
}

export type BodyForTxDeposit = {
  params: InputForDeposit;
};

type InputForDeposit = {
  fund_id?: string;
  amount?: number;
  all?: boolean;
  payer_key?: string;
  user_key?: string;
};
