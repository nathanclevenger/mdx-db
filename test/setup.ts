import { beforeAll, afterAll, beforeEach, afterEach, describe, test, expect, vi } from 'vitest'
import type { ExpectStatic, TestAPI, VitestUtils } from 'vitest'

// Extend the global scope type definitions
declare global {
  var beforeAll: (fn: () => void) => void
  var afterAll: (fn: () => void) => void
  var beforeEach: (fn: () => void) => void
  var afterEach: (fn: () => void) => void
  var describe: (name: string, fn: () => void) => void
  var test: TestAPI
  var expect: ExpectStatic
  var vi: VitestUtils
  var crypto: Crypto
}

// Make Vitest globals available
globalThis.beforeAll = beforeAll
globalThis.afterAll = afterAll
globalThis.beforeEach = beforeEach
globalThis.afterEach = afterEach
globalThis.describe = describe
globalThis.test = test
globalThis.expect = expect
globalThis.vi = vi

// Mock crypto for document IDs
globalThis.crypto = {
  randomUUID: () => Math.random().toString(36).substring(2)
} as Crypto