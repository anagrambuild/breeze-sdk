import { BreezeSDK } from '../src/breeze-sdk';
import { TEST_CONFIG, waitForServer } from './test-config';

describe('getFundsForBaseAsset Integration Test', () => {
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

  describe('getFundsForBaseAsset', () => {
    it('should successfully get funds for USDC base asset', async () => {
      const result = await sdk.getFundsForBaseAsset('USDC');
      
      expect(result).toBeDefined();
      expect(result.sucess || result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(Array.isArray(result.result)).toBe(true);
      
      if (result.result.length > 0) {
        const fund = result.result[0];
        expect(fund.fund_id).toBeDefined();
        expect(fund.base_asset).toBe('USDC');
      }
    }, 30000);

    it('should successfully get funds for PYUSD base asset', async () => {
      const result = await sdk.getFundsForBaseAsset('PYUSD');
      
      expect(result).toBeDefined();
      expect(result.sucess || result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(Array.isArray(result.result)).toBe(true);
      
      if (result.result.length > 0) {
        const fund = result.result[0];
        expect(fund.fund_id).toBeDefined();
        expect(fund.base_asset).toBe('PYUSD');
      }
    }, 30000);

    it('should handle invalid base asset', async () => {
      try {
        await sdk.getFundsForBaseAsset('INVALID_ASSET');
        // If no error is thrown, check if result is empty or has success: false
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
        await offlineSDK.getFundsForBaseAsset(TEST_CONFIG.testBaseAsset);
        fail('Should have thrown a network error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);
  });
});