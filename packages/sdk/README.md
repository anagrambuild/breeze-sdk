# Breeze SDK

A comprehensive TypeScript SDK for interacting with the Breeze API, providing a clean interface for fund management, user operations, and transaction handling.

## Installation

```bash
npm install sdk-breeeze
```

## Quick Start

```typescript
import { BreezeSDK } from 'sdk-breeeze';

// Initialize the SDK
const sdk = new BreezeSDK({
  baseUrl: 'http://localhost:8080/', // Your API base URL
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
- `baseUrl?: string` - Base URL for the API (default: 'http://localhost:8080/')
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

**`getFundsForBaseAsset(baseAsset: string)`**
Get all funds that support a specific base asset.

```typescript
const funds = await sdk.getFundsForBaseAsset('USDC');
```

**`getUserValue(userId: string, options?)`**
Get the current value of user's fund holdings with optional query parameters.

```typescript
// Basic usage
const userValue = await sdk.getUserValue('user_123');

// With query parameters
const userValue = await sdk.getUserValue('user_123', {
  fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
  baseAsset: 'USDC',
  fiatValue: 'USD'
});
```

**`getUserStats(userId: string, start: string, end: string, options?)`**
Get user statistics for a specified date range with optional query parameters.

```typescript
// Basic usage
const stats = await sdk.getUserStats(
  'user_123',
  '2025-01-01T00:00:00.000Z',
  '2025-01-31T23:59:59.999Z'
);

// With query parameters
const stats = await sdk.getUserStats(
  'user_123',
  '2025-01-01T00:00:00.000Z',
  '2025-01-31T23:59:59.999Z',
  {
    fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
    baseAsset: 'USDC',
    fiatValue: 'USD'
  }
);
```

##### Partner Operations

**`getPartnerFundStats(organizationId: string, start: string, end: string, options?)`**
Get partner fund statistics for a specified date range.

```typescript
const partnerStats = await sdk.getPartnerFundStats(
  'org_2z9UJxhyNmCvOpHScFKyBZrqEdy',
  '2025-01-01T00:00:00.000Z',
  '2025-01-31T23:59:59.999Z',
  {
    baseAsset: 'USDC',
    fiatValue: 'USD'
  }
);
```

##### Transaction Operations

**`createDepositTransaction(options)`**
Create a deposit transaction. **Required parameters**: `fundId`, `amount`, `userKey`.

```typescript
const depositTx = await sdk.createDepositTransaction({
  fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW', // Required
  amount: 100, // Required
  userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // Required
  payerKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // Optional
  all: false // Optional: whether to deposit all available funds
});
```

**`createWithdrawTransaction(options)`**
Create a withdraw transaction. **Required parameters**: `fundId`, `shares`, `userKey`.

```typescript
const withdrawTx = await sdk.createWithdrawTransaction({
  fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW', // Required
  shares: 50, // Required - uses 'shares' not 'amount'
  userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // Required
  payerKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // Optional
  all: false // Optional: whether to withdraw all shares
});
```

**`getDepositInstructions(options)`**
Get Solana transaction instructions for deposits. **Required parameters**: `fundId`, `amount`, `userKey`. Returns an array of instructions.

```typescript
const depositIx = await sdk.getDepositInstructions({
  fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW', // Required
  amount: 100, // Required
  userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // Required
  payerKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // Optional
  all: false // Optional
});
// Returns: { success: true, result: { deposit_instruction: [...] } }
```

**`getWithdrawInstruction(options)`**
Get Solana transaction instruction for withdrawals. **Required parameters**: `fundId`, `shares`, `userKey`. Returns a single instruction with lookup table address.

```typescript
const withdrawIx = await sdk.getWithdrawInstruction({
  fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW', // Required
  shares: 50, // Required
  userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // Required
  payerKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // Optional
  all: false // Optional
});
// Returns: { success: true, result: { lut_address: "...", withdraw_instruction: {...} } }
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
import { BreezeSDK } from 'sdk-breeeze';

async function example() {
  const sdk = new BreezeSDK({
    baseUrl: 'http://localhost:8080/',
    apiKey: 'userkey_0000'
  });

  try {
    // 1. Get fund information
    const fund = await sdk.getFund('DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW');
    console.log('Fund:', fund.result.fund_id, fund.result.base_asset);

    // 2. Create deposit transaction
    const deposit = await sdk.createDepositTransaction({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      amount: 100,
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
    });
    console.log('Deposit transaction:', deposit.result);

    // 3. Get deposit instructions (for manual transaction building)
    const instructions = await sdk.getDepositInstructions({
      fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
      amount: 100,
      userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh'
    });
    console.log('Instruction accounts:', instructions.result.deposit_instruction[0].accounts.length);

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
  getInstructionsForDeposit,
  getTransactionForDeposit
} from 'sdk-breeeze';

const apiClient = new ApiClient('http://localhost:8080/');
const fundData = await getFund(apiClient, 'fund_123', 'api_key');
```

## Error Handling

The SDK uses custom error types for better error handling:

```typescript
import { BreezeApiError } from 'sdk-breeeze';

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
  UserValueInfo,
  PartnerFundStatsInfo
} from 'sdk-breeeze';

// All API responses are properly typed
const fund: FundData = await sdk.getFund('fund_123');
const instructions: InstructionsForDeposit = await sdk.getDepositInstructions({
  fundId: 'fund_123',
  amount: 100,
  userKey: 'user_key'
});
```

## Testing

### Integration Tests
Run integration tests against your real API server:

1. First, ensure your Rust API server is running on `localhost:8080`
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
- `GET /getfund/{fund_id}` - Get fund information
- `GET /user/{user_id}` - Get user information  
- `GET /uservalue/{user_id}` - Get user value (supports query params)
- `GET /userstats/{user_id}?start=...&end=...` - Get user statistics (supports query params)
- `GET /fund/{base_asset}` - Get funds for base asset
- `GET /partner/{organization_id}/stats?start=...&end=...` - Get partner fund statistics

### POST Endpoints  
- `POST /deposit/tx` - Create deposit transaction (requires fundId, amount, userKey)
- `POST /withdraw/tx` - Create withdraw transaction (requires fundId, shares, userKey)
- `POST /deposit/ix` - Get deposit instructions (requires fundId, amount, userKey, returns array)
- `POST /withdraw/ix` - Get withdraw instruction (requires fundId, shares, userKey, returns single instruction)

## Development

### Building

```bash
npm run build
```

### Project Structure

```
src/
├── breeze-sdk.ts              # Main SDK class
├── builder.ts                 # ApiClient and error handling
├── index.ts                   # Main exports
├── getFund/                   # Fund-related operations
├── getUserInfo/               # User info operations
├── getUserFund/               # User fund operations
├── getUserStats/              # User statistics
├── getUserValue/              # User value operations  
├── transactionForDeposit/     # Deposit transactions
├── transactionForWithdraw/    # Withdraw transactions
├── instructionsForDeposit/    # Deposit instructions
├── instructionsForWithdraw/   # Withdraw instructions
└── createUserFund/            # User fund creation
```
