import type { ComponentType } from 'react'
import type { Root } from 'mdast'
import type { MDXResult } from '@mdx.do/mdx'

// Base document interface following JSON-LD conventions
export interface Document extends MDXResult {
  '@id': string
  '@context': string | Record<string, any>
  '@type'?: string
}

// Query parameters for filtering documents
export interface QueryParams {
  q?: string                    // Full-text search query
  [key: string]: any           // Additional filter parameters
}

// Collection interface for managing documents
export interface Collection {
  uri: string                  // Collection URI/namespace
  
  // Basic CRUD operations
  get(id: string): Promise<Document | null>
  create(doc: Partial<Document>): Promise<Document>
  update(id: string, doc: Partial<Document>): Promise<Document>
  delete(id: string): Promise<void>
  
  // Query operations
  list(): Promise<Document[]>  // Direct children only
  find(query: QueryParams): Promise<Document[]>
  search(text: string): Promise<Document[]>
  
  // Namespace operations
  collection(path: string): Collection  // Create sub-collection
  namespace(): Promise<Document[]>      // Deep search within namespace
}

// Provider configuration
export interface ProviderConfig {
  base?: string               // Base URI for the collection
  context?: Record<string, any> // Default JSON-LD context
}

// Main database function type
export type DatabaseFunction = {
  (uri: string, config?: ProviderConfig): Collection
  
  // Provider registration
  register: (provider: Provider) => void
}

// Provider interface for different backends
export interface Provider {
  scheme: string[]            // URL schemes this provider handles
  createCollection: (uri: string, config?: ProviderConfig) => Collection
}

// Re-export MDX types for convenience
export type {
  MDXResult,
  Root,
  ComponentType
}