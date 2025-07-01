// import { BreezeSDK } from '../src/breeze-sdk';
// import { mockResponses, createMockFetch } from './mock-server';

// // Mock fetch globally
// global.fetch = jest.fn();

// describe('BreezeSDK', () => {
//   let sdk: BreezeSDK;
//   const config = {
//     baseUrl: 'http://localhost:8080/',
//     apiKey: 'test_api_key_123',
//     timeout: 5000
//   };

//   beforeEach(() => {
//     sdk = new BreezeSDK(config);
//     jest.clearAllMocks();
//   });

//   describe('constructor', () => {
//     test('should initialize with config', () => {
//       expect(sdk).toBeInstanceOf(BreezeSDK);
//       expect(sdk.getApiClient()).toBeDefined();
//     });

//     test('should work with minimal config', () => {
//       const minimalSdk = new BreezeSDK({ apiKey: 'test_key' });
//       expect(minimalSdk).toBeInstanceOf(BreezeSDK);
//     });
//   });

//   describe('fund operations', () => {
//     test('getFund should work', async () => {
//       (global.fetch as jest.Mock).mockImplementation(
//         createMockFetch(mockResponses.getFund)
//       );

//       const result = await sdk.getFund('fund_123');
      
//       expect(result.success).toBe(true);
//       expect(result.result.fund_id).toBe('fund_12855430823');
//     });
//   });

//   describe('user operations', () => {
//     test('getUserInfo should work', async () => {
//       (global.fetch as jest.Mock).mockImplementation(
//         createMockFetch(mockResponses.getUserInfo)
//       );

//       const result = await sdk.getUserInfo('user_123');
      
//       expect(result.success).toBe(true);
//       expect(result.result.user).toBeDefined();
//     });
//   });

//   describe('transaction operations', () => {
//     test('createDepositTransaction should work', async () => {
//       (global.fetch as jest.Mock).mockImplementation(
//         createMockFetch(mockResponses.transactionForDeposit)
//       );

//       const result = await sdk.createDepositTransaction(
//         'fund_123',
//         100,
//         'user_wallet_key'
//       );
      
//       expect(result.success).toBe(true);
//       expect(typeof result.result).toBe('string');
//     });

//     test('createWithdrawTransaction should work', async () => {
//       (global.fetch as jest.Mock).mockImplementation(
//         createMockFetch(mockResponses.transactionForWithdraw)
//       );

//       const result = await sdk.createWithdrawTransaction(
//         'fund_123',
//         50,
//         'user_wallet_key'
//       );
      
//       expect(result.success).toBe(true);
//       expect(typeof result.result).toBe('string');
//     });

//     test('createUserFundTransaction should work', async () => {
//       (global.fetch as jest.Mock).mockImplementation(
//         createMockFetch(mockResponses.createUserFund)
//       );

//       const result = await sdk.createUserFundTransaction(
//         'fund_123',
//         'user_wallet_key'
//       );
      
//       expect(result.success).toBe(true);
//       expect(typeof result.result).toBe('string');
//     });
//   });

//   describe('utility methods', () => {
//     test('updateApiKey should update the key', () => {
//       const newKey = 'new_api_key_456';
//       sdk.updateApiKey(newKey);
      
//       // Since apiKey is private, we can't directly test it,
//       // but we can verify the method doesn't throw
//       expect(() => sdk.updateApiKey(newKey)).not.toThrow();
//     });
//   });
// });