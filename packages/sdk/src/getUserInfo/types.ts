export default interface UserInfo {
  success: boolean;
  result: User;
}

type User = {
    user: string,
    fund_id: string,
    shares: number,
    updated_at_timestamp: number,
    updated_at_slot: number,
}