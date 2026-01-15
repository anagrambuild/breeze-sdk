# Breeze SDK

A comprehensive TypeScript SDK for interacting with the Breeze API, providing a clean interface for user yield tracking, balance management, and transaction handling.

## Installation

```bash
npm install @breezebaby/breeze-sdk
```

## Quick Start

```typescript
import { BreezeSDK } from '@breezebaby/breeze-sdk';

// Initialize the SDK
const sdk = new BreezeSDK({
  baseUrl: 'https://api.breeze.baby/', // Your API base URL
  apiKey: 'your-api-key-here',
  timeout: 30000 // Optional: request timeout in milliseconds (default: 30000)
});

// Get user yield data
const userYield = await sdk.getUserYield({
  userId: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY'
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
- `baseUrl?: string` - Base URL for the API (default: 'https://api.breeze.baby/')
- `timeout?: number` - Request timeout in milliseconds (default: 30000)

#### Methods

##### User Operations

**`getUserYield(options)`**
Get user yield data with pagination.

```typescript
// Basic usage
const userYield = await sdk.getUserYield({
  userId: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY'
});

// With optional parameters
const userYield = await sdk.getUserYield({
  userId: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY',
  page: 1,      // Optional pagination
  limit: 10     // Optional pagination
});

// Returns:
// {
// 	"data": [
// 		{
// 			"fund_id": "8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3Cysk",
// 			"fund_name": "Fund 8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3Cysk",
// 			"base_asset": "USDC",
// 			"position_value": 1000005,
// 			"yield_earned": 5,
// 			"apy": 6.614188643106429,
// 			"entry_date": "2025-08-05T13:28:21+00:00",
// 			"last_updated": "2025-08-05T13:28:21+00:00"
// 		}
// 	],
// 	"meta": {
// 		"page": 1,
// 		"per_page": 10,
// 		"total": 1,
// 		"total_pages": 1,
// 		"has_more": false
// 	}
// }
```

**`getUserBalances(options)`**
Get user balance information with asset filtering and sorting.

```typescript
// Basic usage
const userBalances = await sdk.getUserBalances({
  userId: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY'
});

// With optional parameters
const userBalances = await sdk.getUserBalances({
  userId: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY',
  asset: 'USDC',        // Optional filter
  sortBy: 'balance',    // Optional sorting
  sortOrder: 'desc',    // Optional sort order
  page: 1,              // Optional pagination
  limit: 10             // Optional pagination
});

// Returns:
// {
// 	"data": [
// 		{
// 			"token_address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
// 			"token_symbol": "USDC",
// 			"token_name": "USD Coin",
// 			"decimals": 6,
// 			"total_balance": 10470880,
// 			"yield_balance": {
// 				"fund_id": "8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwWV",
// 				"funds": "1000000",
// 				"amount_of_yield": "5",
// 				"fund_apy": 4.999999993617795
// 			}
// 		},
// 		{
// 			"token_address": "So11111111111111111111111111111111111111112",
// 			"token_symbol": "SOL",
// 			"token_name": "Wrapped SOL",
// 			"decimals": 9,
// 			"total_balance": 97959415,
// 			"yield_balance": null
// 		},
// 		{
// 			"token_address": "11111111111111111111111111111112",
// 			"token_symbol": "SOL",
// 			"token_name": "Solana",
// 			"decimals": 9,
// 			"total_balance": 3207138599,
// 			"yield_balance": null
// 		}
// 	],
// 	"meta": {
// 		"page": 1,
// 		"per_page": 10,
// 		"total": 3,
// 		"total_pages": 1,
// 		"has_more": false
// 	}
// }
```

##### Transaction Operations

**`createDepositTransaction(options)`**
Create a deposit transaction. **Required parameters**: `strategyId`, `baseAsset` (mint address), `amount`, `userKey`.

```typescript
const depositTx = await sdk.createDepositTransaction({
  strategyId: 'your-strategy-id', // Required
  baseAsset: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // Required - token mint address (e.g., USDC)
  amount: 100, // Required
  userKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // Required
  payerKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh', // Optional
  all: false // Optional: whether to deposit all available funds
});
// Returns base64 encoded transaction ready for signing
```

**`createWithdrawTransaction(options)`**
Create a withdraw transaction. **Required parameters**: `strategyId`, `baseAsset` (mint address), `amount`, `userKey`.

```typescript
const withdrawTx = await sdk.createWithdrawTransaction({
  strategyId: 'your-strategy-id', // Required
  baseAsset: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // Required - token mint address (e.g., USDC)
  amount: 50, // Required
  userKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY', // Required
  payerKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY', // Optional
  all: false // Optional: whether to withdraw all amount
});
// Returns: { success: true, result: "base64-encoded-transaction" }
```

**`getDepositInstructions(options)`**
Get Solana transaction instructions for deposits. **Required parameters**: `strategyId`, `baseAsset` (mint address), `amount`, `userKey`.

```typescript
const depositIx = await sdk.getDepositInstructions({
  strategyId: 'your-strategy-id', // Required
  baseAsset: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // Required - token mint address (e.g., USDC)
  amount: 100, // Required
  userKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY', // Required
  payerKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY', // Optional
  all: false // Optional
});
// Returns: { deposit_instructions: [instruction_objects] }
```

**`getWithdrawInstruction(options)`**
Get Solana transaction instruction for withdrawals. **Required parameters**: `strategyId`, `baseAsset` (mint address), `amount`, `userKey`.

```typescript
const withdrawIx = await sdk.getWithdrawInstruction({
  strategyId: 'your-strategy-id', // Required
  baseAsset: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // Required - token mint address (e.g., USDC)
  amount: 50, // Required
  userKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY', // Required
  payerKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY', // Optional
  all: false // Optional
});
// Returns: { lut_address: "...", withdraw_instructions: [instruction_object] }
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
import { BreezeSDK } from '@breezebaby/breeze-sdk';

async function example() {
  const sdk = new BreezeSDK({
    baseUrl: 'https://api.breeze.baby/',
    apiKey: 'your-api-key-here'
  });

  const strategyId = 'your-strategy-id';
  const usdcMint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC mint address

  try {
    // 1. Get strategy information
    const strategyInfo = await sdk.getStrategyInfo(strategyId);
    console.log('Strategy name:', strategyInfo.strategy_name);
    console.log('Supported assets:', strategyInfo.assets);
    console.log('APY per asset:', strategyInfo.apy_per_asset);

    // 2. Get user yield data
    const userYield = await sdk.getUserYield({
      userId: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY',
      page: 1,
      limit: 10
    });
    console.log('Yield records:', userYield.data.length);

    // 3. Get user balances
    const userBalances = await sdk.getUserBalances({
      userId: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY',
      asset: 'USDC',
      sortBy: 'balance',
      sortOrder: 'desc'
    });
    console.log('Balance records:', userBalances.data.length);

    // 4. Create deposit transaction using strategyId + baseAsset (mint)
    const deposit = await sdk.createDepositTransaction({
      strategyId: strategyId,
      baseAsset: usdcMint,
      amount: 100,
      userKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY'
    });
    console.log('Deposit transaction created');

    // 5. Get deposit instructions (for manual transaction building)
    const instructions = await sdk.getDepositInstructions({
      strategyId: strategyId,
      baseAsset: usdcMint,
      amount: 100,
      userKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY'
    });
    console.log('Has instructions:', !!instructions.deposit_instructions);

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

// Create transaction using strategyId + baseAsset (mint address)
const depositTx = await sdk.createDepositTransaction({
  strategyId: 'your-strategy-id',
  baseAsset: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC mint address
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
} from '@breezebaby/breeze-sdk';

const apiClient = new ApiClient('https://api.breeze.baby/');
const userYield = await getUserYield(apiClient, 'api_key', 'user_id');
const userBalances = await getUserBalances(apiClient, 'api_key', 'user_id');
```

## Required API Endpoint

The SDK requires access to the Breeze API at:
**Base URL:** `https://api.breeze.baby/`

Make sure your API key has access to the following endpoints:
- `GET /user-yield/{user_id}` - User yield data retrieval
- `GET /user-balances/{user_id}` - User balance information
- `POST /deposit/tx` - Deposit transaction creation
- `POST /withdraw/tx` - Withdraw transaction creation
- `POST /deposit/ix` - Deposit instruction generation
- `POST /withdraw/ix` - Withdraw instruction generation


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
  UserYield,
  UserBalances, 
  TransactionForDeposit,
  InstructionsForDeposit
} from '@breezebaby/breeze-sdk';

// All API responses are properly typed
const userYield: UserYield = await sdk.getUserYield({
  userId: 'user_123'
});

const userBalances: UserBalances = await sdk.getUserBalances({
  userId: 'user_123'
});

const instructions: InstructionsForDeposit = await sdk.getDepositInstructions({
  strategyId: 'strategy_123',
  baseAsset: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // mint address
  amount: 100,
  userKey: 'user_key'
});
```

## Testing

### Integration Tests
Run integration tests against real API server:

```bash
npm run test:all
```

### Example Scripts
Test the SDK with example scripts:

Check the examples out, in the packages/sdk/examples

## API Endpoints

The SDK interacts with these API endpoints:

### GET Endpoints
- `GET /user-yield/{user_id}` - Get user yield data (supports pagination)
- `GET /user-balances/{user_id}` - Get user balance information (supports asset filtering and sorting)
- `GET /strategy-info/{strategy_id}` - Get strategy information including supported assets and APY data

### POST Endpoints
- `POST /deposit/tx` - Create deposit transaction (requires strategyId, baseAsset, amount, userKey)
- `POST /withdraw/tx` - Create withdraw transaction (requires strategyId, baseAsset, amount, userKey)
- `POST /deposit/ix` - Get deposit instructions (requires strategyId, baseAsset, amount, userKey)
- `POST /withdraw/ix` - Get withdraw instruction (requires strategyId, baseAsset, amount, userKey)

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