import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { buildApiUrl, buildQueryString, getAuthConfig, buildHeaders } from '@/fetch/utils';
describe('Fetch Utilities', () => {
    describe('buildApiUrl', () => {
        test('applies default transform', () => {
            const url = buildApiUrl('https://example.com/posts');
            expect(url).toBe('/apihttps://example.com/posts');
        });
        test('applies custom transform', () => {
            const transform = (uri) => `${uri}.json`;
            const url = buildApiUrl('https://example.com/posts', transform);
            expect(url).toBe('https://example.com/posts.json');
        });
    });
    describe('buildQueryString', () => {
        test('builds query string from params', () => {
            const params = { q: 'test', limit: 10 };
            const query = buildQueryString(params);
            expect(query).toBe('?q=test&limit=10');
        });
        test('handles array values', () => {
            const params = { tags: ['a', 'b'] };
            const query = buildQueryString(params);
            expect(query).toBe('?tags=a&tags=b');
        });
        test('handles empty params', () => {
            expect(buildQueryString()).toBe('');
            expect(buildQueryString({})).toBe('');
        });
        test('skips undefined values', () => {
            const params = { q: 'test', limit: undefined };
            const query = buildQueryString(params);
            expect(query).toBe('?q=test');
        });
    });
    describe('getAuthConfig', () => {
        const originalEnv = process.env;
        beforeEach(() => {
            process.env = { ...originalEnv };
        });
        afterEach(() => {
            process.env = originalEnv;
        });
        test('uses provided config', () => {
            const config = getAuthConfig({ apiKey: 'test-key' });
            expect(config.apiKey).toBe('test-key');
        });
        test('falls back to environment variables', () => {
            process.env.MDXDB_TOKEN = 'env-key';
            const config = getAuthConfig({});
            expect(config.apiKey).toBe('env-key');
        });
        test('includes default API URI transform', () => {
            const config = getAuthConfig({});
            expect(typeof config.apiURI).toBe('function');
            expect(config.apiURI?.('test')).toBe('/apitest');
        });
        test('uses custom API URI transform', () => {
            const transform = (uri) => `${uri}.json`;
            const config = getAuthConfig({ apiURI: transform });
            expect(config.apiURI?.('test')).toBe('test.json');
        });
    });
    describe('buildHeaders', () => {
        test('includes content type', () => {
            const headers = buildHeaders({});
            expect(headers['Content-Type']).toBe('application/json');
        });
        test('includes authorization when API key provided', () => {
            const headers = buildHeaders({ apiKey: 'test-key' });
            expect(headers['Authorization']).toBe('Bearer test-key');
        });
        test('omits authorization when no API key', () => {
            const headers = buildHeaders({});
            expect(headers['Authorization']).toBeUndefined();
        });
    });
});
//# sourceMappingURL=utils.test.js.map