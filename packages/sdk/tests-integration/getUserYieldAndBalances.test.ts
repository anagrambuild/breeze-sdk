import { BreezeSDK } from '../src/breeze-sdk';
import { TEST_CONFIG, waitForServer } from './test-config';

describe('User Yield and Balances Integration Tests', () => {
  let sdk: BreezeSDK;

  beforeAll(async () => {
    // Wait for server to be ready
    await waitForServer(TEST_CONFIG.baseUrl);
    
    sdk = new BreezeSDK({
      baseUrl: TEST_CONFIG.baseUrl,
      apiKey: TEST_CONFIG.apiKey,
      timeout: TEST_CONFIG.timeout
    });
  }, 30000);

  describe('getUserYield', () => {
    it('should successfully get user yield data', async () => {
      const result = await sdk.getUserYield({
        userId: TEST_CONFIG.testUserId
      });
      
      console.log('\n=== getUserYield API Response ===');
      console.log(JSON.stringify(result, null, 2));
      console.log('==================================\n');
      
      expect(result).toBeDefined();
      expect(result.pagination).toBeDefined();
      expect(result.pagination.limit).toBeDefined();
      expect(result.pagination.page).toBeDefined();
      expect(result.total_yield_earned).toBeDefined();
      expect(Array.isArray(result.yields)).toBe(true);
    }, 30000);

    it('should successfully get user yield data with fund filter', async () => {
      const result = await sdk.getUserYield({
        userId: TEST_CONFIG.testUserId,
        fundId: TEST_CONFIG.testFundId
      });
      
      expect(result).toBeDefined();
      expect(result.pagination).toBeDefined();
      expect(result.total_yield_earned).toBeDefined();
      expect(Array.isArray(result.yields)).toBe(true);
    }, 30000);

    it('should successfully get user yield data with pagination', async () => {
      const result = await sdk.getUserYield({
        userId: TEST_CONFIG.testUserId,
        page: 1,
        limit: 5
      });
      
      expect(result).toBeDefined();
      expect(result.pagination).toBeDefined();
      expect(result.pagination.limit).toBe(5);
      expect(result.pagination.page).toBe(1);
      expect(result.total_yield_earned).toBeDefined();
      expect(Array.isArray(result.yields)).toBe(true);
    }, 30000);

    it('should handle invalid user ID', async () => {
      try {
        await sdk.getUserYield({
          userId: 'invalid_user_id'
        });
        fail('Should have thrown an error for invalid user ID');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);

    it('should handle network errors gracefully', async () => {
      const offlineSDK = new BreezeSDK({
        baseUrl: 'http://localhost:9999',
        apiKey: TEST_CONFIG.apiKey,
        timeout: 1000
      });

      try {
        await offlineSDK.getUserYield({
          userId: TEST_CONFIG.testUserId
        });
        fail('Should have thrown a network error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);
  });

  describe('getUserBalances', () => {
    it('should successfully get user balances', async () => {
      const result = await sdk.getUserBalances({
        userId: TEST_CONFIG.testUserId
      });
      
      console.log('\n=== getUserBalances API Response ===');
      console.log(JSON.stringify(result, null, 2));
      console.log('=====================================\n');
      
      expect(result).toBeDefined();
      expect(Array.isArray(result.balances)).toBe(true);
      expect(result.total_portfolio_value).toBeDefined();
      expect(result.total_yield_earned).toBeDefined();
    }, 30000);

    it('should successfully get user balances with asset filter', async () => {
      const result = await sdk.getUserBalances({
        userId: TEST_CONFIG.testUserId,
        asset: 'USDC'
      });
      
      console.log('\n=== getUserBalances with USDC filter API Response ===');
      console.log(JSON.stringify(result, null, 2));
      console.log('=====================================================\n');
      
      expect(result).toBeDefined();
      expect(Array.isArray(result.balances)).toBe(true);
      expect(result.total_portfolio_value).toBeDefined();
      expect(result.total_yield_earned).toBeDefined();
    }, 30000);

    it('should successfully get user balances with sorting', async () => {
      const result = await sdk.getUserBalances({
        userId: TEST_CONFIG.testUserId,
        sortBy: 'balance',
        sortOrder: 'desc'
      });
      
      expect(result).toBeDefined();
      expect(Array.isArray(result.balances)).toBe(true);
      expect(result.total_portfolio_value).toBeDefined();
      expect(result.total_yield_earned).toBeDefined();
    }, 30000);

    it('should successfully get user balances with all options', async () => {
      const result = await sdk.getUserBalances({
        userId: TEST_CONFIG.testUserId,
        asset: 'USDC',
        sortBy: 'balance',
        sortOrder: 'asc'
      });
      
      expect(result).toBeDefined();
      expect(Array.isArray(result.balances)).toBe(true);
      expect(result.total_portfolio_value).toBeDefined();
      expect(result.total_yield_earned).toBeDefined();
    }, 30000);

    it('should handle invalid user ID', async () => {
      try {
        await sdk.getUserBalances({
          userId: 'invalid_user_id'
        });
        fail('Should have thrown an error for invalid user ID');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);

    it('should handle network errors gracefully', async () => {
      const offlineSDK = new BreezeSDK({
        baseUrl: 'http://localhost:9999',
        apiKey: TEST_CONFIG.apiKey,
        timeout: 1000
      });

      try {
        await offlineSDK.getUserBalances({
          userId: TEST_CONFIG.testUserId
        });
        fail('Should have thrown a network error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);
  });
});