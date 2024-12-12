import { Document, VectorSearchOptions } from '@/types'
import { VectorSearchResult } from '../types'
import { logger } from '@/utils/logger'
import { validateSearchOptions } from './validation'
import { computeSearchResults } from './compute'

export async function vectorSearch(
  documents: Document[],
  options: VectorSearchOptions
): Promise<VectorSearchResult[]> {
  try {
    // Validate search options
    validateSearchOptions(options)

    // Compute similarity scores, sort, and apply filters
    const results = await computeSearchResults(documents, options)

    logger.vector.debug('Vector search completed', {
      totalDocuments: documents.length,
      matchingResults: results.length
    })

    return results
  } catch (error) {
    logger.vector.error('Vector search failed', { error })
    throw error
  }
}