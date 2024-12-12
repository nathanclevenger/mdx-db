import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { createDatabase } from '@/index'
import { promises as fs } from 'fs'
import { Collection } from '@/types'

const TEST_DIR = '/tmp/mdxdb-test'

describe('Vector Search Integration', () => {
  let collection: Collection

  beforeEach(async () => {
    await fs.mkdir(TEST_DIR, { recursive: true })
    const db = createDatabase({ basePath: TEST_DIR })
    collection = db.collection('test')
  })

  afterEach(async () => {
    await fs.rm(TEST_DIR, { recursive: true, force: true })
  })

  test('performs semantic search', async () => {
    // Create test documents with embeddings
    await Promise.all([
      collection.create({
        mdx: '# Cats\nAll about cats and their behavior.',
        data: { title: 'Cats' }
      }),
      collection.create({
        mdx: '# Dogs\nGuide to dog training and care.',
        data: { title: 'Dogs' }
      })
    ])

    const results = await collection.semanticSearch('feline behavior')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].data.title).toBe('Cats')
  })

  test('respects similarity threshold', async () => {
    await Promise.all([
      collection.create({
        mdx: '# Programming\nGuide to coding.',
        data: { title: 'Programming' }
      }),
      collection.create({
        mdx: '# Gardening\nGuide to plants.',
        data: { title: 'Gardening' }
      })
    ])

    const results = await collection.semanticSearch('software development', {
      threshold: 0.8
    })
    
    expect(results.every(doc => 
      doc.data.title === 'Programming'
    )).toBe(true)
  })
})