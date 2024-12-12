import { describe, test, expect } from 'vitest';
import { validateDocument, validateQueryParams, validateEmbedding } from '@/utils/validation';
import { ValidationError } from '@/utils/errors';
describe('Validation', () => {
    describe('Document Validation', () => {
        test('validates basic document properties', () => {
            expect(() => validateDocument({
                id: 'valid',
                mdx: '# Valid'
            })).not.toThrow();
            expect(() => validateDocument({
                id: 123
            })).toThrow(ValidationError);
            expect(() => validateDocument({
                mdx: {}
            })).toThrow(ValidationError);
        });
        test('validates document with embedding', () => {
            expect(() => validateDocument({
                id: 'valid',
                mdx: '# Valid',
                embedding: {
                    vector: [1, 2, 3],
                    dimensions: 3,
                    metric: 'cosine'
                }
            })).not.toThrow();
            expect(() => validateDocument({
                id: 'invalid',
                mdx: '# Invalid',
                embedding: {
                    vector: 'not-an-array'
                }
            })).toThrow(ValidationError);
        });
    });
    describe('Query Validation', () => {
        test('validates search queries', () => {
            expect(() => validateQueryParams({
                q: 'valid query'
            })).not.toThrow();
            expect(() => validateQueryParams({
                q: 123
            })).toThrow(ValidationError);
        });
        test('validates filter parameters', () => {
            expect(() => validateQueryParams({
                published: true,
                tags: ['a', 'b']
            })).not.toThrow();
        });
    });
    describe('Embedding Validation', () => {
        test('validates embedding structure', () => {
            expect(() => validateEmbedding({
                vector: [1, 2, 3],
                dimensions: 3
            })).not.toThrow();
            expect(() => validateEmbedding({
                vector: null,
                dimensions: 3
            })).toThrow(ValidationError);
            expect(() => validateEmbedding({
                vector: [1, 2, 3],
                dimensions: '3'
            })).toThrow(ValidationError);
        });
    });
});
//# sourceMappingURL=validation.test.js.map