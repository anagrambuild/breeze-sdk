export default interface CreateUserFundResponse {
  success: boolean;
  result: string;
}

export type CreateUserFundBody = {
  params: CreateUserFundParams;
};

type CreateUserFundParams = {
  fund_id: string;
  user_key: string;
};