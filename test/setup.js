import { beforeAll, afterAll, beforeEach, afterEach, describe, test, expect, vi } from 'vitest';
// Make Vitest globals available
globalThis.beforeAll = beforeAll;
globalThis.afterAll = afterAll;
globalThis.beforeEach = beforeEach;
globalThis.afterEach = afterEach;
globalThis.describe = describe;
globalThis.test = test;
globalThis.expect = expect;
globalThis.vi = vi;
// Mock crypto for document IDs
globalThis.crypto = {
    randomUUID: () => Math.random().toString(36).substring(2)
};
//# sourceMappingURL=setup.js.map