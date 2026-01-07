import { BreezeSDK } from '../src';

/**
 * Example demonstrating the new strategy-related API methods:
 * - getStrategyInfo: Get strategy details including APY data
 * - getBreezeBalances: Get user balances with strategy-specific information
 */
async function strategyBalancesExample() {
  // Initialize the SDK
  const sdk = new BreezeSDK({
    baseUrl: 'https://api.breeze.baby/',
    apiKey: 'your-api-key-here', // Replace with your actual API key
    timeout: 30000
  });

  const strategyId = 'your-strategy-id';
  const userId = 'your-user-id';

  try {
    console.log('=== Strategy Information Example ===\n');

    // 1. Get strategy information
    const strategyInfo = await sdk.getStrategyInfo(strategyId);

    console.log('Strategy Details:');
    console.log(`  Name: ${strategyInfo.strategy_name}`);
    console.log(`  ID: ${strategyInfo.strategy_id}`);
    console.log(`  Overall APY: ${strategyInfo.apy.toFixed(2)}%`);
    console.log(`  Number of supported assets: ${strategyInfo.assets.length}\n`);

    console.log('Supported Assets and APY:');
    strategyInfo.assets.forEach(asset => {
      const apy = strategyInfo.apy_per_asset[asset];
      console.log(`  ${asset}: ${apy.toFixed(2)}% APY`);
    });

    console.log('\n=== Breeze Balances Example ===\n');

    // 2. Get breeze balances for a user with the strategy
    const breezeBalances = await sdk.getBreezeBalances({
      userId: userId,
      strategyId: strategyId
    });

    console.log(`Found ${breezeBalances.data.length} balance records`);
    console.log(`Page ${breezeBalances.meta.page} of ${breezeBalances.meta.total_pages}`);
    console.log(`Total records: ${breezeBalances.meta.total}\n`);

    // Display detailed information for each balance
    breezeBalances.data.forEach((balance, index) => {
      console.log(`Balance #${index + 1}:`);
      console.log(`  Strategy: ${balance.strategy_name} (${balance.strategy_id})`);
      console.log(`  Fund ID: ${balance.fund_id}`);
      console.log(`  Token: ${balance.token_symbol} - ${balance.token_name}`);
      console.log(`  Token Address: ${balance.token_address}`);
      console.log(`  Decimals: ${balance.decimals}`);
      console.log(`  Position Value: ${balance.total_position_value}`);
      console.log(`  Deposited Value: ${balance.total_deposited_value}`);
      console.log(`  Yield Earned: ${balance.yield_earned}`);
      console.log(`  APY: ${balance.apy.toFixed(2)}%`);
      console.log(`  Last Updated: ${balance.last_updated}\n`);
    });

    console.log('\n=== Filtered Breeze Balances Example ===\n');

    // 3. Get breeze balances filtered by asset
    const usdcBalances = await sdk.getBreezeBalances({
      userId: userId,
      strategyId: strategyId,
      asset: 'USDC'
    });

    console.log(`USDC balances found: ${usdcBalances.data.length}`);
    usdcBalances.data.forEach(balance => {
      console.log(`  ${balance.token_symbol}: Position=${balance.total_position_value}, Yield=${balance.yield_earned}, APY=${balance.apy.toFixed(2)}%`);
    });

    console.log('\n=== Paginated Breeze Balances Example ===\n');

    // 4. Get breeze balances with pagination
    const paginatedBalances = await sdk.getBreezeBalances({
      userId: userId,
      strategyId: strategyId,
      page: 1,
      limit: 5,
      sortBy: 'balance',
      sortOrder: 'desc'
    });

    console.log(`Page ${paginatedBalances.meta.page}:`);
    console.log(`  Records per page: ${paginatedBalances.meta.per_page}`);
    console.log(`  Total pages: ${paginatedBalances.meta.total_pages}`);
    console.log(`  Has more: ${paginatedBalances.meta.has_more}`);
    console.log(`  Records on this page: ${paginatedBalances.data.length}\n`);

    console.log('\n=== Combined Analysis Example ===\n');

    // 5. Combine strategy info with user balances for analysis
    console.log('Portfolio Analysis:');
    console.log(`Strategy: ${strategyInfo.strategy_name}`);
    console.log(`Expected Overall APY: ${strategyInfo.apy.toFixed(2)}%\n`);

    let totalPositionValue = 0;
    let totalDepositedValue = 0;
    let totalYieldEarned = 0;

    breezeBalances.data.forEach(balance => {
      totalPositionValue += balance.total_position_value;
      totalDepositedValue += balance.total_deposited_value;
      totalYieldEarned += balance.yield_earned;
    });

    console.log('Portfolio Summary:');
    console.log(`  Total Position Value: ${totalPositionValue}`);
    console.log(`  Total Deposited Value: ${totalDepositedValue}`);
    console.log(`  Total Yield Earned: ${totalYieldEarned}`);
    console.log(`  Actual Return: ${((totalYieldEarned / totalDepositedValue) * 100).toFixed(2)}%`);

    console.log('\nAsset Breakdown:');
    breezeBalances.data.forEach(balance => {
      const percentage = (balance.total_position_value / totalPositionValue) * 100;
      console.log(`  ${balance.token_symbol}: ${percentage.toFixed(2)}% of portfolio (APY: ${balance.apy.toFixed(2)}%)`);
    });

  } catch (error: any) {
    console.error('Error:', error.message);
    if (error.status) {
      console.error('Status:', error.status);
    }
    if (error.response) {
      console.error('Response:', error.response);
    }
  }
}

// Run the example
strategyBalancesExample()
  .then(() => {
    console.log('\n✅ Example completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Example failed:', error);
    process.exit(1);
  });
