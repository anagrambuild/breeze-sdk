# Breeze SDK Examples

This directory contains example scripts demonstrating how to use the Breeze SDK.

## Available Examples

### 1. Basic Usage (`basic-usage.ts`)
A simple example showing basic SDK initialization and method calls.

```bash
npm run example:basic
```

### 2. Integration Flow (`integration-flow.ts`)
A comprehensive example that demonstrates a complete user flow:
- Get initial user value
- Get partner fund statistics
- Create and execute deposit transaction
- Get updated user value and statistics
- Create and execute withdraw transaction
- Get final user value

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

### 3. Integration Flow Simple (`integration-flow-simple.ts`)
A simplified version of the integration flow that demonstrates API calls without executing transactions.

**Features:**
- ✅ All API method demonstrations
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
  apiKey: 'userkey_0000',
  baseUrl: 'http://localhost:8080/',
  
  // Solana Configuration  
  rpcUrl: 'https://api.devnet.solana.com',
  
  // User Configuration
  privateKey: 'YOUR_PRIVATE_KEY_BASE58_HERE', // Base58 encoded private key
  userPublicKey: '4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh',
  
  // Fund Configuration
  fundId: 'DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW',
  organizationId: 'org_2z9UJxhyNmCvOpHScFKyBZrqEdy',
  
  // Transaction Configuration
  depositAmount: 100,
  withdrawShares: 50,
  
  // Date range for stats
  startDate: '2025-07-11T15:34:39.406Z',
  endDate: '2025-07-13T19:34:39.406Z'
};
```

### Required Dependencies

For the full integration flow example, install these dependencies:

```bash
npm install @solana/web3.js bs58
npm install --save-dev tsx
```

## API Methods Demonstrated

### Fund Operations
- `getFund(fundId)` - Get fund information
- `getFundsForBaseAsset(baseAsset)` - Get funds for specific asset

### User Operations
- `getUserInfo(userId)` - Get user information
- `getUserValue(userId, options?)` - Get user value with query parameters
- `getUserStats(userId, start, end, options?)` - Get user statistics

### Partner Operations
- `getPartnerFundStats(organizationId, start, end, options?)` - Get partner statistics

### Transaction Operations
- `createDepositTransaction(options)` - Create deposit transaction
- `createWithdrawTransaction(options)` - Create withdraw transaction
- `getDepositInstructions(options)` - Get deposit instructions
- `getWithdrawInstruction(options)` - Get withdraw instruction

## Flow Description

### Integration Flow Steps:

1. **Get Initial User Value**
   - Retrieve current user holdings
   - Parse asset values and fund percentages

2. **Get Partner Fund Statistics**
   - Retrieve fund performance data
   - Show yield percentages and historical values

3. **Create and Execute Deposit Transaction**
   - Generate deposit transaction
   - Sign with private key
   - Send to Solana network
   - Wait for confirmation

4. **Get Updated User Value**
   - Retrieve updated holdings after deposit
   - Compare with initial values

5. **Get User Statistics**
   - Retrieve user-specific performance data
   - Show historical yield and value changes

6. **Create and Execute Withdraw Transaction**
   - Generate withdraw transaction
   - Sign and send to network
   - Wait for confirmation

7. **Get Final User Value**
   - Retrieve final holdings after withdraw
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
- Test on devnet before mainnet
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
   API URL: http://localhost:8080/
   RPC URL: https://api.devnet.solana.com
   Fund ID: DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW
   User: 4Z9byLWE4DhH3KM84mjrkggkCxPuU8eBFgM44Enj41bh

==================================================
🔄 STEP 1: GET INITIAL USER VALUE
==================================================
✅ Retrieved initial user value
ℹ️  Initial USDC value: 1000.50
ℹ️  Fund percentage: 0.25%

==================================================
🔄 STEP 2: GET PARTNER FUND STATISTICS
==================================================
✅ Retrieved partner fund statistics
ℹ️  Fund ID: DYUgGU88Fsyr2xmYAv2p8jXVPa3jrcUZmb36C8EgfpaW
ℹ️  Latest yield: 12.5%

... (continues for all steps)
```