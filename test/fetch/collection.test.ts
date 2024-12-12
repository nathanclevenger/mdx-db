import { describe, test, expect, beforeEach, vi } from 'vitest'
import { FetchCollection } from '@/fetch/collection'

// Mock global fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('FetchCollection', () => {
  let collection: FetchCollection

  beforeEach(() => {
    mockFetch.mockReset()
    collection = new FetchCollection(
      'https://example.com/test',
      'https://example.com/api/test',
      { apiKey: 'test-key' }
    )
  })

  test('gets document', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('# Test Document')
    })

    const doc = await collection.get('test-id')
    expect(doc).toBeDefined()
    expect(doc?.mdx).toBe('# Test Document')
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/test-id'),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': 'Bearer test-key'
        })
      })
    )
  })

  test('creates document', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('# New Document')
    })

    const doc = await collection.create({
      mdx: '# New Document'
    })

    expect(doc).toBeDefined()
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        body: expect.any(String)
      })
    )
  })

  test('handles errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    })

    const doc = await collection.get('non-existent')
    expect(doc).toBeNull()
  })
})