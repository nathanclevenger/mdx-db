import type { Document } from './document';
import type { QueryParams, QueryOptions } from './query';
import type { VectorSearchOptions } from './vector';
import type { EmbeddingModel } from './embedding';
export interface CollectionOperations {
    get(id: string): Promise<Document | null>;
    create(doc: Partial<Document>): Promise<Document>;
    update(id: string, doc: Partial<Document>): Promise<Document>;
    delete(id: string): Promise<void>;
    list(options?: QueryOptions): Promise<Document[]>;
    find(query: QueryParams, options?: QueryOptions): Promise<Document[]>;
    search(text: string, options?: QueryOptions): Promise<Document[]>;
    vectorSearch(options: VectorSearchOptions): Promise<Document[]>;
    semanticSearch(text: string, options?: Omit<VectorSearchOptions, 'vector'>): Promise<Document[]>;
}
export interface Collection extends CollectionOperations {
    readonly uri: string;
    readonly embeddingModel?: EmbeddingModel;
    collection(path: string): Collection;
    namespace(query?: QueryParams): Promise<Document[]>;
    useEmbeddingModel(model: EmbeddingModel): void;
}
//# sourceMappingURL=collection.d.ts.map