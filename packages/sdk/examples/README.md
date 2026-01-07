# Breeze SDK Examples

This directory contains example scripts demonstrating how to use the Breeze SDK.

## Available Examples

### 1. Basic Usage (`basic-usage.ts`)
A simple example showing basic SDK initialization and method calls including getUserYield, getUserBalances, getBreezeBalances, and getStrategyInfo methods.

```bash
npm run example:basic
```

### 2. Strategy and Balances Example (`strategy-balances-example.ts`)
A comprehensive example demonstrating the new strategy-related API methods:
- Get strategy information with APY data
- Get breeze balances with strategy-specific details
- Filter balances by asset
- Pagination and sorting
- Portfolio analysis combining strategy info and user balances

**Features:**
- ✅ Complete strategy information retrieval
- ✅ Breeze-specific balance queries
- ✅ Asset filtering and pagination examples
- ✅ Portfolio analysis and APY comparisons
- ✅ No external dependencies required

```bash
npx tsx examples/strategy-balances-example.ts
```

### 3. Integration Flow (`integration-flow.ts`)
A comprehensive example that demonstrates a complete user flow:
- Get user yield data
- Get user balances
- Create and execute deposit transaction
- Create and execute withdraw transaction
- Get final user state

**Features:**
- ✅ Real Solana transaction signing and execution
- ✅ Complete error handling
- ✅ Progress logging
- ✅ Configuration section for easy customization

**Requirements:**
- `@solana/web3.js` dependency
- `bs58` dependency
- Private key configuration

```bash
npm run example:integration
```

### 4. Integration Flow Simple (`integration-flow-simple.ts`)
A simplified version of the integration flow that demonstrates API calls without executing transactions.

**Features:**
- ✅ New API method demonstrations (getUserYield, getUserBalances)
- ✅ No external dependencies required
- ✅ Safe to run without private keys
- ✅ Shows transaction data without execution

```bash
npx tsx examples/integration-flow-simple.ts
```

## Configuration

### For integration-flow.ts

Update the `CONFIG` object at the top of the file:

```typescript
const CONFIG = {
  // API Configuration
  apiKey: 'apy_key_here',
  baseUrl: 'https://api.breeze.baby/',
  
  // Solana Configuration  
  rpcUrl: 'https://api.mainnet-beta.solana.com',
  
  // User Configuration
  privateKey: 'YOUR_PRIVATE_KEY_BASE58_HERE', // Base58 encoded private key
  userPublicKey: '7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY',
  
  // Fund Configuration
  fundId: '8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwfV',
  
  // Transaction Configuration
  depositAmount: 100,
  withdrawAmount: 50
};
```

### Required Dependencies

For the full integration flow example, install these dependencies:

```bash
npm install @solana/web3.js bs58
npm install --save-dev tsx
```

## API Methods Demonstrated

### User Operations
- `getUserYield(options)` - Get user yield data with pagination and fund filtering
- `getUserBalances(options)` - Get user balances with asset filtering and sorting
- `getBreezeBalances(options)` - Get breeze-specific balances with strategy details (requires strategyId)

### Strategy Operations
- `getStrategyInfo(strategyId)` - Get strategy information including supported assets and APY data

### Transaction Operations
- `createDepositTransaction(options)` - Create deposit transaction
- `createWithdrawTransaction(options)` - Create withdraw transaction
- `getDepositInstructions(options)` - Get deposit instructions
- `getWithdrawInstruction(options)` - Get withdraw instruction

## Flow Description

### Integration Flow Steps:

1. **Get User Yield Data**
   - Retrieve user yield information with pagination
   - Show yield earned per fund
   - Display APY and position values

2. **Get User Balances**
   - Retrieve current user balances across all assets
   - Show wallet balance, total balance, and yield
   - Display fund positions and portfolio value

3. **Create and Execute Deposit Transaction**
   - Generate deposit transaction
   - Sign with private key
   - Send to Solana network
   - Wait for confirmation

4. **Create and Execute Withdraw Transaction**
   - Generate withdraw transaction
   - Sign and send to network
   - Wait for confirmation

5. **Get Final User State**
   - Retrieve updated yield and balance information
   - Show complete transaction results

## Error Handling

All examples include comprehensive error handling:
- API request failures
- Transaction creation errors
- Network connectivity issues
- Invalid configuration warnings

## Security Notes

- Never commit private keys to version control
- Use environment variables for sensitive data
- Validate all configuration before execution

## Logging

The examples provide detailed logging:
- ✅ Success messages
- ❌ Error messages
- ℹ️ Informational messages
- 🔄 Section headers
- 💡 Tips and recommendations

## Example Output

```
🚀 Starting Breeze SDK Integration Flow...
📋 Configuration:
   API URL: https://api.breeze.baby/
   Fund ID: 8pfa41TvGWyttSViHRaNwFwbjhDEgmf3tHj81XR3CwWV
   User: 7EcSQsLNbkorQr3igFzfEwFJoPEUgB3NfmDTAigEcoSY

==================================================
🔄 STEP 1: GET USER YIELD DATA
==================================================
✅ Retrieved user yield data
ℹ️  Total yield earned: 125.50
ℹ️  Number of yield records: 5
ℹ️  Latest yield from fund: Breeze USDC Fund

==================================================
🔄 STEP 2: GET USER BALANCES
==================================================
✅ Retrieved user balances
ℹ️  Total portfolio value: 1000.50
ℹ️  Total yield earned: 125.50
ℹ️  Number of balance records: 2

... (continues for all steps)
```