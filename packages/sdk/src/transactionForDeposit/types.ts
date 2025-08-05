export type TransactionForDeposit =
    | string // when the response is just the serialized transaction
    | { message: string }; // when there's an error

export type BodyForTxDeposit = {
  params: InputForDeposit;
};

type InputForDeposit = {
  fund_id: string;
  amount: number;
  all?: boolean;
  payer_key?: string;
  user_key: string;
};
