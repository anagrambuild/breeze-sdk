export default interface InstructionsForWithdraw {
  success: boolean;
  result: {
    lut_address: string;
    withdraw_instruction: WithdrawInstruction;
  };
}

export type BodyForWithdrawInstructions = {
  params: InputForWithdraw;
};

type InputForWithdraw = {
  fund_id: string;
  shares: number;
  all?: boolean;
  payer_key?: string;
  user_key: string;
};

type WithdrawInstruction = {
  program_id: number[];
  accounts: AccountMeta[];
  data: number[];
};

type AccountMeta = {
  pubkey: number[];
  is_signer: boolean;
  is_writable: boolean;
};