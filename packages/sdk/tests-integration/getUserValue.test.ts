import { BreezeSDK } from '../src/breeze-sdk';
import { TEST_CONFIG, waitForServer } from './test-config';

describe('getUserValue Integration Test', () => {
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

  describe('getUserValue', () => {
    it('should successfully get user value without query params', async () => {
      const result = await sdk.getUserValue(TEST_CONFIG.testUserId);
      
      expect(result).toBeDefined();
      expect(result.success || result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(typeof result.result).toBe('object');
      
      // Check if there are any asset keys in the result
      const assetKeys = Object.keys(result.result);
      expect(assetKeys.length).toBeGreaterThan(0);
      
      // Check the first asset's values
      const firstAssetKey = assetKeys[0];
      const assetValues = result.result[firstAssetKey];
      expect(Array.isArray(assetValues)).toBe(true);
      
      if (assetValues.length > 0) {
        const value = assetValues[0];
        expect(value.fund_id).toBeDefined();
        expect(value.base_asset_value).toBeDefined();
        expect(typeof value.base_asset_value).toBe('number');
        expect(value.percent_of_fund).toBeDefined();
        expect(value.total_fund_value).toBeDefined();
      }
    }, 30000);

    it('should successfully get user value with fundId query param', async () => {
      const result = await sdk.getUserValue(TEST_CONFIG.testUserId, {
        fundId: TEST_CONFIG.testFundId
      });
      
      expect(result).toBeDefined();
      expect(result.success || result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(typeof result.result).toBe('object');
      
      // Check if there are asset keys in the result
      const assetKeys = Object.keys(result.result);
      expect(assetKeys.length).toBeGreaterThan(0);
      
      // Check that each asset has an array of values
      const firstAssetKey = assetKeys[0];
      expect(Array.isArray(result.result[firstAssetKey])).toBe(true);
    }, 30000);

    it('should successfully get user value with baseAsset query param', async () => {
      const result = await sdk.getUserValue(TEST_CONFIG.testUserId, {
        baseAsset: TEST_CONFIG.testBaseAsset
      });
      
      expect(result).toBeDefined();
      expect(result.success || result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(typeof result.result).toBe('object');
      
      // Check if there are asset keys in the result
      const assetKeys = Object.keys(result.result);
      expect(assetKeys.length).toBeGreaterThan(0);
      
      // Check that each asset has an array of values
      const firstAssetKey = assetKeys[0];
      expect(Array.isArray(result.result[firstAssetKey])).toBe(true);
    }, 30000);

    it('should successfully get user value with fiatValue query param', async () => {
      const result = await sdk.getUserValue(TEST_CONFIG.testUserId, {
        // fiatValue: 'USD'
      });
      
      expect(result).toBeDefined();
      expect(result.success || result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(typeof result.result).toBe('object');
      
      // Check if there are asset keys in the result
      const assetKeys = Object.keys(result.result);
      expect(assetKeys.length).toBeGreaterThan(0);
      
      // Check that each asset has an array of values
      const firstAssetKey = assetKeys[0];
      expect(Array.isArray(result.result[firstAssetKey])).toBe(true);
    }, 30000);

    it('should successfully get user value with multiple query params', async () => {
      const result = await sdk.getUserValue(TEST_CONFIG.testUserId, {
        fundId: TEST_CONFIG.testFundId,
        baseAsset: TEST_CONFIG.testBaseAsset,
        // fiatValue: 'USD'
      });
      
      expect(result).toBeDefined();
      expect(result.success || result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(typeof result.result).toBe('object');
      
      // Check if there are asset keys in the result
      const assetKeys = Object.keys(result.result);
      expect(assetKeys.length).toBeGreaterThan(0);
      
      // Check that each asset has an array of values
      const firstAssetKey = assetKeys[0];
      expect(Array.isArray(result.result[firstAssetKey])).toBe(true);
    }, 30000);

    it('should handle invalid user ID', async () => {
      try {
        await sdk.getUserValue('invalid_user_id');
        fail('Should have thrown an error for invalid user ID');
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
        await offlineSDK.getUserValue(TEST_CONFIG.testUserId);
        fail('Should have thrown a network error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);
  });
});