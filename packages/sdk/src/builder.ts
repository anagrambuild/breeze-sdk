export const BASE_URL = 'http://localhost:8080/';

export interface RequestOptions {
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

export interface BreezeError {
  message: string;
  status?: number;
  code?: string;
}

export class BreezeApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public response?: any
  ) {
    super(message);
    this.name = 'BreezeApiError';
  }
}

export class ApiClient {
  constructor(
    private baseUrl: string = BASE_URL,
    private defaultTimeout: number = 30000
  ) {}

  async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    options: RequestOptions = {}
  ): Promise<T> {
    const { headers = {}, body, timeout = this.defaultTimeout } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        let errorMessage = `Request failed: ${res.status}`;
        let errorBody;
        
        try {
          errorBody = await res.json();
          errorMessage = errorBody.message || errorMessage;
        } catch {
          errorMessage = await res.text() || errorMessage;
        }

        throw new BreezeApiError(
          errorMessage,
          res.status,
          errorBody?.code,
          errorBody
        );
      }

      const data = await res.json();
      return data;
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error?.name === 'AbortError') {
        throw new BreezeApiError('Request timeout', 408, 'TIMEOUT');
      }
      
      if (error instanceof BreezeApiError) {
        throw error;
      }
      
      throw new BreezeApiError(
        error?.message || 'Network error occurred',
        undefined,
        'NETWORK_ERROR'
      );
    }
  }
}