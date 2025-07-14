import { BreezeSDK } from '../src/breeze-sdk';
import { TEST_CONFIG, waitForServer } from './test-config';

describe('getUserInfo Integration Test', () => {
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

  describe('getUserInfo', () => {
    it('should successfully get user information', async () => {
      const result = await sdk.getUserInfo(TEST_CONFIG.testUserId);
      
      expect(result).toBeDefined();
      expect(result.success || result.sucess).toBe(true);
      expect(result.result).toBeDefined();
      expect(Array.isArray(result.result)).toBe(true);
      expect(result.result.length).toBeGreaterThan(0);
      
      const user = result.result[0];
      expect(user.fund_user).toBeDefined();
      expect(user.fund_id).toBeDefined();
      expect(user.shares).toBeDefined();
      expect(typeof user.shares).toBe('number');
      expect(user.updated_at_timestamp).toBeDefined();
      expect(user.updated_at_slot).toBeDefined();
    }, 30000);

    it('should handle invalid user ID', async () => {
      try {
        await sdk.getUserInfo('invalid_user_id');
        fail('Should have thrown an error for invalid user ID');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);

    it('should handle empty user ID', async () => {
      try {
        await sdk.getUserInfo('');
        fail('Should have thrown an error for empty user ID');
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
        await offlineSDK.getUserInfo(TEST_CONFIG.testUserId);
        fail('Should have thrown a network error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);
  });
});