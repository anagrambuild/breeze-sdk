// Test configuration for integration tests
export const TEST_CONFIG = {
  baseUrl: 'https://api.breeze.baby/',
  apiKey: 'api_key_here',
  timeout: 10000,
  
  // Test data
  testUserId: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY',
  testFundId: '8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwWV',
  testBaseAsset: 'USDC',
  testAmount: 100,
  testPayerKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY',
  testUserKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY',
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
          'x-api-key': TEST_CONFIG.apiKey
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