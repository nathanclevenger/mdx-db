import { QueryOptions, QueryParams, APIConfig, ProviderConfig } from '@/types';
/**
 * Build API URL with optional transform
 */
export declare function buildApiUrl(uri: string, transform?: (uri: string) => string): string;
/**
 * Build query string from parameters
 */
export declare function buildQueryString(params?: QueryParams & QueryOptions): string;
/**
 * Get authentication configuration
 */
export declare function getAuthConfig(config?: ProviderConfig): APIConfig;
/**
 * Build fetch request headers
 */
export declare function buildHeaders(config: APIConfig): HeadersInit;
/**
 * Handle fetch response
 */
export declare function handleResponse<T>(response: Response): Promise<T>;
//# sourceMappingURL=utils.d.ts.map