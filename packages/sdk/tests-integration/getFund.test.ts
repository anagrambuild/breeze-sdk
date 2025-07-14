import { BreezeSDK } from '../src/breeze-sdk';
import { TEST_CONFIG, waitForServer } from './test-config';

describe('getFund Integration Test', () => {
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

  describe('getFund', () => {
    it('should successfully get fund information', async () => {
      const result = await sdk.getFund(TEST_CONFIG.testFundId);
      
      expect(result).toBeDefined();
      expect(result.sucess || result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(result.result.fund_id).toBeDefined();
      expect(result.result.base_asset).toBeDefined();
      expect(result.result.total_shares).toBeDefined();
      expect(result.result.share_price).toBeDefined();
      expect(result.result.current_value).toBeDefined();
    });

    it('should handle invalid fund ID', async () => {
      try {
        await sdk.getFund('invalid_fund_id');
        fail('Should have thrown an error for invalid fund ID');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle network errors gracefully', async () => {
      const offlineSDK = new BreezeSDK({
        baseUrl: 'http://localhost:9999', // Non-existent server
        apiKey: TEST_CONFIG.apiKey,
        timeout: 1000
      });

      try {
        await offlineSDK.getFund(TEST_CONFIG.testFundId);
        fail('Should have thrown a network error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});