import { describe, test, expect, vi } from 'vitest';
import { DocumentNotFoundError, DocumentValidationError, CollectionError, CollectionNotFoundError, ProviderError, ProviderNotFoundError, VectorError, EmbeddingError, APIError, AuthenticationError, ValidationError } from '@/utils/errors';
// Mock logger
vi.mock('@/utils/logger', () => ({
    logger: {
        db: {
            error: vi.fn()
        }
    }
}));
describe('Error Handling', () => {
    describe('Document Errors', () => {
        test('DocumentNotFoundError includes id and collection', () => {
            const error = new DocumentNotFoundError('123', 'posts');
            expect(error.message).toContain('123');
            expect(error.message).toContain('posts');
            expect(error.name).toBe('DocumentNotFoundError');
        });
        test('DocumentValidationError includes violations', () => {
            const error = new DocumentValidationError('Invalid fields', {
                title: 'Title is required',
                content: 'Content too short'
            });
            expect(error.message).toContain('Invalid fields');
            expect(error.name).toBe('DocumentValidationError');
        });
    });
    describe('Collection Errors', () => {
        test('CollectionError includes collection info', () => {
            const error = new CollectionError('Failed to load', 'posts');
            expect(error.message).toContain('Failed to load');
            expect(error.name).toBe('CollectionError');
        });
        test('CollectionNotFoundError includes URI', () => {
            const error = new CollectionNotFoundError('file:///posts');
            expect(error.message).toContain('file:///posts');
            expect(error.name).toBe('CollectionNotFoundError');
        });
    });
    describe('Provider Errors', () => {
        test('ProviderError includes provider info', () => {
            const error = new ProviderError('Connection failed', 'fs');
            expect(error.message).toContain('Connection failed');
            expect(error.name).toBe('ProviderError');
        });
        test('ProviderNotFoundError includes scheme', () => {
            const error = new ProviderNotFoundError('invalid');
            expect(error.message).toContain('invalid');
            expect(error.name).toBe('ProviderNotFoundError');
        });
    });
    describe('Vector Errors', () => {
        test('VectorError includes operation details', () => {
            const error = new VectorError('Dimension mismatch', {
                expected: 256,
                actual: 128
            });
            expect(error.message).toContain('Dimension mismatch');
            expect(error.name).toBe('VectorError');
        });
        test('EmbeddingError includes model info', () => {
            const error = new EmbeddingError('API limit exceeded', 'text-embedding-3-large');
            expect(error.message).toContain('API limit exceeded');
            expect(error.name).toBe('EmbeddingError');
        });
    });
    describe('API Errors', () => {
        test('APIError includes status and endpoint', () => {
            const error = new APIError('Bad request', 400, '/api/posts');
            expect(error.status).toBe(400);
            expect(error.endpoint).toBe('/api/posts');
            expect(error.name).toBe('APIError');
        });
        test('AuthenticationError sets correct status', () => {
            const error = new AuthenticationError('/api/posts');
            expect(error.status).toBe(401);
            expect(error.endpoint).toBe('/api/posts');
            expect(error.name).toBe('AuthenticationError');
        });
    });
    describe('Validation Errors', () => {
        test('ValidationError includes field and value', () => {
            const error = new ValidationError('Invalid format', 'email', 'not-an-email');
            expect(error.field).toBe('email');
            expect(error.value).toBe('not-an-email');
            expect(error.name).toBe('ValidationError');
        });
    });
});
//# sourceMappingURL=errors.test.js.map