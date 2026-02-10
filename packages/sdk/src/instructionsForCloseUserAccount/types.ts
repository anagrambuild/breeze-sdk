export default interface InstructionsForCloseUserAccount {
    close_user_fund_instructions: object[];
}

export type BodyForCloseUserAccountInstructions = {
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
