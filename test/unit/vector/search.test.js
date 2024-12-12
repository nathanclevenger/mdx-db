import { describe, test, expect } from 'vitest';
import { vectorSearch } from '@/vector/search';
import { Document, VectorMetadata } from '@/types';
import { VectorError } from '@/utils/errors';
import { EPSILON } from '@/vector/constants';
describe('Vector Search', () => {
    const createDoc = (id, vector, data = {}) => ({
        id,
        context: 'test',
        mdx: '',
        data,
        embedding: {
            vector,
            dimensions: vector.length,
            metric: 'cosine'
        }
    });
    test('finds exact matches', async () => {
        const docs = [
            createDoc('1', [1, 0, 0]),
            createDoc('2', [0, 1, 0])
        ];
        const results = await vectorSearch(docs, {
            vector: [1, 0, 0]
        });
        expect(results).toHaveLength(2);
        expect(Math.abs(results[0].score - 1)).toBeLessThan(EPSILON);
        expect(results[0].document.id).toBe('1');
    });
    test('respects k parameter', async () => {
        const docs = [
            createDoc('1', [1, 0, 0]),
            createDoc('2', [0.9, 0.1, 0]),
            createDoc('3', [0, 1, 0])
        ];
        const results = await vectorSearch(docs, {
            vector: [1, 0, 0],
            k: 2
        });
        expect(results).toHaveLength(2);
        expect(results[0].document.id).toBe('1');
        expect(results[1].document.id).toBe('2');
    });
    test('applies similarity threshold', async () => {
        const docs = [
            createDoc('1', [1, 0, 0]),
            createDoc('2', [0.5, 0.5, 0]),
            createDoc('3', [0, 1, 0])
        ];
        const results = await vectorSearch(docs, {
            vector: [1, 0, 0],
            threshold: 0.9
        });
        expect(results.every(r => r.score >= 0.9 - EPSILON)).toBe(true);
    });
    test('skips documents without embeddings', async () => {
        const docs = [
            createDoc('1', [1, 0, 0]),
            { id: '2', context: 'test' }
        ];
        const results = await vectorSearch(docs, {
            vector: [1, 0, 0]
        });
        expect(results).toHaveLength(1);
        expect(results[0].document.id).toBe('1');
    });
});
//# sourceMappingURL=search.test.js.map