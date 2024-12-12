export interface APIConfig {
    apiURI?: (uri: string) => string;
    apiKey?: string;
}
export interface FSConfig {
    basePath?: string;
}
export interface ProviderConfig extends APIConfig, FSConfig {
    base?: string;
    context?: Record<string, any>;
    env?: Record<string, string>;
    vector?: VectorConfig;
}
//# sourceMappingURL=provider.d.ts.map