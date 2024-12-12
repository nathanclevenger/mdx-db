import debug from 'debug'

// Create namespaced loggers
const createLogger = (namespace: string) => ({
  debug: debug(`mdxdb:${namespace}:debug`),
  info: debug(`mdxdb:${namespace}:info`),
  warn: debug(`mdxdb:${namespace}:warn`),
  error: debug(`mdxdb:${namespace}:error`)
})

export const logger = {
  fs: createLogger('fs'),
  fetch: createLogger('fetch'),
  vector: createLogger('vector'),
  db: createLogger('db')
}