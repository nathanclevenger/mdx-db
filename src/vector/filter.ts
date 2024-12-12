import { Document } from '@/types'
import { logger } from '@/utils/logger'

export function matchesFilter(doc: Document, filter: Record<string, any>): boolean {
  try {
    const matches = Object.entries(filter).every(([key, value]) => {
      if (key in doc.data) {
        return doc.data[key] === value
      }
      return false
    })

    logger.vector.debug('Filter applied', {
      documentId: doc.id,
      filter,
      matches
    })

    return matches
  } catch (error) {
    logger.vector.error('Filter application failed', {
      documentId: doc.id,
      filter,
      error
    })
    return false
  }
}