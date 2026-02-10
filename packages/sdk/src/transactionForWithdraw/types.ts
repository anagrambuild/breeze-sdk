export type TransactionForWithdraw =
    | string // when the response is just the serialized transaction
    | { message: string }; // when there's an error

export type BodyForTxWithdraw = {
  params: InputForWithdraw;
};

type InputForWithdraw = {
  fund_id?: string;
  amount?: number;
  all?: boolean;
  payer_key?: string;
  user_key?: string;
  base_asset?: string;
  strategy_id?: string;
  user_token_account?: string;
  create_wsol_ata?: boolean;
  unwrap_wsol_ata?: boolean;
  detect_wsol_ata?: boolean;
  exclude_fees?: boolean;
};
