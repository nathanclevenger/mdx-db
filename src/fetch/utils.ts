import { QueryOptions, QueryParams, APIConfig, ProviderConfig } from '@/types'
import { logger } from '@/utils/logger'

/**
 * Build API URL with optional transform
 */
export function buildApiUrl(uri: string, transform?: (uri: string) => string): string {
  if (!transform) {
    // Default transform prepends /api
    return `/api${uri}`
  }
  return transform(uri)
}

/**
 * Build query string from parameters
 */
export function buildQueryString(params?: QueryParams & QueryOptions): string {
  if (!params || Object.keys(params).length === 0) {
    return ''
  }

  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, String(v)))
      } else {
        searchParams.append(key, String(value))
      }
    }
  })

  return `?${searchParams.toString()}`
}

/**
 * Get authentication configuration
 */
export function getAuthConfig(config?: ProviderConfig): APIConfig {
  const authConfig: APIConfig = {}

  // Use provided API key or fall back to environment variable
  authConfig.apiKey = config?.apiKey || process.env.MDXDB_TOKEN

  // Use provided API URI transform or default
  authConfig.apiURI = config?.apiURI || ((uri: string) => `/api${uri}`)

  logger.fetch.debug('Auth config generated', {
    hasApiKey: !!authConfig.apiKey,
    hasApiURI: !!authConfig.apiURI
  })

  return authConfig
}

/**
 * Build fetch request headers
 */
export function buildHeaders(config: APIConfig): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  }

  if (config.apiKey) {
    headers['Authorization'] = `Bearer ${config.apiKey}`
  }

  return headers
}

/**
 * Handle fetch response
 */
export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text().catch(() => 'Unknown error')
    logger.fetch.error('API request failed', {
      status: response.status,
      error
    })
    throw new Error(`API request failed: ${error}`)
  }

  return response.json()
}