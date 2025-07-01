import { BreezeSDK } from '../src';

// Example usage of the Breeze SDK
async function exampleUsage() {
  // Initialize the SDK
  const sdk = new BreezeSDK({
    baseUrl: 'http://localhost:8080/', // Your API base URL
    apiKey: 'your-api-key-here',
    timeout: 30000 // Optional: request timeout in milliseconds
  });

  try {
    // Get fund information
    const fundData = await sdk.getFund('fund_12855430823');
    console.log('Fund data:', fundData);

    // Get user information
    const userInfo = await sdk.getUserInfo('user_2316565914');
    console.log('User info:', userInfo);

    // Get user's funds
    const userFunds = await sdk.getUserFunds('user_2316565914');
    console.log('User funds:', userFunds);

    // Create a deposit transaction
    const depositTx = await sdk.createDepositTransaction({
      fundId: 'fund_12855430823', // fund ID
      amount: 100, // amount
      userKey: 'user_wallet_public_key', // user's wallet public key
      all: false // all: whether to deposit all available funds
    });
    console.log('Deposit transaction:', depositTx);

    // Create a withdraw transaction
    const withdrawTx = await sdk.createWithdrawTransaction({
      fundId: 'fund_12855430823', // fund ID
      shares: 50, // amount
      userKey: 'user_wallet_public_key', // user's wallet public key
      all: false // all: whether to withdraw all shares
    });
    console.log('Withdraw transaction:', withdrawTx);

    // Create a user fund transaction
    const userFundTx = await sdk.createUserFundTransaction(
      'fund_12855430823', // fund ID
      'user_wallet_public_key' // user's wallet public key
    );
    console.log('User fund transaction:', userFundTx);

    // Get user statistics for a date range
    const userStats = await sdk.getUserStats(
      'user_2316565914',
      '2025-01-01T00:00:00.000Z', // start date
      '2025-01-31T23:59:59.999Z'  // end date
    );
    console.log('User stats:', userStats);

  } catch (error) {
    console.error('API Error:', error);
  }
}

// Run the example
exampleUsage();