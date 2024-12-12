import { describe, test, expect, vi } from 'vitest'
import { defaultEmbeddingModel } from '@/fs/embedding'
import { openai } from '@ai-sdk/openai'

// Mock OpenAI SDK
vi.mock('@ai-sdk/openai', () => ({
  openai: {
    embedding: vi.fn().mockReturnValue({
      embed: vi.fn().mockResolvedValue({
        embedding: new Array(256).fill(0).map((_, i) => i / 256)
      })
    })
  }
}))

describe('Embedding Model', () => {
  test('generates embeddings with correct dimensions', async () => {
    const text = 'Hello world'
    const embedding = await defaultEmbeddingModel.embed(text)
    
    expect(embedding).toHaveLength(256)
    expect(embedding.every(n => typeof n === 'number')).toBe(true)
  })

  test('processes batch embeddings', async () => {
    const texts = ['Hello', 'World']
    const embeddings = await defaultEmbeddingModel.embedBatch(texts)
    
    expect(embeddings).toHaveLength(2)
    expect(embeddings[0]).toHaveLength(256)
    expect(embeddings[1]).toHaveLength(256)
  })

  test('uses correct model configuration', async () => {
    await defaultEmbeddingModel.embed('test')
    
    expect(openai.embedding).toHaveBeenCalledWith(
      'text-embedding-3-large',
      { dimensions: 256 }
    )
  })
})