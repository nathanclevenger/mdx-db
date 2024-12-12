import { Database, Provider, ProviderConfig } from './types'
import { FSProvider } from './fs/provider'
import { FetchProvider } from './fetch/provider'

const providers = new Map<string, Provider>()

// Register default providers
const fsProvider = new FSProvider()
const fetchProvider = new FetchProvider()

fsProvider.scheme.forEach(scheme => providers.set(scheme, fsProvider))
fetchProvider.scheme.forEach(scheme => providers.set(scheme, fetchProvider))

export function createDatabase(config?: ProviderConfig): Database {
  // Load environment configuration
  const envConfig: ProviderConfig = {
    base: process.env.MDXDB_URL,
    apiKey: process.env.MDXDB_TOKEN
  }

  // Merge configurations with precedence: config > envConfig
  const mergedConfig = { ...envConfig, ...config }

  const db: Database = Object.assign(
    (uri: string, cfg?: ProviderConfig) => {
      const url = new URL(uri)
      const provider = providers.get(url.protocol.slice(0, -1))
      if (!provider) throw new Error(`No provider found for scheme: ${url.protocol}`)
      return provider.createCollection(uri, { ...mergedConfig, ...cfg })
    },
    {
      configure: (cfg: ProviderConfig) => Object.assign(mergedConfig, cfg),
      register: (provider: Provider) => {
        provider.scheme.forEach(scheme => providers.set(scheme, provider))
      },
      useProvider: (scheme: string) => {
        const provider = providers.get(scheme)
        if (!provider) throw new Error(`No provider found for scheme: ${scheme}`)
        return provider
      },
      collection: (uri: string) => db(uri, mergedConfig)
    }
  )

  return new Proxy(db, {
    get(target, prop) {
      if (prop in target) return target[prop]
      if (typeof prop === 'string') {
        return target(`file://${prop}`, mergedConfig)
      }
      return undefined
    }
  })
}

export const db = createDatabase()
export * from './types'