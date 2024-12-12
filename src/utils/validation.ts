import { ValidationError } from './errors'
import { Document, QueryParams } from '../types'

export function validateDocument(doc: Partial<Document>): void {
  if (doc.id && typeof doc.id !== 'string') {
    throw new ValidationError('Document ID must be a string')
  }
  
  if (doc.mdx && typeof doc.mdx !== 'string') {
    throw new ValidationError('MDX content must be a string')
  }
  
  if (doc.embedding) {
    validateEmbedding(doc.embedding)
  }
}

export function validateEmbedding(embedding: any): void {
  if (!Array.isArray(embedding.vector)) {
    throw new ValidationError('Embedding vector must be an array')
  }
  
  if (!embedding.dimensions || typeof embedding.dimensions !== 'number') {
    throw new ValidationError('Embedding dimensions must be a number')
  }
}

export function validateQueryParams(params: QueryParams): void {
  if (params.q && typeof params.q !== 'string') {
    throw new ValidationError('Search query must be a string')
  }
}