// import { BreezeSDK, BreezeApiError } from '../src';

// // Integration tests that make real API calls
// // These tests require your Rust API server to be running on localhost:8080

// describe('Integration Tests - Real API Calls', () => {
//   let sdk: BreezeSDK;
  
//   // Test configuration - update these values based on your actual API
//   const TEST_CONFIG = {
//     baseUrl: 'http://localhost:8080/',
//     apiKey: 'userkey_0000', // Replace with valid API key
//     validFundId: 'fund_12855430823', // Replace with valid fund ID
//     validUserId: 'user_2316565914', // Replace with valid user ID
//     validUserKey: 'HeZe5JDSvLdfkVxTSuhRZsryhGk1u3nsAb9eA554uXVT' // Replace with valid user wallet key
//   };

//   beforeAll(() => {
//     sdk = new BreezeSDK({
//       baseUrl: TEST_CONFIG.baseUrl,
//       apiKey: TEST_CONFIG.apiKey,
//       timeout: 10000 // 10 second timeout for real API calls
//     });
//   });

//   describe('Fund Operations', () => {
//     test('should get fund data', async () => {
//       try {
//         const result = await sdk.getFund(TEST_CONFIG.validFundId);
        
//         console.log('Fund data response:', JSON.stringify(result, null, 2));
        
//         expect(result).toHaveProperty('success');
//         expect(result.success).toBe(true);
//         expect(result).toHaveProperty('result');
//         expect(result.result).toHaveProperty('fund_id');
//         expect(result.result.fund_id).toBe(TEST_CONFIG.validFundId);
//       } catch (error) {
//         if (error instanceof BreezeApiError) {
//           console.error('API Error:', {
//             message: error.message,
//             status: error.status,
//             code: error.code,
//             response: error.response
//           });
//         }
//         throw error;
//       }
//     }, 15000);

//     test('should handle invalid fund ID', async () => {
//       try {
//         await sdk.getFund('invalid_fund_id');
//         fail('Should have thrown an error for invalid fund ID');
//       } catch (error) {
//         expect(error).toBeInstanceOf(BreezeApiError);
//         console.log('Expected error for invalid fund:', error.message);
//       }
//     }, 15000);
//   });

//   describe('User Operations', () => {
//     test('should get user info', async () => {
//       try {
//         const result = await sdk.getUserInfo(TEST_CONFIG.validUserId);
        
//         console.log('User info response:', JSON.stringify(result, null, 2));
        
//         expect(result).toHaveProperty('success');
//         expect(result.success).toBe(true);
//         expect(result).toHaveProperty('result');
//         expect(result.result).toHaveProperty('user');
//       } catch (error) {
//         if (error instanceof BreezeApiError) {
//           console.error('User info API Error:', {
//             message: error.message,
//             status: error.status,
//             code: error.code
//           });
//         }
//         throw error;
//       }
//     }, 15000);

//     test('should get user funds', async () => {
//       try {
//         const result = await sdk.getUserFunds(TEST_CONFIG.validUserId);
        
//         console.log('User funds response:', JSON.stringify(result, null, 2));
        
//         expect(result).toHaveProperty('success');
//         expect(result.success).toBe(true);
//         expect(result).toHaveProperty('result');
//       } catch (error) {
//         if (error instanceof BreezeApiError) {
//           console.error('User funds API Error:', error.message);
//         }
//         throw error;
//       }
//     }, 15000);

//     test('should get user value', async () => {
//       try {
//         const result = await sdk.getUserValue(TEST_CONFIG.validUserId);
        
//         console.log('User value response:', JSON.stringify(result, null, 2));
        
//         expect(result).toHaveProperty('success');
//         expect(result.success).toBe(true);
//         expect(result).toHaveProperty('result');
//       } catch (error) {
//         if (error instanceof BreezeApiError) {
//           console.error('User value API Error:', error.message);
//         }
//         throw error;
//       }
//     }, 15000);

//     test('should get user stats', async () => {
//       try {
//         const startDate = '2025-01-01T00:00:00.000Z';
//         const endDate = '2025-01-31T23:59:59.999Z';
        
//         const result = await sdk.getUserStats(TEST_CONFIG.validUserId, startDate, endDate);
        
//         console.log('User stats response:', JSON.stringify(result, null, 2));
        
//         expect(result).toHaveProperty('success');
//         expect(result.success).toBe(true);
//         expect(result).toHaveProperty('result');
//       } catch (error) {
//         if (error instanceof BreezeApiError) {
//           console.error('User stats API Error:', error.message);
//         }
//         throw error;
//       }
//     }, 15000);
//   });

//   describe('Transaction Operations', () => {
//     test('should create deposit transaction', async () => {
//       try {
//         const result = await sdk.createDepositTransaction(
//           TEST_CONFIG.validFundId,
//           10, // Small amount for testing
//           TEST_CONFIG.validUserKey,
//           false
//         );
        
//         console.log('Deposit transaction response:', JSON.stringify(result, null, 2));
        
//         expect(result).toHaveProperty('success');
//         expect(result.success).toBe(true);
//         expect(result).toHaveProperty('result');
//         expect(typeof result.result).toBe('string');
//         expect(result.result.length).toBeGreaterThan(0);
//       } catch (error) {
//         if (error instanceof BreezeApiError) {
//           console.error('Deposit transaction API Error:', {
//             message: error.message,
//             status: error.status,
//             code: error.code,
//             response: error.response
//           });
//         }
//         throw error;
//       }
//     }, 15000);

//     test('should create withdraw transaction', async () => {
//       try {
//         const result = await sdk.createWithdrawTransaction(
//           TEST_CONFIG.validFundId,
//           5, // Small amount for testing
//           TEST_CONFIG.validUserKey,
//           false
//         );
        
//         console.log('Withdraw transaction response:', JSON.stringify(result, null, 2));
        
//         expect(result).toHaveProperty('success');
//         expect(result.success).toBe(true);
//         expect(result).toHaveProperty('result');
//         expect(typeof result.result).toBe('string');
//         expect(result.result.length).toBeGreaterThan(0);
//       } catch (error) {
//         if (error instanceof BreezeApiError) {
//           console.error('Withdraw transaction API Error:', {
//             message: error.message,
//             status: error.status,
//             code: error.code,
//             response: error.response
//           });
//         }
//         throw error;
//       }
//     }, 15000);

//     test('should create user fund transaction', async () => {
//       try {
//         const result = await sdk.createUserFundTransaction(
//           TEST_CONFIG.validFundId,
//           TEST_CONFIG.validUserKey
//         );
        
//         console.log('User fund transaction response:', JSON.stringify(result, null, 2));
        
//         expect(result).toHaveProperty('success');
//         expect(result.success).toBe(true);
//         expect(result).toHaveProperty('result');
//         expect(typeof result.result).toBe('string');
//         expect(result.result.length).toBeGreaterThan(0);
//       } catch (error) {
//         if (error instanceof BreezeApiError) {
//           console.error('User fund transaction API Error:', {
//             message: error.message,
//             status: error.status,
//             code: error.code,
//             response: error.response
//           });
//         }
//         throw error;
//       }
//     }, 15000);

//     test('should handle invalid transaction parameters', async () => {
//       try {
//         await sdk.createDepositTransaction(
//           'invalid_fund_id',
//           100,
//           'invalid_user_key',
//           false
//         );
//         fail('Should have thrown an error for invalid transaction parameters');
//       } catch (error) {
//         expect(error).toBeInstanceOf(BreezeApiError);
//         console.log('Expected error for invalid transaction:', error.message);
//       }
//     }, 15000);
//   });

//   describe('Error Handling', () => {
//     test('should handle network timeout', async () => {
//       const timeoutSdk = new BreezeSDK({
//         baseUrl: TEST_CONFIG.baseUrl,
//         apiKey: TEST_CONFIG.apiKey,
//         timeout: 1 // Very short timeout to force timeout error
//       });

//       try {
//         await timeoutSdk.getFund(TEST_CONFIG.validFundId);
//         // If the API is very fast, this might not timeout, so we don't fail the test
//       } catch (error) {
//         if (error instanceof BreezeApiError && error.code === 'TIMEOUT') {
//           console.log('Timeout error handled correctly:', error.message);
//           expect(error.code).toBe('TIMEOUT');
//           expect(error.status).toBe(408);
//         }
//       }
//     }, 5000);

//     test('should handle invalid API endpoint', async () => {
//       const invalidSdk = new BreezeSDK({
//         baseUrl: 'http://localhost:9999/', // Invalid port
//         apiKey: TEST_CONFIG.apiKey,
//         timeout: 5000
//       });

//       try {
//         await invalidSdk.getFund(TEST_CONFIG.validFundId);
//         fail('Should have thrown an error for invalid endpoint');
//       } catch (error) {
//         expect(error).toBeInstanceOf(BreezeApiError);
//         expect(error.code).toBe('NETWORK_ERROR');
//         console.log('Network error handled correctly:', error.message);
//       }
//     }, 10000);
//   });

//   describe('API Client Configuration', () => {
//     test('should allow updating API key', async () => {
//       const newApiKey = 'new_test_key';
//       sdk.updateApiKey(newApiKey);
      
//       // Try to make a request with the new API key
//       // This will likely fail with auth error, but that's expected
//       try {
//         await sdk.getFund(TEST_CONFIG.validFundId);
//       } catch (error) {
//         if (error instanceof BreezeApiError) {
//           console.log('API key update test - expected auth error:', error.message);
//         }
//       }
      
//       // Restore original API key
//       sdk.updateApiKey(TEST_CONFIG.apiKey);
//     });

//     test('should expose underlying API client', () => {
//       const apiClient = sdk.getApiClient();
//       expect(apiClient).toBeDefined();
//       expect(typeof apiClient.request).toBe('function');
//     });
//   });
// });