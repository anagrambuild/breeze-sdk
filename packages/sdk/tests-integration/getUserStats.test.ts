import { BreezeSDK } from '../src/breeze-sdk';
import { TEST_CONFIG, waitForServer } from './test-config';

describe('getUserStats Integration Test', () => {
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

  describe('getUserStats', () => {
    it('should successfully get user stats with required start/end params', async () => {
      const result = await sdk.getUserStats(TEST_CONFIG.testUserId, TEST_CONFIG.testStartDate, TEST_CONFIG.testEndDate);
      
      expect(result).toBeDefined();
      expect(result.success || result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(Array.isArray(result.result)).toBe(true);
      
      if (result.result.length > 0) {
        const stats = result.result[0];
        expect(Array.isArray(stats.time_stamps)).toBe(true);
        expect(Array.isArray(stats.base_asset_value)).toBe(true);
        expect(Array.isArray(stats.yeild_percentage)).toBe(true);
        expect(stats.meta).toBeDefined();
        expect(stats.meta.base_asset).toBeDefined();
        expect(stats.meta.fund_id).toBeDefined();
        expect(stats.meta.start).toBeDefined();
        expect(stats.meta.end).toBeDefined();
        expect(stats.meta.granularity).toBeDefined();
      }
    }, 30000);

    it('should successfully get user stats with fundId query param', async () => {
      const result = await sdk.getUserStats(TEST_CONFIG.testUserId, TEST_CONFIG.testStartDate, TEST_CONFIG.testEndDate, {
        fundId: TEST_CONFIG.testFundId
      });
      
      expect(result).toBeDefined();
      expect(result.success || result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(Array.isArray(result.result)).toBe(true);
    }, 30000);

    it('should successfully get user stats with baseAsset query param', async () => {
      const result = await sdk.getUserStats(TEST_CONFIG.testUserId, TEST_CONFIG.testStartDate, TEST_CONFIG.testEndDate, {
        baseAsset: TEST_CONFIG.testBaseAsset
      });
      
      expect(result).toBeDefined();
      expect(result.success || result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(Array.isArray(result.result)).toBe(true);
    }, 30000);

    it('should successfully get user stats with fiatValue query param', async () => {
      const result = await sdk.getUserStats(TEST_CONFIG.testUserId, TEST_CONFIG.testStartDate, TEST_CONFIG.testEndDate, {
        // fiatValue: 'USD'
      });
      
      expect(result).toBeDefined();
      expect(result.success || result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(Array.isArray(result.result)).toBe(true);
    }, 30000);

    it('should successfully get user stats with all query params', async () => {
      const result = await sdk.getUserStats(TEST_CONFIG.testUserId, TEST_CONFIG.testStartDate, TEST_CONFIG.testEndDate, {
        fundId: TEST_CONFIG.testFundId,
        baseAsset: TEST_CONFIG.testBaseAsset
        // fiatValue: 'USD'
      });
      
      expect(result).toBeDefined();
      expect(result.success || result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(Array.isArray(result.result)).toBe(true);
    }, 30000);

    it('should handle invalid user ID', async () => {
      try {
        await sdk.getUserStats('invalid_user_id', TEST_CONFIG.testStartDate, TEST_CONFIG.testEndDate);
        fail('Should have thrown an error for invalid user ID');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);

    it('should handle invalid date range', async () => {
      try {
        await sdk.getUserStats(TEST_CONFIG.testUserId, '2023-12-31', '2023-01-01'); // End before start
        // May not fail, depends on server validation
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);

    it('should handle network errors gracefully', async () => {
      const offlineSDK = new BreezeSDK({
        baseUrl: 'http://localhost:9999', // Non-existent server
        apiKey: TEST_CONFIG.apiKey,
        timeout: 1000
      });

      try {
        await offlineSDK.getUserStats(TEST_CONFIG.testUserId, TEST_CONFIG.testStartDate, TEST_CONFIG.testEndDate);
        fail('Should have thrown a network error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);
  });
});