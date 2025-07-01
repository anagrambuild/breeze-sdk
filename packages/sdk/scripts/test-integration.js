#!/usr/bin/env node

/**
 * Integration Test Runner
 * 
 * This script helps run integration tests against your real API.
 * Before running, make sure:
 * 1. Your Rust API server is running on localhost:8080
 * 2. Update the test configuration in tests/integration.test.ts with valid IDs
 */

const { spawn } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Breeze SDK Integration Test Runner');
console.log('=====================================');
console.log('');
console.log('Before running integration tests, please ensure:');
console.log('1. ✅ Your Rust API server is running on localhost:8080');
console.log('2. ✅ You have updated the TEST_CONFIG in tests/integration.test.ts with valid IDs');
console.log('3. ✅ Your API key (userkey_0000) is valid');
console.log('');

rl.question('Are you ready to run the integration tests? (y/N): ', (answer) => {
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    console.log('');
    console.log('🧪 Running integration tests...');
    console.log('');
    
    const testProcess = spawn('npm', ['run', 'test:integration'], {
      stdio: 'inherit',
      shell: true
    });
    
    testProcess.on('close', (code) => {
      console.log('');
      if (code === 0) {
        console.log('✅ Integration tests completed successfully!');
      } else {
        console.log('❌ Integration tests failed. Check the output above for details.');
        console.log('');
        console.log('Common issues:');
        console.log('- API server not running on localhost:8080');
        console.log('- Invalid test configuration (fund IDs, user IDs, API keys)');
        console.log('- Network connectivity issues');
      }
      rl.close();
    });
    
    testProcess.on('error', (err) => {
      console.error('❌ Failed to run tests:', err.message);
      rl.close();
    });
  } else {
    console.log('');
    console.log('📝 To run integration tests manually:');
    console.log('   npm run test:integration');
    console.log('');
    console.log('📝 To run only unit tests:');
    console.log('   npm run test:unit');
    console.log('');
    rl.close();
  }
});