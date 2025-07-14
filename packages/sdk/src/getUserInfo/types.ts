export default interface UserInfo {
  success?: boolean;
  sucess?: boolean; // Server typo
  result: User[];
}

type User = {
    fund_user: string,
    fund_id: string,
    shares: number,
    updated_at_timestamp: number,
    updated_at_slot: number,
}