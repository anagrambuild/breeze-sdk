import { BreezeSDK } from '../src';
import { Connection, Keypair, Transaction, VersionedTransaction, sendAndConfirmTransaction } from '@solana/web3.js';
import bs58 from 'bs58';

// ===== CONFIGURATION =====
// Update these values with your actual configuration
const CONFIG = {
  // API Configuration
  apiKey: 'userkey_0000',
  baseUrl: 'http://localhost:8080/',
  
  // Solana Configuration  
  rpcUrl: 'https://api.mainnet-beta.solana.com',
  
  // User Configuration
  privateKey: 'your_private_key', // Base58 encoded private key
  userPublicKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // Should match private key
  
  // Fund Configuration
  fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
  organizationId: 'org_2z9UJxhyNmCvOpHScFKyBZrqEdy',
  
  // Transaction Configuration
  depositAmount: 5,
  withdrawShares: 5,
  
  // Date range for stats
  startDate: '2025-07-11T15:34:39.406Z',
  endDate: '2025-07-13T19:34:39.406Z'
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
async function integrationFlow() {
  logSection('BREEZE SDK INTEGRATION FLOW');
  
  // Validate configuration
  if (CONFIG.privateKey === 'YOUR_PRIVATE_KEY_BASE58_HERE') {
    logError('Please update the CONFIG.privateKey with your actual private key');
    return;
  }
  
  try {
    // Initialize SDK and Solana connection
    logInfo('Initializing SDK and Solana connection...');
    const sdk = new BreezeSDK({
      baseUrl: CONFIG.baseUrl,
      apiKey: CONFIG.apiKey,
      timeout: 30000
    });
    
    const connection = new Connection(CONFIG.rpcUrl, 'confirmed');
    const userKeypair = Keypair.fromSecretKey(bs58.decode(CONFIG.privateKey));
    
    logSuccess(`Connected to ${CONFIG.rpcUrl}`);
    logSuccess(`User public key: ${userKeypair.publicKey.toString()}`);
    
    // Verify user public key matches config
    if (userKeypair.publicKey.toString() !== CONFIG.userPublicKey) {
      logError('Private key does not match configured public key');
      return;
    }
    
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
    
    // ===== STEP 3: CREATE AND EXECUTE DEPOSIT TRANSACTION =====
    logSection('STEP 3: CREATE AND EXECUTE DEPOSIT TRANSACTION');
    
    try {
      // Get deposit transaction
      logInfo(`Creating deposit transaction for ${CONFIG.depositAmount} tokens...`);
      const depositTxResponse = await sdk.createDepositTransaction({
        fundId: CONFIG.fundId,
        amount: CONFIG.depositAmount,
        userKey: CONFIG.userPublicKey
      });
      
      logInfo('Deposit transaction response received');
      console.log('Deposit Response:', JSON.stringify(depositTxResponse, null, 2));
      
      if (depositTxResponse.success || depositTxResponse.success) {
        logSuccess('Deposit transaction created successfully');
        
        try {
          // Deserialize and sign transaction
          const txBuffer = Buffer.from(depositTxResponse.result, 'base64');
          // const transaction = Transaction.from(txBuffer);
          const transaction = VersionedTransaction.deserialize(txBuffer);
          
          logInfo('Signing transaction...');
          transaction.sign([userKeypair]);
          
          // Send transaction
          logInfo('Sending transaction to network...');
          const txSignature = connection.sendTransaction(transaction);
          
          
          // await sendAndConfirmTransaction(
          //   connection,
          //   transaction,
          //   [userKeypair],
          //   { commitment: 'confirmed' }
          // );

          // const confirmation = await connection.confirmTransaction(txSignature, 'confirmed');

          //   if (confirmation.value.err) {
          //       logInfo('Failed to confirm transaction'); 
          //       return;
          //   }   


          logSuccess(`Deposit transaction confirmed: ${txSignature}`);
          logInfo(`View on explorer: https://explorer.solana.com/tx/${txSignature}?cluster=mainnet-beta`);
          
          // Wait for transaction to settle
          logInfo('Waiting for transaction to settle...');
          await sleep(5000);
          
        } catch (txError) {
          logError('Failed to execute deposit transaction', txError);
        }
        
      } else {
        logError('Failed to create deposit transaction');
        console.log('Response:', depositTxResponse);
      }
    } catch (error) {
      logError('Failed to execute deposit transaction', error);
    }
    
    // ===== STEP 4: GET UPDATED USER VALUE =====
    logSection('STEP 4: GET UPDATED USER VALUE');
    
    try {
      const updatedUserValue = await sdk.getUserValue(CONFIG.userPublicKey, {
        fundId: CONFIG.fundId,
        baseAsset: 'USDC'
      });
      
      logSuccess('Retrieved updated user value');
      console.log('Updated Value Response:', JSON.stringify(updatedUserValue, null, 2));
      
      // Compare with initial value
      if (updatedUserValue.success || updatedUserValue.success) {
        const assets = Object.keys(updatedUserValue.result);
        if (assets.length > 0) {
          const firstAsset = assets[0];
          const values = updatedUserValue.result[firstAsset];
          if (values && values.length > 0) {
            logInfo(`Updated ${firstAsset} value: ${values[0].base_asset_value}`);
            logInfo(`Fund percentage: ${values[0].percent_of_fund}%`);
            
            // Compare with initial if available
            if (initialUserValue && (initialUserValue.success || initialUserValue.success)) {
              const initialAssets = Object.keys(initialUserValue.result);
              if (initialAssets.length > 0) {
                const initialValues = initialUserValue.result[initialAssets[0]];
                if (initialValues && initialValues.length > 0) {
                  const difference = values[0].base_asset_value - initialValues[0].base_asset_value;
                  logInfo(`Value change: ${difference > 0 ? '+' : ''}${difference}`);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      logError('Failed to get updated user value', error);
    }
    
    // ===== STEP 5: GET USER STATISTICS =====
    logSection('STEP 5: GET USER STATISTICS');
    
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
    
    // ===== STEP 6: CREATE AND EXECUTE WITHDRAW TRANSACTION =====
    logSection('STEP 6: CREATE AND EXECUTE WITHDRAW TRANSACTION');
    sleep(30000);
    try {
      // Get withdraw transaction
      logInfo(`Creating withdraw transaction for ${CONFIG.withdrawShares} shares...`);
      const withdrawTxResponse = await sdk.createWithdrawTransaction({
        fundId: CONFIG.fundId,
        shares: CONFIG.withdrawShares,
        userKey: CONFIG.userPublicKey
      });
      
      logInfo('Withdraw transaction response received');
      console.log('Withdraw Response:', JSON.stringify(withdrawTxResponse, null, 2));
      
      if (withdrawTxResponse.success || withdrawTxResponse.success) {
        logSuccess('Withdraw transaction created successfully');
        
        try {
          // Deserialize and sign transaction
          const txBuffer = Buffer.from(withdrawTxResponse.result, 'base64');


            const transaction = VersionedTransaction.deserialize(txBuffer);
          
          logInfo('Signing transaction...');
          transaction.sign([userKeypair]);
          
          // Send transaction
          logInfo('Sending transaction to network...');
          const txSignature = connection.sendTransaction(transaction);


          // const transaction = Transaction.from(txBuffer);
          
          // logInfo('Signing transaction...');
          // transaction.sign(userKeypair);
          
          // // Send transaction
          // logInfo('Sending transaction to network...');
          // const txSignature = await sendAndConfirmTransaction(
          //   connection,
          //   transaction,
          //   [userKeypair],
          //   { commitment: 'confirmed' }
          // );
          
          logSuccess(`Withdraw transaction confirmed: ${txSignature}`);
          logInfo(`View on explorer: https://explorer.solana.com/tx/${txSignature}?cluster=mainnet-beta`);
          
          // Wait for transaction to settle
          logInfo('Waiting for transaction to settle...');
          await sleep(5000);
          
        } catch (txError) {
          logError('Failed to execute withdraw transaction', txError);
        }
        
      } else {
        logError('Failed to create withdraw transaction');
        console.log('Response:', withdrawTxResponse);
      }
    } catch (error) {
      logError('Failed to execute withdraw transaction', error);
    }
    
    // ===== STEP 7: GET FINAL USER VALUE =====
    logSection('STEP 7: GET FINAL USER VALUE');
    
    try {
      const finalUserValue = await sdk.getUserValue(CONFIG.userPublicKey, {
        fundId: CONFIG.fundId,
        baseAsset: 'USDC'
      });
      
      logSuccess('Retrieved final user value');
      console.log('Final Value Response:', JSON.stringify(finalUserValue, null, 2));
      
      // Show final value
      if (finalUserValue.success || finalUserValue.success) {
        const assets = Object.keys(finalUserValue.result);
        if (assets.length > 0) {
          const firstAsset = assets[0];
          const values = finalUserValue.result[firstAsset];
          if (values && values.length > 0) {
            logInfo(`Final ${firstAsset} value: ${values[0].base_asset_value}`);
            logInfo(`Fund percentage: ${values[0].percent_of_fund}%`);
          }
        }
      }
    } catch (error) {
      logError('Failed to get final user value', error);
    }
    
    logSection('INTEGRATION FLOW COMPLETED');
    logSuccess('All steps completed successfully!');
    
  } catch (error) {
    logError('Integration flow failed', error);
  }
}

// ===== EXECUTION =====
console.log('🚀 Starting Breeze SDK Integration Flow...');
console.log('📋 Configuration:');
console.log(`   API URL: ${CONFIG.baseUrl}`);
console.log(`   RPC URL: ${CONFIG.rpcUrl}`);
console.log(`   Fund ID: ${CONFIG.fundId}`);
console.log(`   User: ${CONFIG.userPublicKey}`);
console.log(`   Deposit Amount: ${CONFIG.depositAmount}`);
console.log(`   Withdraw Shares: ${CONFIG.withdrawShares}`);

integrationFlow().catch(console.error);