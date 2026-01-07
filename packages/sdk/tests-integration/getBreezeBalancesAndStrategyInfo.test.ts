import { BreezeSDK } from '../src/breeze-sdk';
import { TEST_CONFIG, waitForServer } from './test-config';

describe('Breeze Balances and Strategy Info Integration Tests', () => {
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

  describe('getBreezeBalances', () => {
    it('should successfully get breeze balances with strategy ID', async () => {
      const result = await sdk.getBreezeBalances({
        userId: TEST_CONFIG.testUserId,
        strategyId: TEST_CONFIG.testStrategyId
      });

      console.log('\n=== getBreezeBalances API Response ===');
      console.log(JSON.stringify(result, null, 2));
      console.log('======================================\n');

      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.meta).toBeDefined();
      expect(result.meta.page).toBeDefined();
      expect(result.meta.per_page).toBeDefined();
      expect(result.meta.total).toBeDefined();
      expect(result.meta.total_pages).toBeDefined();
      expect(result.meta.has_more).toBeDefined();

      if (result.data.length > 0) {
        const balance = result.data[0];
        expect(balance.strategy_name).toBeDefined();
        expect(balance.strategy_id).toBeDefined();
        expect(balance.fund_id).toBeDefined();
        expect(balance.token_address).toBeDefined();
        expect(balance.token_symbol).toBeDefined();
        expect(balance.token_name).toBeDefined();
        expect(balance.decimals).toBeDefined();
        expect(balance.total_position_value).toBeDefined();
        expect(balance.total_deposited_value).toBeDefined();
        expect(balance.yield_earned).toBeDefined();
        expect(balance.apy).toBeDefined();
        expect(balance.last_updated).toBeDefined();
      }
    }, 30000);

    it('should successfully get breeze balances with asset filter', async () => {
      const result = await sdk.getBreezeBalances({
        userId: TEST_CONFIG.testUserId,
        strategyId: TEST_CONFIG.testStrategyId,
        asset: 'USDC'
      });

      console.log('\n=== getBreezeBalances with USDC filter API Response ===');
      console.log(JSON.stringify(result, null, 2));
      console.log('======================================================\n');

      expect(result).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.meta).toBeDefined();

      // If there are results, verify they match the filter
      if (result.data.length > 0) {
        result.data.forEach(balance => {
          expect(balance.token_symbol).toBe('USDC');
        });
      }
    }, 30000);

    it('should successfully get breeze balances with sorting', async () => {
      const result = await sdk.getBreezeBalances({
        userId: TEST_CONFIG.testUserId,
        strategyId: TEST_CONFIG.testStrategyId,
        sortBy: 'balance',
        sortOrder: 'desc'
      });

      expect(result).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.meta).toBeDefined();
    }, 30000);

    it('should successfully get breeze balances with pagination', async () => {
      const result = await sdk.getBreezeBalances({
        userId: TEST_CONFIG.testUserId,
        strategyId: TEST_CONFIG.testStrategyId,
        page: 1,
        limit: 5
      });

      expect(result).toBeDefined();
      expect(result.meta.page).toBe(1);
      expect(result.meta.per_page).toBeLessThanOrEqual(5);
      expect(Array.isArray(result.data)).toBe(true);
    }, 30000);

    it('should successfully get breeze balances with all options', async () => {
      const result = await sdk.getBreezeBalances({
        userId: TEST_CONFIG.testUserId,
        strategyId: TEST_CONFIG.testStrategyId,
        asset: 'USDC',
        sortBy: 'balance',
        sortOrder: 'asc',
        page: 1,
        limit: 10
      });

      expect(result).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.meta).toBeDefined();
    }, 30000);

    it('should handle invalid user ID', async () => {
      try {
        await sdk.getBreezeBalances({
          userId: 'invalid_user_id',
          strategyId: TEST_CONFIG.testStrategyId
        });
        fail('Should have thrown an error for invalid user ID');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);

    it('should handle invalid strategy ID', async () => {
      try {
        await sdk.getBreezeBalances({
          userId: TEST_CONFIG.testUserId,
          strategyId: 'invalid_strategy_id'
        });
        fail('Should have thrown an error for invalid strategy ID');
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
        await offlineSDK.getBreezeBalances({
          userId: TEST_CONFIG.testUserId,
          strategyId: TEST_CONFIG.testStrategyId
        });
        fail('Should have thrown a network error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);
  });

  describe('getStrategyInfo', () => {
    it('should successfully get strategy info', async () => {
      const result = await sdk.getStrategyInfo(TEST_CONFIG.testStrategyId);

      console.log('\n=== getStrategyInfo API Response ===');
      console.log(JSON.stringify(result, null, 2));
      console.log('===================================\n');

      expect(result).toBeDefined();
      expect(result.strategy_id).toBeDefined();
      expect(result.strategy_name).toBeDefined();
      expect(result.assets).toBeDefined();
      expect(Array.isArray(result.assets)).toBe(true);
      expect(result.apy).toBeDefined();
      expect(typeof result.apy).toBe('number');
      expect(result.apy_per_asset).toBeDefined();
      expect(typeof result.apy_per_asset).toBe('object');

      // Verify that apy_per_asset contains APY values for each asset
      if (result.assets.length > 0) {
        result.assets.forEach(asset => {
          expect(result.apy_per_asset[asset]).toBeDefined();
          expect(typeof result.apy_per_asset[asset]).toBe('number');
        });
      }
    }, 30000);

    it('should verify strategy info structure', async () => {
      const result = await sdk.getStrategyInfo(TEST_CONFIG.testStrategyId);

      // Verify the structure matches the expected format
      expect(result.strategy_id).toBe(TEST_CONFIG.testStrategyId);
      expect(result.strategy_name.length).toBeGreaterThan(0);
      expect(result.assets.length).toBeGreaterThan(0);

      // APY should be a valid number (not NaN or Infinity)
      expect(Number.isFinite(result.apy)).toBe(true);

      // Each asset should have a corresponding APY
      const apyKeys = Object.keys(result.apy_per_asset);
      expect(apyKeys.length).toBeGreaterThan(0);
      apyKeys.forEach(key => {
        expect(Number.isFinite(result.apy_per_asset[key])).toBe(true);
      });
    }, 30000);

    it('should handle invalid strategy ID', async () => {
      try {
        await sdk.getStrategyInfo('invalid_strategy_id_12345');
        fail('Should have thrown an error for invalid strategy ID');
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
        await offlineSDK.getStrategyInfo(TEST_CONFIG.testStrategyId);
        fail('Should have thrown a network error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);
  });
});
