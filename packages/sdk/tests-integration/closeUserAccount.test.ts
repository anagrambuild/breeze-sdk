import { BreezeSDK } from '../src/breeze-sdk';
import { TEST_CONFIG, waitForServer } from './test-config';

describe('Close User Account Integration Test', () => {
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

  describe('createCloseUserAccountTransaction', () => {
    it('should successfully create close user account transaction with pubkey + strategy + mint', async () => {
      const result = await sdk.createCloseUserAccountTransaction({
        userPubkey: TEST_CONFIG.testUserKey,
        strategyId: TEST_CONFIG.testStrategyId,
        mint: TEST_CONFIG.testBaseAssetMint,
      });

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    }, 30000);

    it('should successfully create close user account transaction with all options', async () => {
      const result = await sdk.createCloseUserAccountTransaction({
        userPubkey: TEST_CONFIG.testUserKey,
        strategyId: TEST_CONFIG.testStrategyId,
        mint: TEST_CONFIG.testBaseAssetMint,
        payer: TEST_CONFIG.testPayerKey,
        fundsRecipient: TEST_CONFIG.testUserKey,
      });

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    }, 30000);

    it('should handle invalid parameters', async () => {
      try {
        await sdk.createCloseUserAccountTransaction({
          userAccount: 'invalid_account_id',
        });
        fail('Should have thrown an error for invalid parameters');
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
        await offlineSDK.createCloseUserAccountTransaction({
          userAccount: TEST_CONFIG.testFundId,
        });
        fail('Should have thrown a network error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);
  });

  describe('getCloseUserAccountInstructions', () => {
    it('should successfully get close user account instructions with pubkey + strategy + mint', async () => {
      const result = await sdk.getCloseUserAccountInstructions({
        userPubkey: TEST_CONFIG.testUserKey,
        strategyId: TEST_CONFIG.testStrategyId,
        mint: TEST_CONFIG.testBaseAssetMint,
      });

      expect(result).toBeDefined();
      expect(result.close_user_fund_instructions).toBeDefined();
    }, 30000);

    it('should successfully get close user account instructions with all options', async () => {
      const result = await sdk.getCloseUserAccountInstructions({
        userPubkey: TEST_CONFIG.testUserKey,
        strategyId: TEST_CONFIG.testStrategyId,
        mint: TEST_CONFIG.testBaseAssetMint,
        payer: TEST_CONFIG.testPayerKey,
        fundsRecipient: TEST_CONFIG.testUserKey,
      });

      expect(result).toBeDefined();
      expect(result.close_user_fund_instructions).toBeDefined();
    }, 30000);

    it('should handle invalid parameters', async () => {
      try {
        await sdk.getCloseUserAccountInstructions({
          userAccount: 'invalid_account_id',
        });
        fail('Should have thrown an error for invalid parameters');
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
        await offlineSDK.getCloseUserAccountInstructions({
          userAccount: TEST_CONFIG.testFundId,
        });
        fail('Should have thrown a network error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);
  });
});
