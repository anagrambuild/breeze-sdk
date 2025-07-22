import { BreezeSDK } from '../src';

// ===== CONFIGURATION =====
// Update these values with your actual configuration
const CONFIG = {
  // API Configuration
  apiKey: 'apy_key_here',
  baseUrl: 'https://api.breeze.baby/',
  
  // User Configuration
  userPublicKey: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep',
  
  // Fund Configuration
  fundId: '8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwWV',
  
  // Transaction Configuration
  depositAmount: 100,
  withdrawAmount: 50
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
    
    // ===== STEP 1: GET USER YIELD DATA =====
    logSection('STEP 1: GET USER YIELD DATA');
    
    try {
      const userYield = await sdk.getUserYield({
        userId: CONFIG.userPublicKey,
        fundId: CONFIG.fundId,
        page: 1,
        limit: 10
      });
      
      logSuccess('Retrieved user yield data');
      console.log('User Yield Response:', JSON.stringify(userYield, null, 2));
      
      // Parse user yield
      if (userYield && userYield.yields) {
        logInfo(`Total yield earned: ${userYield.total_yield_earned}`);
        logInfo(`Number of yield records: ${userYield.yields.length}`);
        logInfo(`Current page: ${userYield.pagination.page} of ${userYield.pagination.total_pages}`);
        
        if (userYield.yields.length > 0) {
          const latestYield = userYield.yields[0];
          logInfo(`Latest yield from fund: ${latestYield.fund_name}`);
          logInfo(`Position value: ${latestYield.position_value}`);
          logInfo(`Yield earned: ${latestYield.yield_earned}`);
          logInfo(`APY: ${latestYield.apy}`);
        }
      }
    } catch (error) {
      logError('Failed to get user yield data', error);
    }
    
    // ===== STEP 2: GET USER BALANCES =====
    logSection('STEP 2: GET USER BALANCES');
    
    try {
      const userBalances = await sdk.getUserBalances({
        userId: CONFIG.userPublicKey,
        asset: 'USDC',
        sortBy: 'balance',
        sortOrder: 'desc'
      });
      
      logSuccess('Retrieved user balances');
      console.log('User Balances Response:', JSON.stringify(userBalances, null, 2));
      
      // Parse user balances
      if (userBalances && userBalances.balances) {
        logInfo(`Total portfolio value: ${userBalances.total_portfolio_value}`);
        logInfo(`Total yield earned: ${userBalances.total_yield_earned}`);
        logInfo(`Number of balance records: ${userBalances.balances.length}`);
        
        userBalances.balances.forEach((balance, index) => {
          logInfo(`Asset ${index + 1}: ${balance.asset} (${balance.symbol})`);
          logInfo(`  - Wallet balance: ${balance.wallet_balance}`);
          logInfo(`  - Total balance: ${balance.total_balance}`);
          logInfo(`  - Total yield: ${balance.total_yield}`);
          logInfo(`  - Fund positions: ${balance.fund_positions.length}`);
        });
      }
    } catch (error) {
      logError('Failed to get user balances', error);
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
      
      if (depositTxData.success) {
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
    
    // ===== STEP 4: CREATE WITHDRAW TRANSACTION (GET TRANSACTION DATA) =====
    logSection('STEP 4: CREATE WITHDRAW TRANSACTION');
    
    try {
      logInfo(`Creating withdraw transaction for ${CONFIG.withdrawAmount} tokens...`);
      const withdrawTxData = await sdk.createWithdrawTransaction({
        fundId: CONFIG.fundId,
        amount: CONFIG.withdrawAmount,
        userKey: CONFIG.userPublicKey
      });
      
      if (withdrawTxData.success) {
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
    
    // ===== STEP 5: DEMONSTRATE INSTRUCTION METHODS =====
    logSection('STEP 5: GET TRANSACTION INSTRUCTIONS');
    
    try {
      // Get deposit instructions
      logInfo('Getting deposit instructions...');
      const depositInstructions = await sdk.getDepositInstructions({
        fundId: CONFIG.fundId,
        amount: CONFIG.depositAmount,
        userKey: CONFIG.userPublicKey
      });
      
      logSuccess('Retrieved deposit instructions');
      logInfo(`Has deposit instructions: ${!!depositInstructions.deposit_instruction}`);
      logInfo(`Deposit instruction type: ${typeof depositInstructions.deposit_instruction}`);
      
      // Get withdraw instruction
      logInfo('Getting withdraw instruction...');
      const withdrawInstruction = await sdk.getWithdrawInstruction({
        fundId: CONFIG.fundId,
        amount: CONFIG.withdrawAmount,
        userKey: CONFIG.userPublicKey
      });
      
      logSuccess('Retrieved withdraw instruction');
      logInfo(`Lookup table address: ${withdrawInstruction.lut_address}`);
      logInfo(`Withdraw instruction type: ${typeof withdrawInstruction.withdraw_instruction}`);
      
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
console.log(`   User: ${CONFIG.userPublicKey}`);
console.log(`   Deposit Amount: ${CONFIG.depositAmount}`);
console.log(`   Withdraw Amount: ${CONFIG.withdrawAmount}`);

integrationFlowSimple().catch(console.error);