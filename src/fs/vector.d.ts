import { VectorSearchOptions, VectorMetadata } from '../types';
export interface VectorSearchResult {
    document: any;
    score: number;
}
export declare function vectorSearch(documents: Array<{
    embedding?: VectorMetadata;
}>, options: VectorSearchOptions): Promise<VectorSearchResult[]>;
//# sourceMappingURL=vector.d.ts.map