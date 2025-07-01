// import { ApiClient, getFund, getUserInfo, getTransactionForDeposit, getTransactionForWithdraw, createUserFund } from '../src';
// import { mockResponses, createMockFetch } from './mock-server';

// // Mock fetch globally
// global.fetch = jest.fn();

// describe('API Routes', () => {
//   let apiClient: ApiClient;
//   const mockApiKey = 'test_api_key';

//   beforeEach(() => {
//     apiClient = new ApiClient('http://localhost:8080/');
//     jest.clearAllMocks();
//   });

//   describe('getFund', () => {
//     test('should fetch fund data successfully', async () => {
//       (global.fetch as jest.Mock).mockImplementation(
//         createMockFetch(mockResponses.getFund)
//       );

//       const result = await getFund(apiClient, 'fund_12855430823', mockApiKey);

//       expect(global.fetch).toHaveBeenCalledWith(
//         'http://localhost:8080/getfund/fund_12855430823',
//         expect.objectContaining({
//           method: 'GET',
//           headers: expect.objectContaining({
//             'api-key': mockApiKey,
//             'Content-Type': 'application/json'
//           })
//         })
//       );

//       expect(result.success).toBe(true);
//       expect(result.result.fund_id).toBe('fund_12855430823');
//     });

//     test('should handle API error', async () => {
//       (global.fetch as jest.Mock).mockImplementation(
//         createMockFetch({ error: 'Fund not found' }, 404)
//       );

//       await expect(
//         getFund(apiClient, 'invalid_fund', mockApiKey)
//       ).rejects.toThrow();
//     });
//   });

//   describe('getUserInfo', () => {
//     test('should fetch user info successfully', async () => {
//       (global.fetch as jest.Mock).mockImplementation(
//         createMockFetch(mockResponses.getUserInfo)
//       );

//       const result = await getUserInfo(apiClient, 'user_123', mockApiKey);

//       expect(global.fetch).toHaveBeenCalledWith(
//         'http://localhost:8080/user/user_123',
//         expect.objectContaining({
//           method: 'GET',
//           headers: expect.objectContaining({
//             'api-key': mockApiKey
//           })
//         })
//       );

//       expect(result.success).toBe(true);
//       expect(result.result.user).toBe('user_2316565914');
//     });
//   });

//   describe('getTransactionForDeposit', () => {
//     test('should create deposit transaction successfully', async () => {
//       (global.fetch as jest.Mock).mockImplementation(
//         createMockFetch(mockResponses.transactionForDeposit)
//       );

//       const result = await getTransactionForDeposit(
//         apiClient,
//         mockApiKey,
//         'fund_123',
//         100,
//         false,
//         'user_wallet_key'
//       );

//       expect(global.fetch).toHaveBeenCalledWith(
//         'http://localhost:8080/deposit/tx',
//         expect.objectContaining({
//           method: 'POST',
//           headers: expect.objectContaining({
//             'api-key': mockApiKey,
//             'Content-Type': 'application/json'
//           }),
//           body: JSON.stringify({
//             params: {
//               fund_id: 'fund_123',
//               amount: 100,
//               all: false,
//               user_key: 'user_wallet_key'
//             }
//           })
//         })
//       );

//       expect(result.success).toBe(true);
//       expect(typeof result.result).toBe('string');
//     });
//   });

//   describe('getTransactionForWithdraw', () => {
//     test('should create withdraw transaction successfully', async () => {
//       (global.fetch as jest.Mock).mockImplementation(
//         createMockFetch(mockResponses.transactionForWithdraw)
//       );

//       const result = await getTransactionForWithdraw(
//         apiClient,
//         mockApiKey,
//         'fund_123',
//         50,
//         false,
//         'user_wallet_key'
//       );

//       expect(result.success).toBe(true);
//       expect(typeof result.result).toBe('string');
//     });
//   });

//   describe('createUserFund', () => {
//     test('should create user fund transaction successfully', async () => {
//       (global.fetch as jest.Mock).mockImplementation(
//         createMockFetch(mockResponses.createUserFund)
//       );

//       const result = await createUserFund(
//         apiClient,
//         mockApiKey,
//         'fund_123',
//         'user_wallet_key'
//       );

//       expect(global.fetch).toHaveBeenCalledWith(
//         'http://localhost:8080/create_user_fund/tx',
//         expect.objectContaining({
//           method: 'POST',
//           headers: expect.objectContaining({
//             'api-key': mockApiKey,
//             'Content-Type': 'application/json'
//           }),
//           body: JSON.stringify({
//             params: {
//               fund_id: 'fund_123',
//               user_key: 'user_wallet_key'
//             }
//           })
//         })
//       );

//       expect(result.success).toBe(true);
//       expect(typeof result.result).toBe('string');
//     });
//   });
// });