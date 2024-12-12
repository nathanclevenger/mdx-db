import { Document } from '@/types'

export interface VectorSearchResult {
  document: Document
  score: number
}

export interface VectorMath {
  similarity(a: number[], b: number[]): number
}

export interface VectorMetrics {
  cosine: (a: number[], b: number[]) => number
  // Add other metrics as needed
}