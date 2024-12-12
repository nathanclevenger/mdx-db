// Query-related types
export interface QueryParams {
  q?: string                 // Full-text search query
  [key: string]: any        // Additional filter parameters
}

export interface QueryOptions {
  limit?: number
  offset?: number
  sort?: string | string[]
}