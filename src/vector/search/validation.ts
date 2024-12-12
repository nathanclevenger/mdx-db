import { VectorSearchOptions } from '@/types'
import { VectorError } from '@/utils/errors'
import { logger } from '@/utils/logger'
import { VECTOR_VALIDATION } from '../constants'

export function validateSearchOptions(options: VectorSearchOptions): void {
  if (!Array.isArray(options.vector)) {
    throw new VectorError('Search vector must be an array')
  }

  if (options.vector.length < VECTOR_VALIDATION.MIN_DIMENSIONS || 
      options.vector.length > VECTOR_VALIDATION.MAX_DIMENSIONS) {
    throw new VectorError(
      `Vector dimensions must be between ${VECTOR_VALIDATION.MIN_DIMENSIONS} and ${VECTOR_VALIDATION.MAX_DIMENSIONS}`
    )
  }

  if (options.k !== undefined) {
    if (!Number.isInteger(options.k) || options.k < 0) {
      throw new VectorError('k must be a non-negative integer')
    }
  }

  if (options.threshold !== undefined) {
    if (typeof options.threshold !== 'number' || 
        options.threshold < VECTOR_VALIDATION.MIN_THRESHOLD || 
        options.threshold > VECTOR_VALIDATION.MAX_THRESHOLD) {
      throw new VectorError(
        `threshold must be between ${VECTOR_VALIDATION.MIN_THRESHOLD} and ${VECTOR_VALIDATION.MAX_THRESHOLD}`
      )
    }
  }

  logger.vector.debug('Search options validated', options)
}