# Breeze SDK

A comprehensive TypeScript SDK for interacting with the Breeze API, providing a clean interface for fund management, user operations, and transaction handling.

## Installation

```bash
npm install breeze-sdk
```

## Quick Start

```typescript
import { BreezeSDK } from 'breeze-sdk';

// Initialize the SDK
const sdk = new BreezeSDK({
  baseUrl: 'https://https://api.breeze.baby/', // Your API base URL
  apiKey: 'your-api-key-here',
  timeout: 30000 // Optional: request timeout in milliseconds (default: 30000)
});

// Get fund information
const fundData = await sdk.getFund('DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW');
console.log('Fund data:', fundData);
```

## API Reference

### BreezeSDK Class

The main SDK class that provides a convenient interface to all API endpoints.

#### Constructor

```typescript
new BreezeSDK(config: BreezeSDKConfig)
```

**BreezeSDKConfig:**
- `apiKey: string` - Your API authentication key (required)
- `baseUrl?: string` - Base URL for the API (default: 'https://api.breeze.baby/')
- `timeout?: number` - Request timeout in milliseconds (default: 30000)

#### Methods

##### Fund Operations

**`getFund(fundId: string)`**
Get detailed information about a specific fund including allocations, constraints, and current values.

```typescript
const fund = await sdk.getFund('DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW');
// Returns fund data with fund_index, lut_address, allocations, etc.
```

##### User Operations

**`getUserInfo(userId: string)`**
Get user information and fund association.

```typescript
const userInfo = await sdk.getUserInfo('user_123');
```

**`getUserFunds(userId: string)`**
Get all funds associated with a user.

```typescript
const userFunds = await sdk.getUserFunds('user_123');
```

**`getUserValue(userId: string)`**
Get the current value of user's fund holdings.

```typescript
const userValue = await sdk.getUserValue('user_123');
```

**`getUserStats(userId: string, startDate: string, endDate: string)`**
Get user statistics for a specified date range.

```typescript
const stats = await sdk.getUserStats(
  'user_123',
  '2025-01-01T00:00:00.000Z',
  '2025-01-31T23:59:59.999Z'
);
```

##### Transaction Operations

**`createDepositTransaction(options)`**
Create a deposit transaction with flexible parameters.

```typescript
const depositTx = await sdk.createDepositTransaction({
  fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
  amount: 100,
  userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh',
  payerKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // Optional
  all: false // Optional: whether to deposit all available funds
});
```

**`createWithdrawTransaction(options)`**
Create a withdraw transaction with flexible parameters.

```typescript
const withdrawTx = await sdk.createWithdrawTransaction({
  fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
  amount: 50, // Note: uses 'amount' not 'amount'
  userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh',
  payerKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // Optional
  all: false // Optional: whether to withdraw all amount
});
```

**`getDepositInstructions(options)`**
Get Solana transaction instructions for deposits (for advanced users).

```typescript
const depositIx = await sdk.getDepositInstructions({
  fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
  amount: 100,
  userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
});
// Returns detailed Solana instruction data
```

**`getWithdrawInstructions(options)`**
Get Solana transaction instructions for withdrawals (for advanced users).

```typescript
const withdrawIx = await sdk.getWithdrawInstructions({
  fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
  amount: 50,
  userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
});
// Returns detailed Solana instruction data with lookup table address
```

**`createUserFundTransaction(fundId: string, userKey: string)`**
Create a transaction to associate a user with a fund.

```typescript
const userFundTx = await sdk.createUserFundTransaction(
  'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
  '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
);
```

##### Utility Methods

**`updateApiKey(newApiKey: string)`**
Update the API key used for authentication.

```typescript
sdk.updateApiKey('new-api-key');
```

**`getApiClient()`**
Get the underlying ApiClient instance for advanced usage.

```typescript
const apiClient = sdk.getApiClient();
```

## Complete Example

```typescript
import { BreezeSDK } from 'breeze-sdk';

async function example() {
  const sdk = new BreezeSDK({
    baseUrl: 'https://api.breeze.baby/',
    apiKey: 'userkey_0000'
  });

  try {
    // 1. Get fund information
    const fund = await sdk.getFund('DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW');
    console.log('Fund:', fund.result.fund_id, fund.result.base_asset);

    // 2. Create user fund association
    const userFund = await sdk.createUserFundTransaction(
      'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
    );
    console.log('User fund created:', userFund.success);

    // 3. Create deposit transaction
    const deposit = await sdk.createDepositTransaction({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      amount: 100,
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
    });
    console.log('Deposit transaction:', deposit.result);

    // 4. Get deposit instructions (for manual transaction building)
    const instructions = await sdk.getDepositInstructions({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      amount: 100,
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
    });
    console.log('Instruction accounts:', instructions.result.deposit_instruction.accounts.length);

  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

## Low-Level API

For advanced use cases, you can use the individual functions and ApiClient directly:

```typescript
import { 
  ApiClient, 
  getFund, 
  createUserFund,
  getInstructionsForDeposit 
} from 'breeze-sdk';

const apiClient = new ApiClient('https://api.breeze.baby/');
const fundData = await getFund(apiClient, 'fund_123', 'api_key');
```

## Error Handling

The SDK uses custom error types for better error handling:

```typescript
import { BreezeApiError } from 'breeze-sdk';

try {
  const fund = await sdk.getFund('invalid_fund_id');
} catch (error) {
  if (error instanceof BreezeApiError) {
    console.error('API Error:', error.message);
    console.error('Status:', error.status);
    console.error('Code:', error.code);
    console.error('Response:', error.response);
  }
}
```

### Error Types

- **BreezeApiError**: Thrown for API-related errors
  - `message: string` - Error message
  - `status?: number` - HTTP status code  
  - `code?: string` - Error code ('TIMEOUT', 'NETWORK_ERROR', etc.)
  - `response?: any` - Full error response from the API

## TypeScript Support

The SDK is written in TypeScript and provides full type definitions:

```typescript
import { 
  FundData, 
  UserInfo, 
  TransactionForDeposit,
  InstructionsForDeposit,
  CreateUserFundResponse 
} from 'breeze-sdk';

// All API responses are properly typed
const fund: FundData = await sdk.getFund('fund_123');
const instructions: InstructionsForDeposit = await sdk.getDepositInstructions({
  fundId: 'fund_123',
  userKey: 'user_key'
});
```

## Testing

### Integration Tests
Run integration tests against your real API server:

1. First, ensure your Rust API server is running on `localhost:8080` or you are using default base url
2. Update the test configuration in all tests with valid IDs
3. Run the tests:

### Quick Testing
Test individual endpoints:
```bash
cd packages/sdk

# Test deposit actions  
node test_deposit_actions.js

# Test withdraw actions  
node test_withdraw_actions.js

# Test GET endpoints
node test_other_get_reqs.js
```



## API Endpoints

The SDK interacts with these API endpoints:

### GET Endpoints
- `GET /user-yield/{user_id}` - User yield data retrieval
- `GET /user-balances/{user_id}` - User balance information 

### POST Endpoints  
- `POST /deposit/tx` - Create deposit transaction
- `POST /withdraw/tx` - Create withdraw transaction
- `POST /deposit/ix` - Get deposit instructions
- `POST /withdraw/ix` - Get withdraw instructions

## Development

### Building

```bash
npm run build
```
