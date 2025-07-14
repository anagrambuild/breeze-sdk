// Test configuration for integration tests
export const TEST_CONFIG = {
  baseUrl: 'http://localhost:8080/',
  apiKey: 'userkey_0000',
  timeout: 10000,
  
  // Test data
  testUserId: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh',
  testFundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
  testOrganizationId: 'org_2z9UJxhyNmCvOpHScFKyBZrqEdy',
  testBaseAsset: 'USDC',
  testAmount: 100,
  testShares: 100,
  testPayerKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh',
  testUserKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh',
  testStartDate: '2025-07-11T15:34:39.406Z',
  testEndDate: '2025-07-13T19:34:39.406Z'
};

// Helper function to wait for server
export const waitForServer = async (baseUrl: string, timeout: number = 30000): Promise<void> => {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    try {
      // Try to connect to the server - any response (including 404) means server is running
      const response = await fetch(`${baseUrl}/`, { 
        method: 'GET',
        headers: {
          'api-key': TEST_CONFIG.apiKey
        }
      });
      // If we get any response, the server is running
      if (response.status >= 200 && response.status < 600) {
        console.log(`✅ Server is responding at ${baseUrl}`);
        return;
      }
    } catch (error) {
      // Server not ready yet
      console.log(`⏳ Waiting for server at ${baseUrl}...`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  throw new Error(`Server at ${baseUrl} not ready within ${timeout}ms`);
};