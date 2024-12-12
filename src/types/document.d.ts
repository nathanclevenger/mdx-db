import type { MDXResult } from '@mdx.do/mdx';
import type { EmbeddedDocument } from './embedding';
export interface Document extends MDXResult, EmbeddedDocument {
    id: string;
    context: string | Record<string, any>;
    type?: string;
    toJSON(): Record<string, any> & {
        '@id': string;
        '@context': string | Record<string, any>;
        '@type'?: string;
    };
}
//# sourceMappingURL=document.d.ts.map