export default interface InstructionsForWithdraw {
  success: boolean;
  result: string;
}

export type BodyForWithdrawInstructions = {
  params: InputForWithdraw;
};

type InputForWithdraw = {
  fund_id?: string;
  shares?: number;
  all?: boolean;
  payer_key?: string;
  user_key?: string;
};