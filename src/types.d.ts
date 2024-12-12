import type { ComponentType } from 'react';
import type { Root } from 'mdast';
import type { MDXResult } from '@mdx.do/mdx';
export interface Document extends MDXResult {
    '@id': string;
    '@context': string | Record<string, any>;
    '@type'?: string;
}
export interface QueryParams {
    q?: string;
    [key: string]: any;
}
export interface Collection {
    uri: string;
    get(id: string): Promise<Document | null>;
    create(doc: Partial<Document>): Promise<Document>;
    update(id: string, doc: Partial<Document>): Promise<Document>;
    delete(id: string): Promise<void>;
    list(): Promise<Document[]>;
    find(query: QueryParams): Promise<Document[]>;
    search(text: string): Promise<Document[]>;
    collection(path: string): Collection;
    namespace(): Promise<Document[]>;
}
export interface ProviderConfig {
    base?: string;
    context?: Record<string, any>;
}
export type DatabaseFunction = {
    (uri: string, config?: ProviderConfig): Collection;
    register: (provider: Provider) => void;
};
export interface Provider {
    scheme: string[];
    createCollection: (uri: string, config?: ProviderConfig) => Collection;
}
export type { MDXResult, Root, ComponentType };
//# sourceMappingURL=types.d.ts.map