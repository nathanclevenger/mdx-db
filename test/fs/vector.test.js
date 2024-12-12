import { describe, test, expect } from 'vitest';
import { vectorSearch } from '@/fs/vector';
import { VectorMetadata } from '@/types';
const EPSILON = 1e-10; // Same tolerance as implementation
describe('Vector Search', () => {
    const createDoc = (vector) => ({
        embedding: {
            vector,
            dimensions: vector.length,
            metric: 'cosine'
        }
    });
    test('finds nearest neighbors', async () => {
        const docs = [
            createDoc([1, 0, 0]),
            createDoc([0, 1, 0]),
            createDoc([0, 0, 1])
        ];
        const results = await vectorSearch(docs, {
            vector: [1, 0, 0],
            k: 2
        });
        expect(results).toHaveLength(2);
        expect(Math.abs(results[0].score - 1)).toBeLessThan(EPSILON);
        expect(results[1].score).toBeLessThan(1);
    });
    test('respects similarity threshold', async () => {
        const docs = [
            createDoc([1, 0, 0]),
            createDoc([0.1, 0, 0])
        ];
        const results = await vectorSearch(docs, {
            vector: [1, 0, 0],
            threshold: 0.5
        });
        expect(results.every(r => r.score >= 0.5 - EPSILON)).toBe(true);
    });
});
//# sourceMappingURL=vector.test.js.map