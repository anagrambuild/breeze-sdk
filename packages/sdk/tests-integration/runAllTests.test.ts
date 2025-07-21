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
      expect(typeof sdk.createDepositTransaction).toBe('function');
      expect(typeof sdk.createWithdrawTransaction).toBe('function');
      expect(typeof sdk.getDepositInstructions).toBe('function');
      expect(typeof sdk.getWithdrawInstruction).toBe('function');
      expect(typeof sdk.updateApiKey).toBe('function');
    });
  });

  afterAll(() => {
    console.log('🏁 Integration tests completed');
  });
});