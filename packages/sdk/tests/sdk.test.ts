// import { BreezeSDK } from '../src';

// describe('Breeze SDK Integration Tests', () => {
//   const sdk = new BreezeSDK({
//     baseUrl: 'http://localhost:8080/',
//     apiKey: 'userkey_0000'
//   });
  
//   // Note: These are integration tests that will make real API calls
//   // Comment out or skip these tests if the API server is not running
  
//   describe.skip('Real API Integration', () => {
//     test('should create deposit transaction', async () => {
//       const result = await sdk.createDepositTransaction(
//         "fund_12855430823",
//         20,
//         "HeZe5JDSvLdfkVxTSuhRZsryhGk1u3nsAb9eA554uXVT",
//         false
//       );
      
//       expect(result.success).toBe(true);
//       expect(result.result).toEqual(expect.any(String));
//     });

//     test('should get fund data', async () => {
//       const result = await sdk.getFund("fund_12855430823");
      
//       expect(result.success).toBe(true);
//       expect(result.result.fund_id).toBe("fund_12855430823");
//     });

//     test('should get user info', async () => {
//       const result = await sdk.getUserInfo("user_2316565914");
      
//       expect(result.success).toBe(true);
//       expect(result.result.user).toBe("user_2316565914");
//     });
//   });
// });