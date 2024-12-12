import { Database, Provider, ProviderConfig } from './types';
import { FSProvider } from './fs/provider';
import { FetchProvider } from './fetch/provider';
const providers = new Map();
// Register default providers
const fsProvider = new FSProvider();
const fetchProvider = new FetchProvider();
fsProvider.scheme.forEach(scheme => providers.set(scheme, fsProvider));
fetchProvider.scheme.forEach(scheme => providers.set(scheme, fetchProvider));
export function createDatabase(config) {
    // Load environment configuration
    const envConfig = {
        base: process.env.MDXDB_URL,
        apiKey: process.env.MDXDB_TOKEN
    };
    // Merge configurations with precedence: config > envConfig
    const mergedConfig = { ...envConfig, ...config };
    const db = Object.assign((uri, cfg) => {
        const url = new URL(uri);
        const provider = providers.get(url.protocol.slice(0, -1));
        if (!provider)
            throw new Error(`No provider found for scheme: ${url.protocol}`);
        return provider.createCollection(uri, { ...mergedConfig, ...cfg });
    }, {
        configure: (cfg) => Object.assign(mergedConfig, cfg),
        register: (provider) => {
            provider.scheme.forEach(scheme => providers.set(scheme, provider));
        },
        useProvider: (scheme) => {
            const provider = providers.get(scheme);
            if (!provider)
                throw new Error(`No provider found for scheme: ${scheme}`);
            return provider;
        },
        collection: (uri) => db(uri, mergedConfig)
    });
    return new Proxy(db, {
        get(target, prop) {
            if (prop in target)
                return target[prop];
            if (typeof prop === 'string') {
                return target(`file://${prop}`, mergedConfig);
            }
            return undefined;
        }
    });
}
export const db = createDatabase();
export * from './types';
//# sourceMappingURL=index.js.map