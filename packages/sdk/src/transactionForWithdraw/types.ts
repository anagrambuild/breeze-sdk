export default interface TransactionForWithdraw {
  success: boolean;
  result: string;
}

export type BodyForTxWithdraw = {
  params: InputForWithdraw;
};

type InputForWithdraw = {
  fund_id?: string;
  shares?: number;
  all?: boolean;
  payer_key?: string;
  user_key?: string;
};
