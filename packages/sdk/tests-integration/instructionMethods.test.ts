import { BreezeSDK } from '../src/breeze-sdk';
import { TEST_CONFIG, waitForServer } from './test-config';

describe('Instruction Methods Integration Test', () => {
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

  describe('getDepositInstructions', () => {
    it('should successfully get deposit instructions with all options', async () => {
      const result = await sdk.getDepositInstructions({
        fundId: TEST_CONFIG.testFundId,
        amount: TEST_CONFIG.testAmount,
        userKey: TEST_CONFIG.testUserKey,
        payerKey: TEST_CONFIG.testPayerKey
      });
      
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(result.result.deposit_instruction).toBeDefined();
      expect(Array.isArray(result.result.deposit_instruction)).toBe(true);
      expect(result.result.deposit_instruction.length).toBeGreaterThan(0);
      
      const instruction = result.result.deposit_instruction[0];
      expect(Array.isArray(instruction.program_id)).toBe(true);
      expect(Array.isArray(instruction.accounts)).toBe(true);
      expect(Array.isArray(instruction.data)).toBe(true);
    }, 30000);

    it('should successfully get deposit instructions with minimal options', async () => {
      const result = await sdk.getDepositInstructions({
        fundId: TEST_CONFIG.testFundId,
        amount: TEST_CONFIG.testAmount,
        userKey: TEST_CONFIG.testUserKey
      });
      
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(result.result.deposit_instruction).toBeDefined();
      expect(Array.isArray(result.result.deposit_instruction)).toBe(true);
    }, 30000);

    it('should successfully get deposit instructions with all=true', async () => {
      const result = await sdk.getDepositInstructions({
        fundId: TEST_CONFIG.testFundId,
        amount: TEST_CONFIG.testAmount,
        userKey: TEST_CONFIG.testUserKey,
        all: true,
        payerKey: TEST_CONFIG.testPayerKey
      });
      
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(result.result.deposit_instruction).toBeDefined();
      expect(Array.isArray(result.result.deposit_instruction)).toBe(true);
    }, 30000);

    it('should handle invalid fund ID', async () => {
      try {
        await sdk.getDepositInstructions({
          fundId: 'invalid_fund_id',
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
        await offlineSDK.getDepositInstructions({
          fundId: TEST_CONFIG.testFundId,
          amount: TEST_CONFIG.testAmount,
          userKey: TEST_CONFIG.testUserKey
        });
        fail('Should have thrown a network error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);
  });

  describe('getWithdrawInstruction', () => {
    it('should successfully get withdraw instruction with all options', async () => {
      const result = await sdk.getWithdrawInstruction({
        fundId: TEST_CONFIG.testFundId,
        shares: TEST_CONFIG.testShares,
        userKey: TEST_CONFIG.testUserKey,
        payerKey: TEST_CONFIG.testPayerKey
      });
      
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(result.result.lut_address).toBeDefined();
      expect(result.result.withdraw_instruction).toBeDefined();
      
      const instruction = result.result.withdraw_instruction;
      expect(Array.isArray(instruction.program_id)).toBe(true);
      expect(Array.isArray(instruction.accounts)).toBe(true);
      expect(Array.isArray(instruction.data)).toBe(true);
    }, 30000);

    it('should successfully get withdraw instruction with minimal options', async () => {
      const result = await sdk.getWithdrawInstruction({
        fundId: TEST_CONFIG.testFundId,
        shares: TEST_CONFIG.testShares,
        userKey: TEST_CONFIG.testUserKey
      });
      
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(result.result.lut_address).toBeDefined();
      expect(result.result.withdraw_instruction).toBeDefined();
    }, 30000);

    it('should successfully get withdraw instruction with all=true', async () => {
      const result = await sdk.getWithdrawInstruction({
        fundId: TEST_CONFIG.testFundId,
        shares: TEST_CONFIG.testShares,
        userKey: TEST_CONFIG.testUserKey,
        all: true,
        payerKey: TEST_CONFIG.testPayerKey
      });
      
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(result.result.lut_address).toBeDefined();
      expect(result.result.withdraw_instruction).toBeDefined();
    }, 30000);

    it('should handle invalid fund ID', async () => {
      try {
        await sdk.getWithdrawInstruction({
          fundId: 'invalid_fund_id',
          shares: TEST_CONFIG.testShares,
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
        await offlineSDK.getWithdrawInstruction({
          fundId: TEST_CONFIG.testFundId,
          shares: TEST_CONFIG.testShares,
          userKey: TEST_CONFIG.testUserKey
        });
        fail('Should have thrown a network error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);
  });
});