// // Mock server responses for testing
// export const mockResponses = {
//   getFund: {
//     success: true,
//     result: {
//       fund_id: "fund_12855430823",
//       base_asset: "USDC",
//       base_asset_decimals: 6,
//       user_id: "user_123",
//       total_shares: 1000,
//       share_price: 1.05,
//       current_value: 1050,
//       updated_at_timestamp: Date.now(),
//       updated_at_slot: 12345,
//       risk_max: 0.8,
//       current_risk: 0.6,
//       unallocated_amount: 50,
//       last_recalculate_value_timestamp: Date.now(),
//       last_rebalance_timestamp: Date.now(),
//       last_rebalance_slot: 12340,
//       constraints: [
//         {
//           source_type: "lending",
//           max_allocation: 0.5,
//           min_allocation: 0.1
//         }
//       ],
//       allocations: [
//         {
//           source_type: "lending",
//           amount: 500,
//           current_value: 525,
//           allocation_score: 0.8
//         }
//       ]
//     }
//   },
  
//   getUserInfo: {
//     success: true,
//     result: {
//       user: "user_2316565914",
//       fund_id: "fund_12855430823",
//       shares: 100,
//       updated_at_timestamp: Date.now(),
//       updated_at_slot: 12345
//     }
//   },
  
//   transactionForDeposit: {
//     success: true,
//     result: "transaction_hash_123456789"
//   },
  
//   transactionForWithdraw: {
//     success: true,
//     result: "transaction_hash_987654321"
//   },
  
//   createUserFund: {
//     success: true,
//     result: "user_fund_transaction_hash_123456"
//   }
// };

// // Mock fetch function
// export const createMockFetch = (response: any, status: number = 200) => {
//   return jest.fn().mockResolvedValue({
//     ok: status >= 200 && status < 300,
//     status,
//     json: jest.fn().mockResolvedValue(response),
//     text: jest.fn().mockResolvedValue(JSON.stringify(response))
//   });
// };