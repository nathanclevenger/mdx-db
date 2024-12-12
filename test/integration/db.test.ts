import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { createDatabase } from '@/index'
import type { Database, Collection } from '@/types'
import { promises as fs } from 'fs'

const TEST_DIR = '/tmp/mdxdb-test'
const TEST_URI = 'file:///test'

describe('Database Integration', () => {
  let db: Database
  let collection: Collection

  beforeEach(async () => {
    await fs.mkdir(TEST_DIR, { recursive: true })
    db = createDatabase({
      base: TEST_URI,
      basePath: TEST_DIR
    })
    collection = db.collection('posts')
  })

  afterEach(async () => {
    await fs.rm(TEST_DIR, { recursive: true, force: true })
  })

  test('creates and retrieves documents', async () => {
    const doc = await collection.create({
      mdx: '# Test Post\nHello world!',
      data: {
        title: 'Test Post',
        published: true
      }
    })

    expect(doc.id).toBeDefined()
    expect(doc.data.title).toBe('Test Post')

    const retrieved = await collection.get(doc.id)
    expect(retrieved).toBeDefined()
    expect(retrieved?.data.title).toBe('Test Post')
  })

  test('updates documents', async () => {
    const doc = await collection.create({
      mdx: '# Original Title',
      data: { title: 'Original' }
    })

    const updated = await collection.update(doc.id, {
      mdx: '# Updated Title',
      data: { title: 'Updated' }
    })

    expect(updated.data.title).toBe('Updated')
    expect(updated.mdx).toContain('Updated Title')
  })

  test('deletes documents', async () => {
    const doc = await collection.create({
      mdx: '# Test Delete',
      data: { title: 'Delete Me' }
    })

    await collection.delete(doc.id)
    const retrieved = await collection.get(doc.id)
    expect(retrieved).toBeNull()
  })

  test('lists documents in collection', async () => {
    await Promise.all([
      collection.create({ mdx: '# Post 1', data: { title: 'First' } }),
      collection.create({ mdx: '# Post 2', data: { title: 'Second' } })
    ])

    const docs = await collection.list()
    expect(docs).toHaveLength(2)
    expect(docs.map(d => d.data.title)).toContain('First')
    expect(docs.map(d => d.data.title)).toContain('Second')
  })

  test('searches documents by text', async () => {
    await Promise.all([
      collection.create({ mdx: '# Hello World\nThis is about cats', data: { title: 'Cats' } }),
      collection.create({ mdx: '# Hello World\nThis is about dogs', data: { title: 'Dogs' } })
    ])

    const results = await collection.search('cats')
    expect(results).toHaveLength(1)
    expect(results[0].data.title).toBe('Cats')
  })

  test('finds documents by query', async () => {
    await Promise.all([
      collection.create({ mdx: '# Draft', data: { published: false } }),
      collection.create({ mdx: '# Published', data: { published: true } })
    ])

    const published = await collection.find({ published: true })
    expect(published).toHaveLength(1)
    expect(published[0].data.published).toBe(true)
  })
})