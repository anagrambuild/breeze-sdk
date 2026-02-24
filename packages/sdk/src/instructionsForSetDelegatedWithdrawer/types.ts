export default interface InstructionForSetDelegatedWithdrawer {
  [key: string]: unknown;
}

export type BodyForSetDelegatedWithdrawerInstructions = {
  fund_id?: string;
  fund_index?: number;
  fund_authority: string;
  delegated_withdrawer?: string | null;
};
