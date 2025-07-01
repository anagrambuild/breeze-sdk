async function testAllGetEndpoints() {
  const { BreezeSDK } = await import('./dist/index.mjs');
  
  console.log('🔍 Testing all GET endpoints...\n');
  
  const sdk = new BreezeSDK({
    baseUrl: 'http://localhost:8080/',
    apiKey: 'userkey_0000',
    timeout: 10000
  });

  // Test data - update these with your real values
  const testData = {
    fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
    userId: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh',
    startDate: '2025-04-29T17:34:39.406Z',
    endDate: '2025-04-29T19:34:39.406Z'
  };

  const tests = [
    {
      name: 'getFund',
      test: () => sdk.getFund(testData.fundId),
      description: 'Get fund information'
    },
    {
      name: 'getUserInfo', 
      test: () => sdk.getUserInfo(testData.userId),
      description: 'Get user information'
    },
    {
      name: 'getUserFunds',
      test: () => sdk.getUserFunds(testData.userId), 
      description: 'Get user funds'
    },
    {
      name: 'getUserValue',
      test: () => sdk.getUserValue(testData.userId),
      description: 'Get user value'
    },
    {
      name: 'getUserStats',
      test: () => sdk.getUserStats(testData.userId, testData.startDate, testData.endDate),
      description: 'Get user statistics'
    }
  ];

  for (const { name, test, description } of tests) {
    try {
      console.log(`📊 Testing ${name} - ${description}...`);
      const result = await test();
      console.log(`✅ ${name} SUCCESS:`, JSON.stringify(result, null, 2));
      console.log('');
    } catch (error) {
      console.error(`❌ ${name} FAILED:`, error.message);
      if (error.status) console.error(`   Status: ${error.status}`);
      if (error.code) console.error(`   Code: ${error.code}`);
      if (error.response) console.error(`   Response:`, error.response);
      console.log('');
    }
  }

  // Also test the endpoints directly with curl to compare
  console.log('🔧 Testing endpoints directly with fetch for comparison...\n');
  
  const directTests = [
    {
      name: 'getFund (direct)',
      url: `http://localhost:8080/getfund/${testData.fundId}`,
      method: 'GET'
    },
    {
      name: 'getUserInfo (direct)', 
      url: `http://localhost:8080/user/${testData.userId}`,
      method: 'GET'
    }
  ];

  for (const { name, url, method } of directTests) {
    try {
      console.log(`🌐 Testing ${name} - ${url}...`);
      const response = await fetch(url, {
        method,
        headers: {
          'api-key': 'userkey_0000',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.error(`❌ ${name} HTTP Error: ${response.status}`);
        continue;
      }
      
      const data = await response.json();
      console.log(`✅ ${name} SUCCESS:`, JSON.stringify(data, null, 2));
      console.log('');
    } catch (error) {
      console.error(`❌ ${name} FAILED:`, error.message);
      console.log('');
    }
  }
}

testAllGetEndpoints();