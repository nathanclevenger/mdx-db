import { describe, test, expect } from 'vitest'
import { vectorSearch } from '@/fs/vector'
import { cosineSimilarity } from '@/fs/similarity'
import { VectorMetadata } from '@/types'

const EPSILON = 1e-10 // Same tolerance as implementation

describe('Vector Operations', () => {
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

    test('handles zero vectors', () => {
      const vec1 = [0, 0]
      const vec2 = [1, 1]
      expect(cosineSimilarity(vec1, vec2)).toBe(0)
    })

    test('throws on mismatched dimensions', () => {
      expect(() => cosineSimilarity([1, 2], [1, 2, 3]))
        .toThrow('Vectors must have the same dimensions')
    })
  })

  describe('Vector Search', () => {
    const createDoc = (vector: number[]) => ({
      embedding: {
        vector,
        dimensions: vector.length,
        metric: 'cosine'
      } as VectorMetadata
    })

    test('finds exact matches', async () => {
      const docs = [
        createDoc([1, 0, 0]),
        createDoc([0, 1, 0])
      ]

      const results = await vectorSearch(docs, {
        vector: [1, 0, 0]
      })

      expect(Math.abs(results[0].score - 1)).toBeLessThan(EPSILON)
      expect(results[0].document.embedding.vector).toEqual([1, 0, 0])
    })

    test('respects k parameter', async () => {
      const docs = [
        createDoc([1, 0, 0]),
        createDoc([0.9, 0.1, 0]),
        createDoc([0, 1, 0])
      ]

      const results = await vectorSearch(docs, {
        vector: [1, 0, 0],
        k: 2
      })

      expect(results).toHaveLength(2)
      expect(results[0].score).toBeGreaterThan(results[1].score)
    })

    test('applies similarity threshold', async () => {
      const docs = [
        createDoc([1, 0, 0]),
        createDoc([0.5, 0.5, 0]),
        createDoc([0, 1, 0])
      ]

      const results = await vectorSearch(docs, {
        vector: [1, 0, 0],
        threshold: 0.9
      })

      expect(results.every(r => r.score >= 0.9 - EPSILON)).toBe(true)
    })
  })
})