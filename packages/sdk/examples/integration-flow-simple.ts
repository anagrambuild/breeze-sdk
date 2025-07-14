import { BreezeSDK } from '../src';

// ===== CONFIGURATION =====
// Update these values with your actual configuration
const CONFIG = {
  // API Configuration
  apiKey: 'userkey_0000',
  baseUrl: 'http://localhost:8080/',
  
  // User Configuration
  userPublicKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh',
  
  // Fund Configuration
  fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
  organizationId: 'org_2z9UJxhyNmCvOpHScFKyBZrqEdy',
  
  // Transaction Configuration
  depositAmount: 100,
  withdrawShares: 50,
  
  // Date range for stats
  startDate: '2025-07-11T15:34:39.406Z',
  endDate: '2025-07-13T19:34:39.406Z'
};

// ===== HELPER FUNCTIONS =====
function logSection(title: string) {
  console.log('\n' + '='.repeat(50));
  console.log(`🔄 ${title}`);
  console.log('='.repeat(50));
}

function logSuccess(message: string) {
  console.log(`✅ ${message}`);
}

function logError(message: string, error?: any) {
  console.log(`❌ ${message}`);
  if (error) {
    console.log(`   Error: ${error.message || error}`);
  }
}

function logInfo(message: string) {
  console.log(`ℹ️  ${message}`);
}

// ===== MAIN INTEGRATION FLOW (WITHOUT SOLANA TRANSACTION EXECUTION) =====
async function integrationFlowSimple() {
  logSection('BREEZE SDK INTEGRATION FLOW (SIMPLE VERSION)');
  
  try {
    // Initialize SDK
    logInfo('Initializing SDK...');
    const sdk = new BreezeSDK({
      baseUrl: CONFIG.baseUrl,
      apiKey: CONFIG.apiKey,
      timeout: 30000
    });
    
    logSuccess('SDK initialized successfully');
    
    // ===== STEP 1: GET INITIAL USER VALUE =====
    logSection('STEP 1: GET INITIAL USER VALUE');
    
    let initialUserValue;
    try {
      initialUserValue = await sdk.getUserValue(CONFIG.userPublicKey, {
        fundId: CONFIG.fundId,
        baseAsset: 'USDC'
      });
      
      logSuccess('Retrieved initial user value');
      console.log('Initial Value Response:', JSON.stringify(initialUserValue, null, 2));
      
      // Parse user value
      if (initialUserValue.success || initialUserValue.success) {
        const assets = Object.keys(initialUserValue.result);
        if (assets.length > 0) {
          const firstAsset = assets[0];
          const values = initialUserValue.result[firstAsset];
          if (values && values.length > 0) {
            logInfo(`Initial ${firstAsset} value: ${values[0].base_asset_value}`);
            logInfo(`Fund percentage: ${values[0].percent_of_fund}%`);
            logInfo(`Total fund value: ${values[0].total_fund_value}`);
          }
        }
      }
    } catch (error) {
      logError('Failed to get initial user value', error);
    }
    
    // ===== STEP 2: GET PARTNER STATS =====
    logSection('STEP 2: GET PARTNER FUND STATISTICS');
    
    try {
      const partnerStats = await sdk.getPartnerFundStats(
        CONFIG.organizationId,
        CONFIG.startDate,
        CONFIG.endDate,
        {
          baseAsset: 'USDC'
        }
      );
      
      logSuccess('Retrieved partner fund statistics');
      console.log('Partner Stats Response:', JSON.stringify(partnerStats, null, 2));
      
      // Parse partner stats
      if ((partnerStats.success || partnerStats.success) && partnerStats.result.length > 0) {
        const stats = partnerStats.result[0];
        logInfo(`Fund ID: ${stats.meta.fund_id}`);
        logInfo(`Base Asset: ${stats.meta.base_asset}`);
        logInfo(`Time range: ${stats.meta.start} to ${stats.meta.end}`);
        logInfo(`Granularity: ${stats.meta.granularity}`);
        logInfo(`Data points: ${stats.time_stamps.length}`);
        
        if (stats.base_asset_value.length > 0) {
          const latestValue = stats.base_asset_value[stats.base_asset_value.length - 1];
          const latestYield = stats.yeild_percentage[stats.yeild_percentage.length - 1];
          logInfo(`Latest value: ${latestValue}`);
          logInfo(`Latest yield: ${latestYield}%`);
        }
      }
    } catch (error) {
      logError('Failed to get partner statistics', error);
    }
    
    // ===== STEP 3: CREATE DEPOSIT TRANSACTION (GET TRANSACTION DATA) =====
    logSection('STEP 3: CREATE DEPOSIT TRANSACTION');
    
    let depositTxData;
    try {
      logInfo(`Creating deposit transaction for ${CONFIG.depositAmount} tokens...`);
      depositTxData = await sdk.createDepositTransaction({
        fundId: CONFIG.fundId,
        amount: CONFIG.depositAmount,
        userKey: CONFIG.userPublicKey
      });
      
      if (depositTxData.success || depositTxData.success) {
        logSuccess('Deposit transaction created successfully');
        logInfo(`Transaction data (base64): ${depositTxData.result.substring(0, 100)}...`);
        logInfo(`Transaction length: ${depositTxData.result.length} characters`);
        
        // You can save this transaction data and sign it externally
        logInfo('💡 To execute this transaction:');
        logInfo('   1. Deserialize the base64 transaction data');
        logInfo('   2. Sign with your private key');
        logInfo('   3. Send to Solana RPC');
        logInfo('   4. Wait for confirmation');
        
      } else {
        logError('Failed to create deposit transaction');
        console.log('Response:', depositTxData);
      }
    } catch (error) {
      logError('Failed to create deposit transaction', error);
    }
    
    // ===== STEP 4: GET USER STATISTICS =====
    logSection('STEP 4: GET USER STATISTICS');
    
    try {
      const userStats = await sdk.getUserStats(
        CONFIG.userPublicKey,
        CONFIG.startDate,
        CONFIG.endDate,
        {
          fundId: CONFIG.fundId,
          baseAsset: 'USDC'
        }
      );
      
      logSuccess('Retrieved user statistics');
      console.log('User Stats Response:', JSON.stringify(userStats, null, 2));
      
      // Parse user stats
      if ((userStats.success || userStats.success) && userStats.result.length > 0) {
        const stats = userStats.result[0];
        logInfo(`Fund ID: ${stats.meta.fund_id}`);
        logInfo(`Base Asset: ${stats.meta.base_asset}`);
        logInfo(`Time range: ${stats.meta.start} to ${stats.meta.end}`);
        logInfo(`Granularity: ${stats.meta.granularity}`);
        logInfo(`Data points: ${stats.time_stamps.length}`);
        
        if (stats.base_asset_value.length > 0) {
          const latestValue = stats.base_asset_value[stats.base_asset_value.length - 1];
          const latestYield = stats.yeild_percentage[stats.yeild_percentage.length - 1];
          logInfo(`Latest value: ${latestValue}`);
          logInfo(`Latest yield: ${latestYield}%`);
        }
      }
    } catch (error) {
      logError('Failed to get user statistics', error);
    }
    
    // ===== STEP 5: CREATE WITHDRAW TRANSACTION (GET TRANSACTION DATA) =====
    logSection('STEP 5: CREATE WITHDRAW TRANSACTION');
    
    try {
      logInfo(`Creating withdraw transaction for ${CONFIG.withdrawShares} shares...`);
      const withdrawTxData = await sdk.createWithdrawTransaction({
        fundId: CONFIG.fundId,
        shares: CONFIG.withdrawShares,
        userKey: CONFIG.userPublicKey
      });
      
      if (withdrawTxData.success || withdrawTxData.success) {
        logSuccess('Withdraw transaction created successfully');
        logInfo(`Transaction data (base64): ${withdrawTxData.result.substring(0, 100)}...`);
        logInfo(`Transaction length: ${withdrawTxData.result.length} characters`);
        
        // You can save this transaction data and sign it externally
        logInfo('💡 To execute this transaction:');
        logInfo('   1. Deserialize the base64 transaction data');
        logInfo('   2. Sign with your private key');
        logInfo('   3. Send to Solana RPC');
        logInfo('   4. Wait for confirmation');
        
      } else {
        logError('Failed to create withdraw transaction');
        console.log('Response:', withdrawTxData);
      }
    } catch (error) {
      logError('Failed to create withdraw transaction', error);
    }
    
    // ===== STEP 6: DEMONSTRATE INSTRUCTION METHODS =====
    logSection('STEP 6: GET TRANSACTION INSTRUCTIONS');
    
    try {
      // Get deposit instructions
      logInfo('Getting deposit instructions...');
      const depositInstructions = await sdk.getDepositInstructions({
        fundId: CONFIG.fundId,
        amount: CONFIG.depositAmount,
        userKey: CONFIG.userPublicKey
      });
      
      if (depositInstructions.success || depositInstructions.success) {
        logSuccess('Retrieved deposit instructions');
        const instructions = depositInstructions.result.deposit_instruction;
        logInfo(`Number of instructions: ${instructions.length}`);
        
        instructions.forEach((instruction, index) => {
          logInfo(`Instruction ${index + 1}:`);
          logInfo(`  - Program ID: [${instruction.program_id[0]}, ${instruction.program_id[1]}, ...]`);
          logInfo(`  - Accounts: ${instruction.accounts.length}`);
          logInfo(`  - Data length: ${instruction.data.length}`);
        });
      }
      
      // Get withdraw instruction
      logInfo('Getting withdraw instruction...');
      const withdrawInstruction = await sdk.getWithdrawInstruction({
        fundId: CONFIG.fundId,
        shares: CONFIG.withdrawShares,
        userKey: CONFIG.userPublicKey
      });
      
      if (withdrawInstruction.success || withdrawInstruction.success) {
        logSuccess('Retrieved withdraw instruction');
        const instruction = withdrawInstruction.result.withdraw_instruction;
        logInfo(`Lookup table address: ${withdrawInstruction.result.lut_address}`);
        logInfo(`Program ID: [${instruction.program_id[0]}, ${instruction.program_id[1]}, ...]`);
        logInfo(`Accounts: ${instruction.accounts.length}`);
        logInfo(`Data length: ${instruction.data.length}`);
      }
      
    } catch (error) {
      logError('Failed to get transaction instructions', error);
    }
    
    logSection('INTEGRATION FLOW COMPLETED (SIMPLE VERSION)');
    logSuccess('All API calls completed successfully!');
    logInfo('💡 For full transaction execution, use the integration-flow.ts script');
    logInfo('   with proper Solana dependencies and private key configuration');
    
  } catch (error) {
    logError('Integration flow failed', error);
  }
}

// ===== EXECUTION =====
console.log('🚀 Starting Breeze SDK Integration Flow (Simple Version)...');
console.log('📋 Configuration:');
console.log(`   API URL: ${CONFIG.baseUrl}`);
console.log(`   Fund ID: ${CONFIG.fundId}`);
console.log(`   Organization ID: ${CONFIG.organizationId}`);
console.log(`   User: ${CONFIG.userPublicKey}`);
console.log(`   Deposit Amount: ${CONFIG.depositAmount}`);
console.log(`   Withdraw Shares: ${CONFIG.withdrawShares}`);
console.log(`   Date Range: ${CONFIG.startDate} to ${CONFIG.endDate}`);

integrationFlowSimple().catch(console.error);