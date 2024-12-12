// Vector-related types and interfaces
export interface VectorConfig {
  dimensions: number          // Dimensionality of vectors
  metric?: 'cosine' | 'euclidean' | 'dot'  // Distance metric
  normalize?: boolean         // Whether to normalize vectors
}

export interface VectorMetadata {
  vector: number[]           // The actual vector
  dimensions: number         // Vector dimensions
  metric: string            // Distance metric used
}

// Vector search options
export interface VectorSearchOptions {
  vector: number[]           // Query vector
  k?: number                // Number of nearest neighbors
  threshold?: number        // Similarity threshold
  includeMetadata?: boolean // Include vector metadata in results
  filter?: Record<string, any> // Additional filters
}