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
    // Get user yield data (NEW METHOD)
    const userYield = await sdk.getUserYield({
      userId: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY',
      fundId: '8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwWV', // Optional filter
      page: 1,
      limit: 10
    });
    console.log('User yield:', userYield);
    
    // Get user balances (NEW METHOD)
    const userBalances = await sdk.getUserBalances({
      userId: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY',
      asset: 'USDC', // Optional filter
      sortBy: 'balance',
      sortOrder: 'desc',
      page: 1, // Optional pagination
      limit: 10 // Optional pagination
    });
    console.log('User balances:', userBalances);

    // Create a deposit transaction (required: fundId, amount, userKey)
    const depositTx = await sdk.createDepositTransaction({
      fundId: '8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwWV', // Required
      amount: 100, // Required
      userKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY', // Required
      all: false // Optional: whether to deposit all available funds
    });
    console.log('Deposit transaction:', depositTx);

    // Create a withdraw transaction (required: fundId, amount, userKey)
    const withdrawTx = await sdk.createWithdrawTransaction({
      fundId: '8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwWV', // Required
      amount: 50, // Required
      userKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY', // Required
      all: false // Optional: whether to withdraw all amount
    });
    console.log('Withdraw transaction:', withdrawTx);

    // Get deposit instructions (returns deposit_instruction)
    const depositInstructions = await sdk.getDepositInstructions({
      fundId: '8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwWV',
      amount: 100,
      userKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY'
    });
    console.log('Deposit instructions:', depositInstructions);
    console.log('Has deposit instructions:', !!depositInstructions.deposit_instruction);

    // Get withdraw instruction (returns lut_address and withdraw_instruction)
    const withdrawInstruction = await sdk.getWithdrawInstruction({
      fundId: '8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwWV',
      amount: 50,
      userKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY'
    });
    console.log('Withdraw instruction:', withdrawInstruction.withdraw_instruction);
    console.log('Lookup table address:', withdrawInstruction.lut_address);

  } catch (error) {
    console.error('API Error:', error);
  }
}

// Run the example
exampleUsage();