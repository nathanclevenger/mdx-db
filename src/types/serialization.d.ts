import type { Document } from './document';
export interface SerializedDocument {
    '@id': string;
    '@context': string | Record<string, any>;
    '@type'?: string;
    [key: string]: any;
}
export interface Serializer {
    toJSON(doc: Document): SerializedDocument;
    fromJSON(json: SerializedDocument): Partial<Document>;
}
//# sourceMappingURL=serialization.d.ts.map