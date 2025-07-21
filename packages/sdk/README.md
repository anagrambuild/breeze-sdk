# Breeze SDK

A comprehensive TypeScript SDK for interacting with the Breeze API, providing a clean interface for user yield tracking, balance management, and transaction handling.

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

// Get user yield data
const userYield = await sdk.getUserYield({
  userId: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep'
});
console.log('Total yield earned:', userYield.total_yield_earned);
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

##### User Operations

**`getUserYield(options)`**
Get user yield data with pagination and fund filtering.

```typescript
// Basic usage
const userYield = await sdk.getUserYield({
  userId: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep'
});

// With optional parameters
const userYield = await sdk.getUserYield({
  userId: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep',
  fundId: '8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwWV', // Optional filter
  page: 1,      // Optional pagination
  limit: 10     // Optional pagination
});

// Returns:
// {
//   "yields": [
//     {
//       "fund_id": "fund_123",
//       "fund_name": "USDC Yield Fund",
//       "base_asset": "USDC",
//       "position_value": "500.00",
//       "yield_earned": "25.50",
//       "apy": "5.10",
//       "entry_date": "2024-01-15T10:30:00Z",
//       "last_updated": "2024-01-20T14:45:00Z"
//     }
//   ],
//   "pagination": {
//     "page": 1,
//     "limit": 10,
//     "total_items": 1,
//     "total_pages": 1
//   },
//   "total_yield_earned": "25.50"
// }
```

**`getUserBalances(options)`**
Get user balance information with asset filtering and sorting.

```typescript
// Basic usage
const userBalances = await sdk.getUserBalances({
  userId: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep'
});

// With optional parameters
const userBalances = await sdk.getUserBalances({
  userId: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep',
  asset: 'USDC',        // Optional filter
  sortBy: 'balance',    // Optional sorting
  sortOrder: 'desc'     // Optional sort order
});

// Returns:
// {
//   "balances": [
//     {
//       "asset": "USDC",
//       "symbol": "USDC",
//       "wallet_balance": "1000.00",
//       "fund_positions": [
//         {
//           "fund_id": "fund_123",
//           "fund_name": "USDC Yield Fund",
//           "position_value": "500.00",
//           "yield_earned": "25.50",
//           "apy": "5.10"
//         }
//       ],
//       "total_balance": "1525.50",
//       "total_yield": "25.50"
//     }
//   ],
//   "total_portfolio_value": "1525.50",
//   "total_yield_earned": "25.50"
// }
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
Create a withdraw transaction. **Required parameters**: `fundId`, `amount`, `userKey`.

```typescript
const withdrawTx = await sdk.createWithdrawTransaction({
  fundId: '8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwWV', // Required
  amount: 50, // Required
  userKey: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep', // Required
  payerKey: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep', // Optional
  all: false // Optional: whether to withdraw all amount
});
// Returns: { success: true, result: "base64-encoded-transaction" }
```

**`getDepositInstructions(options)`**
Get Solana transaction instructions for deposits. **Required parameters**: `fundId`, `amount`, `userKey`.

```typescript
const depositIx = await sdk.getDepositInstructions({
  fundId: '8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwWV', // Required
  amount: 100, // Required
  userKey: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep', // Required
  payerKey: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep', // Optional
  all: false // Optional
});
// Returns: { deposit_instruction: [instruction_objects] }
```

**`getWithdrawInstruction(options)`**
Get Solana transaction instruction for withdrawals. **Required parameters**: `fundId`, `amount`, `userKey`.

```typescript
const withdrawIx = await sdk.getWithdrawInstruction({
  fundId: '8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwWV', // Required
  amount: 50, // Required
  userKey: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep', // Required
  payerKey: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep', // Optional
  all: false // Optional
});
// Returns: { lut_address: "...", withdraw_instruction: instruction_object }
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
    apiKey: 'your-api-key-here'
  });

  try {
    // 1. Get user yield data
    const userYield = await sdk.getUserYield({
      userId: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep',
      page: 1,
      limit: 10
    });
    console.log('Total yield earned:', userYield.total_yield_earned);
    console.log('Yield records:', userYield.yields.length);

    // 2. Get user balances
    const userBalances = await sdk.getUserBalances({
      userId: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep',
      asset: 'USDC',
      sortBy: 'balance',
      sortOrder: 'desc'
    });
    console.log('Total portfolio value:', userBalances.total_portfolio_value);
    console.log('Balance records:', userBalances.balances.length);

    // 3. Create deposit transaction
    const deposit = await sdk.createDepositTransaction({
      fundId: '8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwWV',
      amount: 100,
      userKey: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep'
    });
    console.log('Deposit transaction created:', deposit.success);

    // 4. Get deposit instructions (for manual transaction building)
    const instructions = await sdk.getDepositInstructions({
      fundId: '8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwWV',
      amount: 100,
      userKey: 'HN1tpS7DRzNnRYXGffww3KYS6svPE8Qaw3ZCArkXy9Ep'
    });
    console.log('Has instructions:', !!instructions.deposit_instruction);

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
  getUserYield,
  getUserBalances,
  getInstructionsForDeposit,
  getTransactionForDeposit
} from 'sdk-brreeezze';

const apiClient = new ApiClient('http://localhost:8080/');
const userYield = await getUserYield(apiClient, 'api_key', 'user_id');
const userBalances = await getUserBalances(apiClient, 'api_key', 'user_id');
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
  UserYield,
  UserBalances, 
  TransactionForDeposit,
  InstructionsForDeposit
} from 'sdk-brreeezze';

// All API responses are properly typed
const userYield: UserYield = await sdk.getUserYield({
  userId: 'user_123'
});

const userBalances: UserBalances = await sdk.getUserBalances({
  userId: 'user_123'
});

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
- `GET /user-yield/{user_id}` - Get user yield data (supports pagination and fund filtering)
- `GET /user-balances/{user_id}` - Get user balance information (supports asset filtering and sorting)

### POST Endpoints  
- `POST /deposit/tx` - Create deposit transaction (requires fundId, amount, userKey)
- `POST /withdraw/tx` - Create withdraw transaction (requires fundId, amount, userKey)
- `POST /deposit/ix` - Get deposit instructions (requires fundId, amount, userKey)
- `POST /withdraw/ix` - Get withdraw instruction (requires fundId, amount, userKey)

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
├── getUserYield/              # User yield operations
├── getUserBalances/           # User balance operations
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