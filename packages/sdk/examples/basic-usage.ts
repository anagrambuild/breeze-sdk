import { BreezeSDK } from '../src';

// Example usage of the Breeze SDK
async function exampleUsage() {
  // Initialize the SDK
  const sdk = new BreezeSDK({
    baseUrl: 'http://localhost:8080/', // Your API base URL
    apiKey: 'userkey_0000', // Use actual test API key
    timeout: 30000 // Optional: request timeout in milliseconds
  });

  try {
    // Get fund information
    const fundData = await sdk.getFund('DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW');
    console.log('Fund data:', fundData);

    // Get user information
    const userInfo = await sdk.getUserInfo('4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh');
    console.log('User info:', userInfo);

    // Get funds for a specific base asset
    const funds = await sdk.getFundsForBaseAsset('USDC');
    console.log('USDC funds:', funds);

    // Get user value with query parameters
    const userValue = await sdk.getUserValue('4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', {
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      baseAsset: 'USDC'
    });
    console.log('User value:', userValue);

    // Create a deposit transaction (required: fundId, amount, userKey)
    const depositTx = await sdk.createDepositTransaction({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW', // Required
      amount: 100, // Required
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // Required
      all: false // Optional: whether to deposit all available funds
    });
    console.log('Deposit transaction:', depositTx);

    // Create a withdraw transaction (required: fundId, shares, userKey)
    const withdrawTx = await sdk.createWithdrawTransaction({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW', // Required
      shares: 50, // Required (note: shares, not amount)
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // Required
      all: false // Optional: whether to withdraw all shares
    });
    console.log('Withdraw transaction:', withdrawTx);

    // Get deposit instructions (returns array of instructions)
    const depositInstructions = await sdk.getDepositInstructions({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      amount: 100,
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
    });
    console.log('Deposit instructions:', depositInstructions.result.deposit_instruction.length);

    // Get withdraw instruction (returns single instruction with lut_address)
    const withdrawInstruction = await sdk.getWithdrawInstruction({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      shares: 50,
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
    });
    console.log('Withdraw instruction:', withdrawInstruction.result.withdraw_instruction);
    console.log('Lookup table address:', withdrawInstruction.result.lut_address);

    // Get user statistics for a date range with query parameters
    const userStats = await sdk.getUserStats(
      '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh',
      '2025-07-11T15:34:39.406Z', // start date
      '2025-07-13T19:34:39.406Z', // end date
      {
        fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
        baseAsset: 'USDC'
      }
    );
    console.log('User stats:', userStats);

    // Get partner fund statistics
    const partnerStats = await sdk.getPartnerFundStats(
      'org_2z9UJxhyNmCvOpHScFKyBZrqEdy',
      '2025-07-11T15:34:39.406Z',
      '2025-07-13T19:34:39.406Z',
      {
        baseAsset: 'USDC'
      }
    );
    console.log('Partner stats:', partnerStats);

  } catch (error) {
    console.error('API Error:', error);
  }
}

// Run the example
exampleUsage();