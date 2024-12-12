import type { MDXResult } from '@mdx.do/mdx'
import type { JSONLDMeta } from './base'
import type { EmbeddedDocument } from './embedding'

export interface Document extends MDXResult, EmbeddedDocument {
  // Document metadata following JSON-LD conventions (without @ prefix)
  id: string
  context: string | Record<string, any>
  type?: string
  
  // Serialization methods
  toJSON(): Record<string, any> & { 
    '@id': string
    '@context': string | Record<string, any>
    '@type'?: string 
  }
}