import { describe, test, expect, beforeEach } from 'vitest'
import { createDatabase } from '@/index'
import type { Database } from '@/types'

describe('Database', () => {
  let db: Database

  beforeEach(() => {
    db = createDatabase({
      base: 'file:///test',
      basePath: '/tmp/mdxdb-test'
    })
  })

  test('creates database instance', () => {
    expect(db).toBeDefined()
    expect(typeof db).toBe('function')
    expect(typeof db.configure).toBe('function')
    expect(typeof db.register).toBe('function')
  })

  test('supports direct collection access', () => {
    const collection = db.collection('file:///test/posts')
    expect(collection).toBeDefined()
    expect(collection.uri).toBe('file:///test/posts')
  })

  test('supports proxy access', () => {
    const collection = db.posts
    expect(collection).toBeDefined()
    expect(collection.uri).toBe('file:///posts')
  })

  test('throws on invalid scheme', () => {
    expect(() => db('invalid:///test')).toThrow('No provider found for scheme: invalid')
  })
})