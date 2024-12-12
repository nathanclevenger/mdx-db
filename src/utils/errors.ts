import { logger } from './logger'

// Base error class with logging
export class MDXDBError extends Error {
  constructor(message: string, details?: Record<string, any>) {
    super(message)
    this.name = 'MDXDBError'
    logger.db.error(`${this.name}: ${message}`, details)
  }
}

// Document-related errors
export class DocumentNotFoundError extends MDXDBError {
  constructor(id: string, collection?: string) {
    super(
      `Document not found: ${id}${collection ? ` in collection ${collection}` : ''}`,
      { id, collection }
    )
    this.name = 'DocumentNotFoundError'
  }
}

export class DocumentValidationError extends MDXDBError {
  constructor(message: string, violations: Record<string, string>) {
    super(`Document validation failed: ${message}`, { violations })
    this.name = 'DocumentValidationError'
  }
}

// Collection-related errors
export class CollectionError extends MDXDBError {
  constructor(message: string, collection: string) {
    super(`Collection error: ${message}`, { collection })
    this.name = 'CollectionError'
  }
}

export class CollectionNotFoundError extends CollectionError {
  constructor(uri: string) {
    super(`Collection not found: ${uri}`, uri)
    this.name = 'CollectionNotFoundError'
  }
}

// Provider-related errors
export class ProviderError extends MDXDBError {
  constructor(message: string, provider: string) {
    super(`Provider error: ${message}`, { provider })
    this.name = 'ProviderError'
  }
}

export class ProviderNotFoundError extends ProviderError {
  constructor(scheme: string) {
    super(`No provider found for scheme: ${scheme}`, scheme)
    this.name = 'ProviderNotFoundError'
  }
}

// Vector-related errors
export class VectorError extends MDXDBError {
  constructor(message: string, details?: Record<string, any>) {
    super(`Vector operation failed: ${message}`, details)
    this.name = 'VectorError'
  }
}

export class EmbeddingError extends VectorError {
  constructor(message: string, model?: string) {
    super(`Embedding generation failed: ${message}`, { model })
    this.name = 'EmbeddingError'
  }
}

// API-related errors
export class APIError extends MDXDBError {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(`API error: ${message}`, { status, endpoint })
    this.name = 'APIError'
  }
}

export class AuthenticationError extends APIError {
  constructor(endpoint: string) {
    super('Authentication failed', 401, endpoint)
    this.name = 'AuthenticationError'
  }
}

// Validation-related errors
export class ValidationError extends MDXDBError {
  constructor(
    message: string,
    public field?: string,
    public value?: any
  ) {
    super(`Validation error: ${message}`, { field, value })
    this.name = 'ValidationError'
  }
}