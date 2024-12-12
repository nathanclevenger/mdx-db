import { logger } from './logger';
// Base error class with logging
export class MDXDBError extends Error {
    constructor(message, details) {
        super(message);
        this.name = 'MDXDBError';
        logger.db.error(`${this.name}: ${message}`, details);
    }
}
// Document-related errors
export class DocumentNotFoundError extends MDXDBError {
    constructor(id, collection) {
        super(`Document not found: ${id}${collection ? ` in collection ${collection}` : ''}`, { id, collection });
        this.name = 'DocumentNotFoundError';
    }
}
export class DocumentValidationError extends MDXDBError {
    constructor(message, violations) {
        super(`Document validation failed: ${message}`, { violations });
        this.name = 'DocumentValidationError';
    }
}
// Collection-related errors
export class CollectionError extends MDXDBError {
    constructor(message, collection) {
        super(`Collection error: ${message}`, { collection });
        this.name = 'CollectionError';
    }
}
export class CollectionNotFoundError extends CollectionError {
    constructor(uri) {
        super(`Collection not found: ${uri}`, uri);
        this.name = 'CollectionNotFoundError';
    }
}
// Provider-related errors
export class ProviderError extends MDXDBError {
    constructor(message, provider) {
        super(`Provider error: ${message}`, { provider });
        this.name = 'ProviderError';
    }
}
export class ProviderNotFoundError extends ProviderError {
    constructor(scheme) {
        super(`No provider found for scheme: ${scheme}`, scheme);
        this.name = 'ProviderNotFoundError';
    }
}
// Vector-related errors
export class VectorError extends MDXDBError {
    constructor(message, details) {
        super(`Vector operation failed: ${message}`, details);
        this.name = 'VectorError';
    }
}
export class EmbeddingError extends VectorError {
    constructor(message, model) {
        super(`Embedding generation failed: ${message}`, { model });
        this.name = 'EmbeddingError';
    }
}
// API-related errors
export class APIError extends MDXDBError {
    constructor(message, status, endpoint) {
        super(`API error: ${message}`, { status, endpoint });
        this.status = status;
        this.endpoint = endpoint;
        this.name = 'APIError';
    }
}
export class AuthenticationError extends APIError {
    constructor(endpoint) {
        super('Authentication failed', 401, endpoint);
        this.name = 'AuthenticationError';
    }
}
// Validation-related errors
export class ValidationError extends MDXDBError {
    constructor(message, field, value) {
        super(`Validation error: ${message}`, { field, value });
        this.field = field;
        this.value = value;
        this.name = 'ValidationError';
    }
}
//# sourceMappingURL=errors.js.map