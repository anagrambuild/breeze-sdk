#!/usr/bin/env npx ts-node

/**
 * Quick API Test Script
 * 
 * This script can be used to quickly test your API endpoints
 * Run with: npx ts-node examples/test-api.ts
 */

import { BreezeSDK, BreezeApiError } from '../src';

async function testAPI() {
  console.log('🚀 Testing Breeze SDK with real API calls...\n');

  // Configuration - update these with your actual values
  const config = {
    baseUrl: 'http://localhost:8080/',
    apiKey: 'userkey_0000', // Update with your real API key
    timeout: 10000
  };

  const sdk = new BreezeSDK(config);

  try {
    // Test 1: Get Fund Data
    console.log('📊 Testing getFund...');
    const fundResult = await sdk.getFund('DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW'); // Replace with real fund ID
    console.log('✅ Fund data:', JSON.stringify(fundResult, null, 2));
    console.log('');

    // Test 2: Get User Funds
    console.log('👤 Testing getUserFunds...');
    const userResult = await sdk.getUserFunds('4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'); // Replace with real user ID
    console.log('✅ User funds:', JSON.stringify(userResult, null, 2));
    console.log('');

    // Test 3: Create User Fund Transaction (do this first to associate user with fund)
    console.log('👥 Testing create user fund transaction...');
    const userFundResult = await sdk.createUserFundTransaction(
      'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW', // Replace with real fund ID
      '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'  // Replace with real user key
    );
    console.log('✅ User fund transaction:', JSON.stringify(userFundResult, null, 2));
    console.log('');

    // Test 4: Create Deposit Transaction
    console.log('💰 Testing deposit transaction...');
    const depositResult = await sdk.createDepositTransaction({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW', // Replace with real fund ID
      amount: 10,
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // Replace with real user key
      all: false,
    });
    console.log('✅ Deposit transaction:', JSON.stringify(depositResult, null, 2));
    console.log('');

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    if (error instanceof BreezeApiError) {
      console.error('❌ API Error:');
      console.error('  Message:', error.message);
      console.error('  Status:', error.status);
      console.error('  Code:', error.code);
      console.error('  Response:', error.response);
    } else {
      console.error('❌ Unexpected error:', error);
    }
    
    console.log('\n💡 Tips for fixing errors:');
    console.log('  - Make sure your API server is running on localhost:8080');
    console.log('  - Update the config with valid API keys and IDs');
    console.log('  - Check your network connection');
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testAPI();
}

export { testAPI };