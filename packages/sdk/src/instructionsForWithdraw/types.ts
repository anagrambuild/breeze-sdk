export default interface InstructionsForWithdraw {
    lut_address: string;
    withdraw_instruction: object;
}

export type BodyForWithdrawInstructions = {
  params: InputForWithdraw;
};

type InputForWithdraw = {
  fund_id: string;
  amount: number;
  all?: boolean;
  payer_key?: string;
  user_key: string;
};

