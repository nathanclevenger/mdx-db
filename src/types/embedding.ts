import type { VectorMetadata } from './vector'

// Interface for embedding models
export interface EmbeddingModel {
  readonly model: string
  readonly dimensions: number
  
  // Generate embeddings for text
  embed(text: string): Promise<number[]>
  embedBatch(texts: string[]): Promise<number[][]>
}

// Document with embedding support
export interface EmbeddedDocument {
  embedding?: VectorMetadata
  embeddingModel?: string
}