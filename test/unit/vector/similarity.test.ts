import { describe, test, expect } from 'vitest'
import { cosineSimilarity } from '@/vector/similarity'
import { VectorError } from '@/utils/errors'
import { EPSILON } from '@/vector/constants'

describe('Cosine Similarity', () => {
  test('calculates similarity between identical vectors', () => {
    const vec = [1, 0, 0, 1]
    const similarity = cosineSimilarity(vec, vec)
    expect(Math.abs(similarity - 1)).toBeLessThan(EPSILON)
  })

  test('calculates similarity between orthogonal vectors', () => {
    const vec1 = [1, 0]
    const vec2 = [0, 1]
    const similarity = cosineSimilarity(vec1, vec2)
    expect(Math.abs(similarity)).toBeLessThan(EPSILON)
  })

  test('handles zero vectors correctly', () => {
    const zero = [0, 0]
    const nonZero = [1, 1]
    
    // Two zero vectors should have similarity 1
    expect(cosineSimilarity(zero, zero)).toBe(1)
    
    // Zero vector with non-zero vector should have similarity 0
    expect(cosineSimilarity(zero, nonZero)).toBe(0)
    expect(cosineSimilarity(nonZero, zero)).toBe(0)
  })

  test('handles floating point precision', () => {
    const vec1 = [0.1, 0.2, 0.3]
    const vec2 = [0.1, 0.2, 0.3]
    const similarity = cosineSimilarity(vec1, vec2)
    expect(Math.abs(similarity - 1)).toBeLessThan(EPSILON)
  })

  test('throws on mismatched dimensions', () => {
    expect(() => cosineSimilarity([1, 2], [1, 2, 3]))
      .toThrow(VectorError)
  })

  test('validates input types', () => {
    expect(() => cosineSimilarity(['1'] as any, [1]))
      .toThrow(VectorError)
    expect(() => cosineSimilarity(null as any, [1]))
      .toThrow(VectorError)
  })
})