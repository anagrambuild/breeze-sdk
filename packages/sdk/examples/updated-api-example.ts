import { BreezeSDK } from '../src';

async function demonstrateUpdatedAPI() {
  const sdk = new BreezeSDK({
    baseUrl: 'http://localhost:8080/',
    apiKey: 'userkey_0000'
  });

  console.log('🔄 Updated API Examples\n');

  try {
    // Deposit Transaction (updated with new optional parameters)
    console.log('💰 Creating deposit transaction...');
    const depositTx = await sdk.createDepositTransaction({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      amount: 100,
      all: false,
      payerKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // New parameter
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
    });
    console.log('✅ Deposit transaction:', depositTx);
    console.log('');

    // NEW: Deposit Instructions
    console.log('📋 Getting deposit instructions...');
    const depositInstructions = await sdk.getDepositInstructions({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      amount: 100,
      all: false,
      payerKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh',
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
    });
    console.log('✅ Deposit instructions:', depositInstructions);
    console.log('');

    // Withdraw Transaction (updated with new parameters)
    console.log('📤 Creating withdraw transaction...');
    const withdrawTx = await sdk.createWithdrawTransaction({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      shares: 50, // Note: now uses 'shares' instead of 'amount'
      all: false,
      payerKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // New parameter
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
    });
    console.log('✅ Withdraw transaction:', withdrawTx);
    console.log('');

    // NEW: Withdraw Instructions
    console.log('📋 Getting withdraw instructions...');
    const withdrawInstructions = await sdk.getWithdrawInstructions({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      shares: 50,
      all: false,
      payerKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh',
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
    });
    console.log('✅ Withdraw instructions:', withdrawInstructions);
    console.log('');

    // Flexible usage examples
    console.log('🔧 Flexible parameter examples:');
    
    // Only required parameters
    const minimalDeposit = await sdk.createDepositTransaction({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
    });
    console.log('✅ Minimal deposit:', minimalDeposit);

    // Using 'all' parameter
    const withdrawAll = await sdk.createWithdrawTransaction({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      all: true, // Withdraw all shares
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
    });
    console.log('✅ Withdraw all:', withdrawAll);

    console.log('🎉 All examples completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Export for use in other files
export { demonstrateUpdatedAPI };

// Run if executed directly
if (require.main === module) {
  demonstrateUpdatedAPI();
}