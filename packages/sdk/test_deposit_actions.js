async function testSDK() {
  const { BreezeSDK } = await import('./dist/index.mjs');
  console.log('🧪 Testing SDK with new API...\n');
  
  const sdk = new BreezeSDK({
    baseUrl: 'http://localhost:8080/',
    apiKey: 'userkey_0000',
    timeout: 10000
  });

  try {
    // Test 1: Create User Fund Transaction
    console.log('1. Testing createUserFund...');
    const userFundResult = await sdk.createUserFundTransaction(
      'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
    );
    console.log('✅ User fund result:', JSON.stringify(userFundResult, null, 2));
    console.log('');

    // Test 2: Create Deposit Transaction (using new API)
    console.log('2. Testing deposit transaction with new API...');
    const depositResult = await sdk.createDepositTransaction({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      amount: 10,
      all: false,
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
    });
    console.log('✅ Deposit result:', JSON.stringify(depositResult, null, 2));
    console.log('');

    // Test 3: Get Deposit Instructions (new endpoint)
    console.log('3. Testing deposit instructions...');
    const depositInstructions = await sdk.getDepositInstructions({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      amount: 10,
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
    });
    console.log('✅ Deposit instructions:', JSON.stringify(depositInstructions, null, 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.status) console.error('Status:', error.status);
    if (error.code) console.error('Code:', error.code);
    if (error.response) console.error('Response:', error.response);
    
    // Additional debugging info
    console.error('\nFull error object:', error);
  }
}


testSDK();