export default interface InstructionsForDeposit {
    deposit_instruction: object[];
}

export type BodyForDepositInstructions = {
  params: InputForDeposit;
};

type InputForDeposit = {
  fund_id: string;
  amount: number;
  all?: boolean;
  payer_key?: string;
  user_key: string;
};

