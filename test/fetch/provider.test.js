import { describe, test, expect } from 'vitest';
import { FetchProvider } from '@/fetch/provider';
import { Collection } from '@/types';
describe('FetchProvider', () => {
    const provider = new FetchProvider();
    test('supports http and https schemes', () => {
        expect(provider.scheme).toContain('http');
        expect(provider.scheme).toContain('https');
    });
    test('creates collection with default API transform', () => {
        const collection = provider.createCollection('https://example.com/posts');
        expect(collection).toBeDefined();
        expect(collection.uri).toBe('https://example.com/posts');
    });
    test('applies custom API transform', () => {
        const collection = provider.createCollection('https://example.com/posts', {
            apiURI: uri => `${uri}.json`
        });
        expect(collection).toBeDefined();
    });
    test('handles authentication configuration', () => {
        const collection = provider.createCollection('https://example.com/posts', {
            apiKey: 'test-key'
        });
        expect(collection).toBeDefined();
    });
});
//# sourceMappingURL=provider.test.js.map