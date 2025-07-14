export default interface InstructionsForDeposit {
  success: boolean;
  result: {
    deposit_instruction: DepositInstruction[];
  };
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

type DepositInstruction = {
  program_id: number[];
  accounts: AccountMeta[];
  data: number[];
};

type AccountMeta = {
  pubkey: number[];
  is_signer: boolean;
  is_writable: boolean;
};