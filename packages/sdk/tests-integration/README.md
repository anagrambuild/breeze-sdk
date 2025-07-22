# Integration Tests for Breeze SDK

This folder contains comprehensive integration tests for all SDK methods. These tests are designed to send real HTTPS requests to a server and validate the responses or just use basic base url for all tests.

## Configuration

Edit `test-config.ts` to match your test environment:

```typescript
export const TEST_CONFIG = {
  baseUrl: 'http://api.breeze.baby/',
  apiKey: 'your_test_api_key',
  testUserId: 'test_user_123',
  testFundId: 'test_fund_456',
  testOrganizationId: 'test_org_789',
  // ... other config
};
```

## Running Tests

### Run All Integration Tests
```bash
npm run test:integration
```

### Run Specific Test Files
```bash
npx jest tests-integration/getFund.test.ts
npx jest tests-integration/getUserValue.test.ts
npx jest tests-integration/getPartnerFundStats.test.ts
```

### Run Health Check
```bash
npx jest tests-integration/runAllTests.test.ts
```

## Test Coverage

Each test file covers:
- ✅ **Happy Path**: Successful API calls with expected responses
- ✅ **Query Parameters**: Testing all supported query parameters
- ✅ **Error Handling**: Invalid IDs, network errors, server errors
- ✅ **Edge Cases**: Empty parameters, invalid date ranges, etc.

## Expected Server Endpoints

The tests expect the following endpoints to be available:

### Fund Operations
- `GET /fund/{fund_id}` - Get fund information
- `GET /fund/{base_asset}` - Get funds for base asset

### User Operations
- `GET /user/{user_id}` - Get user information
- `GET /user/{user_id}/current_value` - Get user value (with query params)
- `GET /user/{user_id}/stats` - Get user stats (with query params)

### Partner Operations
- `GET /partner/{organization_id}/stats` - Get partner fund stats (with query params)

### Transaction Operations
- `POST /transaction/deposit` - Create deposit transaction
- `POST /transaction/withdraw` - Create withdraw transaction

### Instruction Operations
- `POST /instructions/deposit` - Get deposit instructions
- `POST /instructions/withdraw` - Get withdraw instructions

## Query Parameters Tested

### getUserValue & getUserStats
- `fund_id` (string)
- `base_asset` (string)
- `fiat_value` (string)
- `start` (string) - for getUserStats only
- `end` (string) - for getUserStats only

### getPartnerFundStats
- `organization_id` (string)
- `base_asset` (string)
- `fiat_value` (string)
- `start` (string)
- `end` (string)

## Troubleshooting

### Server Connection Issues
- Ensure the server is running on the configured port
- Check if the server has a `/health` endpoint for health checks
- Verify the API key is correct

### Test Failures
- Check server logs for detailed error messages
- Verify test data exists in the server database
- Ensure all required endpoints are implemented

### Timeout Issues
- Increase timeout in `test-config.ts` if server responses are slow
- Check network connectivity between test runner and server

## Adding New Tests

When adding new SDK methods:
1. Create a new test file following the naming convention
2. Import the test configuration
3. Add proper setup with server health checks
4. Test both success and error scenarios
5. Include query parameter testing if applicable
6. Add network error handling tests