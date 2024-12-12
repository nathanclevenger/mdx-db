import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { createDatabase } from '@/index';
import { promises as fs } from 'fs';
import { DocumentNotFoundError, ValidationError, VectorError } from '@/utils/errors';
const TEST_DIR = '/tmp/mdxdb-test';
describe('Error Handling Integration', () => {
    let db;
    let collection;
    beforeEach(async () => {
        await fs.mkdir(TEST_DIR, { recursive: true });
        db = createDatabase({ basePath: TEST_DIR });
        collection = db.collection('test');
    });
    afterEach(async () => {
        await fs.rm(TEST_DIR, { recursive: true, force: true });
    });
    test('throws DocumentNotFoundError for non-existent document', async () => {
        await expect(collection.update('non-existent', { mdx: '# Updated' })).rejects.toThrow(DocumentNotFoundError);
    });
    test('throws ValidationError for invalid document', async () => {
        await expect(collection.create({ mdx: 123 })).rejects.toThrow(ValidationError);
    });
    test('throws VectorError for mismatched dimensions', async () => {
        const doc = await collection.create({
            mdx: '# Test',
            embedding: {
                vector: [1, 2],
                dimensions: 2
            }
        });
        await expect(collection.vectorSearch({
            vector: [1, 2, 3],
            threshold: 0.8
        })).rejects.toThrow(VectorError);
    });
    test('handles concurrent operations gracefully', async () => {
        const doc = await collection.create({
            mdx: '# Original',
            data: { version: 1 }
        });
        // Attempt concurrent updates
        await Promise.all([
            collection.update(doc.id, { data: { version: 2 } }),
            collection.update(doc.id, { data: { version: 3 } })
        ]).catch(error => {
            expect(error.name).toBe('DocumentValidationError');
        });
        const final = await collection.get(doc.id);
        expect(final?.data.version).toBeGreaterThan(1);
    });
    test('validates embedding model configuration', async () => {
        await expect(collection.useEmbeddingModel({
            model: 'invalid-model',
            dimensions: -1
        })).rejects.toThrow(ValidationError);
    });
    test('handles filesystem errors gracefully', async () => {
        // Simulate filesystem error by removing permissions
        await fs.chmod(TEST_DIR, 0o000);
        await expect(collection.create({ mdx: '# Test' })).rejects.toThrow(/EACCES|Permission denied/);
        // Restore permissions for cleanup
        await fs.chmod(TEST_DIR, 0o755);
    });
});
//# sourceMappingURL=error-handling.test.js.map