export default interface InstructionsForDeposit {
  success: boolean;
  result: string;
}

export type BodyForDepositInstructions = {
  params: InputForDeposit;
};

type InputForDeposit = {
  fund_id?: string;
  amount?: number;
  all?: boolean;
  payer_key?: string;
  user_key?: string;
};