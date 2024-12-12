import type { Collection } from './collection'
import type { Provider, ProviderConfig } from './provider'

// Type for dynamic property access
export type DatabaseKey = string | number | symbol

export interface DatabaseProxy {
  [key: DatabaseKey]: DatabaseProxy | Collection
}

export interface Database extends DatabaseProxy {
  // Main collection access
  (uri: string, config?: ProviderConfig): Collection
  
  // Configuration
  configure(config: ProviderConfig): void
  
  // Provider management
  register(provider: Provider): void
  useProvider(scheme: string): Provider
  
  // Direct collection access
  collection(uri: string): Collection
}

// Factory function type
export type CreateDatabase = (config?: ProviderConfig) => Database