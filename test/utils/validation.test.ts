import { describe, test, expect } from 'vitest'
import { validateDocument, validateQueryParams } from '@/utils/validation'
import { ValidationError } from '@/utils/errors'

describe('Validation', () => {
  test('validates document', () => {
    expect(() => validateDocument({
      id: 123 as any
    })).toThrow(ValidationError)

    expect(() => validateDocument({
      mdx: 42 as any
    })).toThrow(ValidationError)

    expect(() => validateDocument({
      id: 'valid',
      mdx: '# Valid'
    })).not.toThrow()
  })

  test('validates query params', () => {
    expect(() => validateQueryParams({
      q: 42 as any
    })).toThrow(ValidationError)

    expect(() => validateQueryParams({
      q: 'valid',
      published: true
    })).not.toThrow()
  })
})