import type { VectorMetadata } from './vector';
export interface EmbeddingModel {
    readonly model: string;
    readonly dimensions: number;
    embed(text: string): Promise<number[]>;
    embedBatch(texts: string[]): Promise<number[][]>;
}
export interface EmbeddedDocument {
    embedding?: VectorMetadata;
    embeddingModel?: string;
}
//# sourceMappingURL=embedding.d.ts.map