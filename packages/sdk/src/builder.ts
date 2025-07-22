export const BASE_URL = 'https://api.breeze.baby/';

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

    // Ensure proper URL construction
    const baseUrl = this.baseUrl.endsWith('/') ? this.baseUrl : `${this.baseUrl}/`;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const fullUrl = `${baseUrl}${cleanEndpoint}`;

    try {
      const res = await fetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Get the response text once
      const responseText = await res.text();
      
      if (!res.ok) {
        let errorMessage = `Request failed: ${res.status}`;
        let errorBody;
        
        try {
          errorBody = JSON.parse(responseText);
          errorMessage = errorBody.message || errorMessage;
        } catch {
          errorMessage = responseText || errorMessage;
        }

        throw new BreezeApiError(
          errorMessage,
          res.status,
          errorBody?.code,
          errorBody
        );
      }

      // Parse the response text as JSON
      try {
        const data = JSON.parse(responseText);
        return data;
      } catch (parseError) {
        throw new BreezeApiError(
          `Failed to parse JSON response: ${parseError}`,
          res.status,
          'PARSE_ERROR',
          responseText
        );
      }
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