import { BreezeSDK } from '../src';
import { Connection, Keypair, Transaction, VersionedTransaction, sendAndConfirmTransaction } from '@solana/web3.js';
import bs58 from 'bs58';

// ===== CONFIGURATION =====
// Update these values with your actual configuration
const CONFIG = {
  // API Configuration
  apiKey: 'apy_key_here',
  baseUrl: 'http://localhost:8080/',
  
  // Solana Configuration  
  rpcUrl: 'https://api.mainnet-beta.solana.com',
  
  // User Configuration
  privateKey: 'your_private_key', // Base58 encoded private key
  userPublicKey: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep', // Should match private key
  
  // Fund Configuration
  fundId: '8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwWV',
  
  // Transaction Configuration
  depositAmount: 5,
  withdrawAmount: 5
};

// ===== HELPER FUNCTIONS =====
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

// ===== MAIN INTEGRATION FLOW =====
async function fullIntegrationFlow() {
  logSection('BREEZE SDK FULL INTEGRATION FLOW');
  
  try {
    // Initialize SDK
    logInfo('Initializing SDK...');
    const sdk = new BreezeSDK({
      baseUrl: CONFIG.baseUrl,
      apiKey: CONFIG.apiKey,
      timeout: 30000
    });
    
    // Initialize Solana connection
    logInfo('Initializing Solana connection...');
    const connection = new Connection(CONFIG.rpcUrl, 'confirmed');
    
    // Initialize user keypair (requires actual private key)
    if (CONFIG.privateKey === 'your_private_key') {
      logError('Please set your actual private key in CONFIG.privateKey');
      return;
    }
    
    const userKeypair = Keypair.fromSecretKey(bs58.decode(CONFIG.privateKey));
    logSuccess('SDK and Solana connection initialized');
    
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
      logInfo(`Total yield earned: ${userYield.total_yield_earned}`);
      logInfo(`Number of yield records: ${userYield.yields.length}`);
      
      if (userYield.yields.length > 0) {
        const latestYield = userYield.yields[0];
        logInfo(`Latest yield from fund: ${latestYield.fund_name}`);
        logInfo(`Position value: ${latestYield.position_value}`);
        logInfo(`Yield earned: ${latestYield.yield_earned}`);
        logInfo(`APY: ${latestYield.apy}`);
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
      logInfo(`Total portfolio value: ${userBalances.total_portfolio_value}`);
      logInfo(`Total yield earned: ${userBalances.total_yield_earned}`);
      logInfo(`Number of balance records: ${userBalances.balances.length}`);
    } catch (error) {
      logError('Failed to get user balances', error);
    }
    
    // ===== STEP 3: CREATE AND EXECUTE DEPOSIT TRANSACTION =====
    logSection('STEP 3: CREATE AND EXECUTE DEPOSIT TRANSACTION');
    
    try {
      logInfo(`Creating deposit transaction for ${CONFIG.depositAmount} tokens...`);
      const depositTxData = await sdk.createDepositTransaction({
        fundId: CONFIG.fundId,
        amount: CONFIG.depositAmount,
        userKey: CONFIG.userPublicKey
      });
      
      if (depositTxData.success && depositTxData.result) {
        logSuccess('Deposit transaction created successfully');
        
        // Deserialize transaction
        const transactionBuffer = Buffer.from(depositTxData.result, 'base64');
        const transaction = VersionedTransaction.deserialize(transactionBuffer);
        
        // Sign transaction
        transaction.sign([userKeypair]);
        logInfo('Transaction signed');
        
        // Send transaction
        logInfo('Sending transaction to Solana...');
        const signature = await connection.sendTransaction(transaction);
        logInfo(`Transaction signature: ${signature}`);
        
        // Confirm transaction
        logInfo('Waiting for confirmation...');
        await connection.confirmTransaction(signature);
        logSuccess(`Deposit transaction confirmed! Signature: ${signature}`);
        
      } else {
        logError('Failed to create deposit transaction');
        console.log('Response:', depositTxData);
      }
    } catch (error) {
      logError('Failed to execute deposit transaction', error);
    }
    
    // Wait between transactions
    logInfo('Waiting 5 seconds before next transaction...');
    await sleep(5000);
    
    // ===== STEP 4: CREATE AND EXECUTE WITHDRAW TRANSACTION =====
    logSection('STEP 4: CREATE AND EXECUTE WITHDRAW TRANSACTION');
    
    try {
      logInfo(`Creating withdraw transaction for ${CONFIG.withdrawAmount} tokens...`);
      const withdrawTxData = await sdk.createWithdrawTransaction({
        fundId: CONFIG.fundId,
        amount: CONFIG.withdrawAmount,
        userKey: CONFIG.userPublicKey
      });
      
      if (withdrawTxData.success && withdrawTxData.result) {
        logSuccess('Withdraw transaction created successfully');
        
        // Deserialize transaction
        const transactionBuffer = Buffer.from(withdrawTxData.result, 'base64');
        const transaction = VersionedTransaction.deserialize(transactionBuffer);
        
        // Sign transaction
        transaction.sign([userKeypair]);
        logInfo('Transaction signed');
        
        // Send transaction
        logInfo('Sending transaction to Solana...');
        const signature = await connection.sendTransaction(transaction);
        logInfo(`Transaction signature: ${signature}`);
        
        // Confirm transaction
        logInfo('Waiting for confirmation...');
        await connection.confirmTransaction(signature);
        logSuccess(`Withdraw transaction confirmed! Signature: ${signature}`);
        
      } else {
        logError('Failed to create withdraw transaction');
        console.log('Response:', withdrawTxData);
      }
    } catch (error) {
      logError('Failed to execute withdraw transaction', error);
    }
    
    // ===== STEP 5: GET FINAL USER STATE =====
    logSection('STEP 5: GET FINAL USER STATE');
    
    try {
      // Get updated yield data
      const finalYield = await sdk.getUserYield({
        userId: CONFIG.userPublicKey,
        fundId: CONFIG.fundId,
        page: 1,
        limit: 5
      });
      
      logSuccess('Retrieved final user yield data');
      logInfo(`Final total yield earned: ${finalYield.total_yield_earned}`);
      
      // Get updated balances
      const finalBalances = await sdk.getUserBalances({
        userId: CONFIG.userPublicKey,
        asset: 'USDC',
        sortBy: 'balance',
        sortOrder: 'desc'
      });
      
      logSuccess('Retrieved final user balances');
      logInfo(`Final portfolio value: ${finalBalances.total_portfolio_value}`);
      logInfo(`Final yield earned: ${finalBalances.total_yield_earned}`);
      
    } catch (error) {
      logError('Failed to get final user state', error);
    }
    
    logSection('FULL INTEGRATION FLOW COMPLETED');
    logSuccess('All transactions completed successfully!');
    logInfo('💡 Check your Solana wallet and fund positions for updates');
    
  } catch (error) {
    logError('Integration flow failed', error);
  }
}

// ===== EXECUTION =====
console.log('🚀 Starting Breeze SDK Full Integration Flow...');
console.log('📋 Configuration:');
console.log(`   API URL: ${CONFIG.baseUrl}`);
console.log(`   Fund ID: ${CONFIG.fundId}`);
console.log(`   User: ${CONFIG.userPublicKey}`);
console.log(`   Deposit Amount: ${CONFIG.depositAmount}`);
console.log(`   Withdraw Amount: ${CONFIG.withdrawAmount}`);
console.log(`   Solana RPC: ${CONFIG.rpcUrl}`);

// WARNING: This requires a real private key to execute transactions
console.log('\n⚠️  WARNING: This script requires a valid private key to execute transactions');
console.log('⚠️  Make sure you have sufficient SOL for transaction fees');

fullIntegrationFlow().catch(console.error);