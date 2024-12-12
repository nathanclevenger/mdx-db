import { VectorError } from '@/utils/errors'
import { logger } from '@/utils/logger'
import { EPSILON } from '../constants'

export function cosineSimilarity(a: number[], b: number[]): number {
  // Input validation
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new VectorError('Vectors must be arrays')
  }

  if (a.length !== b.length) {
    throw new VectorError('Vectors must have the same dimensions')
  }

  if (a.some(x => typeof x !== 'number') || b.some(x => typeof x !== 'number')) {
    throw new VectorError('Vector elements must be numbers')
  }

  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }

  // Handle zero vectors
  if (normA < EPSILON && normB < EPSILON) {
    return 1 // Two zero vectors are considered identical
  }

  if (normA < EPSILON || normB < EPSILON) {
    return 0 // Zero vector with non-zero vector
  }

  normA = Math.sqrt(normA)
  normB = Math.sqrt(normB)

  const similarity = dotProduct / (normA * normB)

  // Handle floating point precision
  if (Math.abs(similarity - 1) < EPSILON) {
    return 1
  }

  if (Math.abs(similarity) < EPSILON) {
    return 0
  }

  return similarity
}