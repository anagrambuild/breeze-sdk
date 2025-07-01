// import { ApiClient, BreezeApiError } from '../src/builder';

// describe('ApiClient', () => {
//   let apiClient: ApiClient;

//   beforeEach(() => {
//     apiClient = new ApiClient();
//   });

//   describe('constructor', () => {
//     test('should use default base URL', () => {
//       const client = new ApiClient();
//       expect(client).toBeInstanceOf(ApiClient);
//     });

//     test('should accept custom base URL', () => {
//       const customUrl = 'https://api.example.com/';
//       const client = new ApiClient(customUrl);
//       expect(client).toBeInstanceOf(ApiClient);
//     });
//   });

//   describe('request method', () => {
//     test('should handle timeout', async () => {
//       const client = new ApiClient('https://httpstat.us/200?sleep=5000');
      
//       await expect(
//         client.request('/test', 'GET', { timeout: 1000 })
//       ).rejects.toThrow(BreezeApiError);
//     }, 10000);
//   });

//   describe('BreezeApiError', () => {
//     test('should create error with all properties', () => {
//       const error = new BreezeApiError('Test error', 400, 'BAD_REQUEST', { detail: 'test' });
      
//       expect(error.message).toBe('Test error');
//       expect(error.status).toBe(400);
//       expect(error.code).toBe('BAD_REQUEST');
//       expect(error.response).toEqual({ detail: 'test' });
//       expect(error.name).toBe('BreezeApiError');
//     });
//   });
// });