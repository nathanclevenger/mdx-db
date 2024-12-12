import type { Collection } from './collection';
import type { Provider, ProviderConfig } from './provider';
export type DatabaseKey = string | number | symbol;
export interface DatabaseProxy {
    [key: DatabaseKey]: DatabaseProxy | Collection;
}
export interface Database extends DatabaseProxy {
    (uri: string, config?: ProviderConfig): Collection;
    configure(config: ProviderConfig): void;
    register(provider: Provider): void;
    useProvider(scheme: string): Provider;
    collection(uri: string): Collection;
}
export type CreateDatabase = (config?: ProviderConfig) => Database;
//# sourceMappingURL=database.d.ts.map