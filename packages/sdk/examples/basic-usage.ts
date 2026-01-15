import { BreezeSDK } from '../src';

// Example usage of the Breeze SDK
async function exampleUsage() {
  // Initialize the SDK
  const sdk = new BreezeSDK({
    baseUrl: 'https://api.breeze.baby/', // Your API base URL
    apiKey: 'apy_key_here', // Use actual test API key
    timeout: 30000 // Optional: request timeout in milliseconds
  });

  try {
    // Get strategy information
    const strategyInfo = await sdk.getStrategyInfo('your-strategy-id');
    console.log('\n=== Strategy Info ===');
    console.log('Strategy:', strategyInfo.strategy_name);
    console.log('Overall APY:', strategyInfo.apy);
    console.log('Supported assets:', strategyInfo.assets.length);
    console.log('APY per asset:', strategyInfo.apy_per_asset);

    // Get user yield data
    const userYield = await sdk.getUserYield({
      userId: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY',
      page: 1,
      limit: 10
    });
    console.log('\n=== User Yield ===');
    console.log('User yield:', userYield);

    // Get user balances
    const userBalances = await sdk.getUserBalances({
      userId: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY',
      asset: 'USDC', // Optional filter
      sortBy: 'balance',
      sortOrder: 'desc',
      page: 1, // Optional pagination
      limit: 10 // Optional pagination
    });
    console.log('\n=== User Balances ===');
    console.log('User balances:', userBalances);

    // Get breeze balances with strategy details
    const breezeBalances = await sdk.getBreezeBalances({
      userId: 'your-user-id',
      strategyId: 'your-strategy-id', // Required
      asset: 'USDC', // Optional filter
      sortBy: 'balance',
      sortOrder: 'desc',
      page: 1,
      limit: 10
    });
    console.log('\n=== Breeze Balances (Strategy-specific) ===');
    console.log('Breeze balances:', breezeBalances);
    console.log('Number of balance records:', breezeBalances.data.length);
    if (breezeBalances.data.length > 0) {
      console.log('First balance:');
      const balance = breezeBalances.data[0];
      console.log(`  Token: ${balance.token_symbol} (${balance.token_name})`);
      console.log(`  Position Value: ${balance.total_position_value}`);
      console.log(`  Deposited Value: ${balance.total_deposited_value}`);
      console.log(`  Yield Earned: ${balance.yield_earned}`);
      console.log(`  APY: ${balance.apy}%`);
      console.log(`  Last Updated: ${balance.last_updated}`);
    }

    // Create a deposit transaction (required: strategyId, baseAsset, amount, userKey)
    const depositTx = await sdk.createDepositTransaction({
      strategyId: 'your-strategy-id', // Required
      baseAsset: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // Required - token mint address (e.g., USDC)
      amount: 100, // Required
      userKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY', // Required
      all: false // Optional: whether to deposit all available funds
    });
    console.log('Deposit transaction:', depositTx);

    // Create a withdraw transaction (required: strategyId, baseAsset, amount, userKey)
    const withdrawTx = await sdk.createWithdrawTransaction({
      strategyId: 'your-strategy-id', // Required
      baseAsset: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // Required - token mint address (e.g., USDC)
      amount: 50, // Required
      userKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY', // Required
      all: false // Optional: whether to withdraw all amount
    });
    console.log('Withdraw transaction:', withdrawTx);

    // Get deposit instructions (returns deposit_instructions)
    const depositInstructions = await sdk.getDepositInstructions({
      strategyId: 'your-strategy-id',
      baseAsset: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // token mint address
      amount: 100,
      userKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY'
    });
    console.log('Deposit instructions:', depositInstructions);
    console.log('Has deposit instructions:', !!depositInstructions.deposit_instructions);

    // Get withdraw instruction (returns lut_address and withdraw_instructions)
    const withdrawInstruction = await sdk.getWithdrawInstruction({
      strategyId: 'your-strategy-id',
      baseAsset: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // token mint address
      amount: 50,
      userKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY'
    });
    console.log('Withdraw instruction:', withdrawInstruction.withdraw_instructions);
    console.log('Lookup table address:', withdrawInstruction.lookup_table);

  } catch (error) {
    console.error('API Error:', error);
  }
}

// Run the example
exampleUsage();