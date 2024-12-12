export interface VectorConfig {
    dimensions: number;
    metric?: 'cosine' | 'euclidean' | 'dot';
    normalize?: boolean;
}
export interface VectorMetadata {
    vector: number[];
    dimensions: number;
    metric: string;
}
export interface VectorSearchOptions {
    vector: number[];
    k?: number;
    threshold?: number;
    includeMetadata?: boolean;
    filter?: Record<string, any>;
}
//# sourceMappingURL=vector.d.ts.map