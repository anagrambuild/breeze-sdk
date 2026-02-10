export type TransactionForCloseUserAccount =
    | string // when the response is just the serialized transaction
    | { message: string }; // when there's an error

export type BodyForTxCloseUserAccount = {
  params: InputForCloseUserAccount;
};

type InputForCloseUserAccount = {
  user_account?: string;
  user_pubkey?: string;
  strategy_id?: string;
  mint?: string;
  payer?: string;
  funds_recipient?: string;
  user_token_account?: string;
};
