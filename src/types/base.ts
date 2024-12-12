// Common base types used across the system
export interface JSONLDMeta {
  id: string
  context: string | Record<string, any>
  type?: string
}