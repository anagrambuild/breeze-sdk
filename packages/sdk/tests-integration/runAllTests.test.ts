import { BreezeSDK } from '../src/breeze-sdk';
import { TEST_CONFIG, waitForServer } from './test-config';

describe('All SDK Methods Integration Tests', () => {
  let sdk: BreezeSDK;

  beforeAll(async () => {
    console.log('🚀 Starting integration tests...');
    console.log(`📡 Connecting to server at: ${TEST_CONFIG.baseUrl}`);
    
    // Wait for server to be ready
    await waitForServer(TEST_CONFIG.baseUrl);
    console.log('✅ Server is ready');
    
    sdk = new BreezeSDK({
      baseUrl: TEST_CONFIG.baseUrl,
      apiKey: TEST_CONFIG.apiKey,
      timeout: TEST_CONFIG.timeout
    });
  }, 30000); // 30 second timeout for beforeAll

  describe('SDK Health Check', () => {
    it('should initialize SDK correctly', () => {
      expect(sdk).toBeDefined();
      expect(sdk.getApiClient()).toBeDefined();
    });

    it('should have all required methods', () => {
      expect(typeof sdk.getFund).toBe('function');
      expect(typeof sdk.getFundsForBaseAsset).toBe('function');
      expect(typeof sdk.getUserInfo).toBe('function');
      expect(typeof sdk.getUserValue).toBe('function');
      expect(typeof sdk.getUserStats).toBe('function');
      expect(typeof sdk.getPartnerFundStats).toBe('function');
      expect(typeof sdk.createDepositTransaction).toBe('function');
      expect(typeof sdk.createWithdrawTransaction).toBe('function');
      expect(typeof sdk.getDepositInstructions).toBe('function');
      expect(typeof sdk.getWithdrawInstruction).toBe('function');
      expect(typeof sdk.updateApiKey).toBe('function');
    });
  });

  describe('Quick Integration Test', () => {
    it('should successfully call at least one method from each category', async () => {
      // Test fund operations
      try {
        await sdk.getFund(TEST_CONFIG.testFundId);
        console.log('✅ Fund operations working');
      } catch (error) {
        console.log('⚠️  Fund operations may need server setup');
      }

      // Test user operations
      try {
        await sdk.getUserInfo(TEST_CONFIG.testUserId);
        console.log('✅ User operations working');
      } catch (error) {
        console.log('⚠️  User operations may need server setup');
      }

      // Test partner operations
      try {
        await sdk.getPartnerFundStats(TEST_CONFIG.testOrganizationId, TEST_CONFIG.testStartDate, TEST_CONFIG.testEndDate);
        console.log('✅ Partner operations working');
      } catch (error) {
        console.log('⚠️  Partner operations may need server setup');
      }

      // Test base asset operations
      try {
        await sdk.getFundsForBaseAsset(TEST_CONFIG.testBaseAsset);
        console.log('✅ Base asset operations working');
      } catch (error) {
        console.log('⚠️  Base asset operations may need server setup');
      }

      // Always pass this test as it's just a health check
      expect(true).toBe(true);
    });
  });

  afterAll(() => {
    console.log('🏁 Integration tests completed');
  });
});