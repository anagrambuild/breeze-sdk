# Breeze SDK

A comprehensive TypeScript SDK for interacting with the Breeze API, providing a clean interface for fund management, user operations, and transaction handling.

## Installation

```bash
npm install sdk-brreeezze
```

## Quick Start

```typescript
import { BreezeSDK } from 'sdk-brreeezze';

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

**`getFundsForBaseAsset(baseAsset: string)`**
Get all funds that support a specific base asset.

```typescript
const funds = await sdk.getFundsForBaseAsset('USDC');
// Returns array of funds supporting USDC
```

##### User Operations

**`getUserInfo(userId: string)`**
Get user information and fund association.

```typescript
const userInfo = await sdk.getUserInfo('4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh');
// Returns user fund associations and shares
```

**`getUserValue(userId: string, options?)`**
Get the current value of user's fund holdings with optional query parameters.

```typescript
// Basic usage
const userValue = await sdk.getUserValue('4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh');

// With query parameters
const userValue = await sdk.getUserValue('4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', {
  fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
  baseAsset: 'USDC',
  fiatValue: 'USD'
});
// Returns: { success: true, result: { "USDC": [{ fund_id, base_asset_value, percent_of_fund, total_fund_value }] } }
```

**`getUserStats(userId: string, start: string, end: string, options?)`**
Get user statistics for a specified date range with optional query parameters.

```typescript
// Basic usage
const stats = await sdk.getUserStats(
  '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh',
  '2025-01-01T00:00:00.000Z',
  '2025-01-31T23:59:59.999Z'
);

// With query parameters
const stats = await sdk.getUserStats(
  '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh',
  '2025-01-01T00:00:00.000Z',
  '2025-01-31T23:59:59.999Z',
  {
    fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
    baseAsset: 'USDC',
    fiatValue: 'USD'
  }
);
// Returns time series data with yield percentages and values
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
// Returns fund performance data with time series and metadata
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
// Returns base64 encoded transaction ready for signing
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
// Returns base64 encoded transaction ready for signing
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
// Returns: { success: true, result: { deposit_instruction: [{ program_id, accounts, data }] } }
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
// Returns: { success: true, result: { lut_address: "...", withdraw_instruction: { program_id, accounts, data } } }
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
import { BreezeSDK } from 'sdk-brreeezze';

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
    console.log('Instruction count:', instructions.result.deposit_instruction.length);

  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

## Transaction Signing and Execution

For executing transactions on Solana, you'll need to sign and send them:

```typescript
import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';
import bs58 from 'bs58';

// Create connection and keypair
const connection = new Connection('https://api.mainnet-beta.solana.com');
const userKeypair = Keypair.fromSecretKey(bs58.decode('your-private-key'));

// Create transaction
const depositTx = await sdk.createDepositTransaction({
  fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
  amount: 100,
  userKey: userKeypair.publicKey.toString()
});

// Sign and send transaction
const txBuffer = Buffer.from(depositTx.result, 'base64');
const transaction = VersionedTransaction.deserialize(txBuffer);
transaction.sign([userKeypair]);

const signature = await connection.sendTransaction(transaction);
console.log('Transaction signature:', signature);
```

## Low-Level API

For advanced use cases, you can use the individual functions and ApiClient directly:

```typescript
import { 
  ApiClient, 
  getFund, 
  getInstructionsForDeposit,
  getTransactionForDeposit
} from 'sdk-brreeezze';

const apiClient = new ApiClient('http://localhost:8080/');
const fundData = await getFund(apiClient, 'fund_123', 'api_key');
```

## Error Handling

The SDK uses custom error types for better error handling:

```typescript
import { BreezeApiError } from 'sdk-brreeezze';

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

### Server Response Handling

The SDK handles server response variations including typos:

```typescript
// The SDK automatically handles both "success" and "sucess" (server typo)
if (response.success || response.sucess) {
  // Handle successful response
}
```

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
} from 'sdk-brreeezze';

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

```bash
npm run test:integration
```

### Example Scripts
Test the SDK with example scripts:

```bash
# Basic usage example
npm run example:basic

# Full integration flow with transaction execution
npm run example:integration

# Simple API demonstration (no transaction execution)
npx tsx examples/integration-flow-simple.ts
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

### Example Usage

The SDK includes comprehensive examples in the `examples/` directory:

1. **`basic-usage.ts`** - Simple SDK initialization and basic method calls
2. **`integration-flow.ts`** - Complete transaction flow with Solana execution
3. **`integration-flow-simple.ts`** - API demonstration without transaction execution

### Project Structure

```
src/
├── breeze-sdk.ts              # Main SDK class
├── builder.ts                 # ApiClient and error handling
├── index.ts                   # Main exports
├── getFund/                   # Fund-related operations
├── getUserInfo/               # User info operations
├── getUserStats/              # User statistics
├── getUserValue/              # User value operations  
├── getFundsForBaseAsset/      # Base asset fund operations
├── getPartnerFundStats/       # Partner statistics
├── transactionForDeposit/     # Deposit transactions
├── transactionForWithdraw/    # Withdraw transactions
├── instructionsForDeposit/    # Deposit instructions
└── instructionsForWithdraw/   # Withdraw instructions
```

## Key Features

- ✅ **Complete API Coverage**: All fund, user, and transaction operations
- ✅ **TypeScript Support**: Full type definitions and IntelliSense
- ✅ **Error Handling**: Custom error types with detailed information
- ✅ **Query Parameters**: Support for filtering and customization
- ✅ **Solana Integration**: Ready for transaction signing and execution
- ✅ **Comprehensive Examples**: Real-world usage patterns
- ✅ **Integration Tests**: Test against live API servers
- ✅ **Flexible Configuration**: Customizable base URL, timeout, and API keys