export type TransactionForDeposit =
    | string // when the response is just the serialized transaction
    | { message: string }; // when there's an error

export type BodyForTxDeposit = {
  params: InputForDeposit;
};

type InputForDeposit = {
  /** @deprecated Use `strategy_id` + `base_asset`. See https://api.breeze.baby/openapi/sdk.json */
  fund_id?: string;
  amount?: number;
  all?: boolean;
  payer_key?: string;
  user_key?: string;
  base_asset?: string;
  strategy_id?: string;
  user_token_account?: string;
};
