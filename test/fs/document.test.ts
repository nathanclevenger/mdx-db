import { describe, test, expect } from 'vitest'
import { FSDocument } from '@/fs/document'

describe('FSDocument', () => {
  const mdxContent = `---
title: Test Document
published: true
---
# Hello World
This is a test document.`

  test('parses MDX content and metadata', async () => {
    const doc = new FSDocument(mdxContent, {
      id: 'test',
      uri: 'file:///test'
    })

    expect(doc.id).toBe('test')
    expect(doc.context).toBe('file:///test')
    expect(doc.data.title).toBe('Test Document')
    expect(doc.data.published).toBe(true)
    expect(doc.mdx).toBe(mdxContent)
  })

  test('serializes to JSON-LD format', async () => {
    const doc = new FSDocument(mdxContent, {
      id: 'test',
      uri: 'file:///test'
    })

    const json = doc.toJSON()
    expect(json['@id']).toBe('test')
    expect(json['@context']).toBe('file:///test')
    expect(json.title).toBe('Test Document')
  })

  test('merges updates', async () => {
    const doc = new FSDocument(mdxContent, {
      id: 'test',
      uri: 'file:///test'
    })

    const updated = await doc.merge({
      title: 'Updated Title'
    })

    expect(updated.data.title).toBe('Updated Title')
    expect(updated.data.published).toBe(true)
  })

  test('appends content', async () => {
    const doc = new FSDocument(mdxContent, {
      id: 'test',
      uri: 'file:///test'
    })

    const appended = await doc.append('\n## New Section')
    expect(appended.mdx).toContain('# Hello World')
    expect(appended.mdx).toContain('## New Section')
  })
})