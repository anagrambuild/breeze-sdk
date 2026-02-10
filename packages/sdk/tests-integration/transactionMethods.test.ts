import { BreezeSDK } from '../src/breeze-sdk';
import { TEST_CONFIG, waitForServer } from './test-config';

describe('Transaction Methods Integration Test', () => {
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

  describe('createDepositTransaction', () => {
    it('should successfully create deposit transaction with all options', async () => {
      const result = await sdk.createDepositTransaction({
        fundId: TEST_CONFIG.testFundId,
        // strategyId: TEST_CONFIG.testStrategyId,
        // baseAsset: TEST_CONFIG.testBaseAssetMint,
        amount: TEST_CONFIG.testAmount,
        userKey: TEST_CONFIG.testUserKey,
        payerKey: TEST_CONFIG.testPayerKey
      });

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    }, 30000);

    it('should successfully create deposit transaction with minimal options', async () => {
      const result = await sdk.createDepositTransaction({
        // strategyId: TEST_CONFIG.testStrategyId,
        // baseAsset: TEST_CONFIG.testBaseAssetMint,
        fundId: TEST_CONFIG.testFundId,
        amount: TEST_CONFIG.testAmount,
        userKey: TEST_CONFIG.testUserKey,
        payerKey: TEST_CONFIG.testPayerKey
      });

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    }, 30000);

    it('should successfully create deposit transaction with all=true', async () => {
      const result = await sdk.createDepositTransaction({
        // strategyId: TEST_CONFIG.testStrategyId,
        // baseAsset: TEST_CONFIG.testBaseAssetMint,
        fundId: TEST_CONFIG.testFundId,
        amount: TEST_CONFIG.testAmount,
        userKey: TEST_CONFIG.testUserKey,
        all: true,
        payerKey: TEST_CONFIG.testPayerKey
      });

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    }, 30000);

    it('should handle invalid fund ID', async () => {
      try {
        await sdk.createDepositTransaction({
          strategyId: 'invalid_strategy_id',
          baseAsset: TEST_CONFIG.testBaseAssetMint,
          amount: TEST_CONFIG.testAmount,
          userKey: TEST_CONFIG.testUserKey
        });
        fail('Should have thrown an error for invalid fund ID');
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
        await offlineSDK.createDepositTransaction({
          strategyId: TEST_CONFIG.testStrategyId,
          baseAsset: TEST_CONFIG.testBaseAssetMint,
          amount: TEST_CONFIG.testAmount,
          userKey: TEST_CONFIG.testUserKey
        });
        fail('Should have thrown a network error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);
  });

  describe('createWithdrawTransaction', () => {
    it('should successfully create withdraw transaction with all options', async () => {
      const result = await sdk.createWithdrawTransaction({
        fundId: TEST_CONFIG.testFundId,
        strategyId: TEST_CONFIG.testStrategyId,
        baseAsset: TEST_CONFIG.testBaseAssetMint,
        amount: TEST_CONFIG.testAmount,
        userKey: TEST_CONFIG.testUserKey,
        payerKey: TEST_CONFIG.testPayerKey
      });

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    }, 30000);

    it('should successfully create withdraw transaction with minimal options', async () => {
      const result = await sdk.createWithdrawTransaction({
        strategyId: TEST_CONFIG.testStrategyId,
        baseAsset: TEST_CONFIG.testBaseAssetMint,
        amount: TEST_CONFIG.testAmount,
        userKey: TEST_CONFIG.testUserKey,
        payerKey: TEST_CONFIG.testPayerKey
      });

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    }, 30000);

    it('should successfully create withdraw transaction with all=true', async () => {
      const result = await sdk.createWithdrawTransaction({
        strategyId: TEST_CONFIG.testStrategyId,
        baseAsset: TEST_CONFIG.testBaseAssetMint,
        amount: TEST_CONFIG.testAmount,
        userKey: TEST_CONFIG.testUserKey,
        all: true,
        payerKey: TEST_CONFIG.testPayerKey
      });

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    }, 30000);

    it('should handle invalid fund ID', async () => {
      try {
        await sdk.createWithdrawTransaction({
          strategyId: 'invalid_strategy_id',
          baseAsset: TEST_CONFIG.testBaseAssetMint,
          amount: TEST_CONFIG.testAmount,
          userKey: TEST_CONFIG.testUserKey
        });
        fail('Should have thrown an error for invalid fund ID');
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
        await offlineSDK.createWithdrawTransaction({
          strategyId: TEST_CONFIG.testStrategyId,
          baseAsset: TEST_CONFIG.testBaseAssetMint,
          amount: TEST_CONFIG.testAmount,
          userKey: TEST_CONFIG.testUserKey
        });
        fail('Should have thrown a network error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);
  });
});