import type { Collection } from './collection'

export interface APIConfig {
  apiURI?: (uri: string) => string  // Custom API URI transformer
  apiKey?: string                   // API authentication key
}

export interface FSConfig {
  basePath?: string              // Base filesystem path for FS provider
}

export interface ProviderConfig extends APIConfig, FSConfig {
  base?: string
  context?: Record<string, any>
  env?: Record<string, string>
  vector?: VectorConfig
}