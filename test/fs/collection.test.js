import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import { FSCollection } from '@/fs/collection';
import { Document } from '@/types';
const TEST_DIR = '/tmp/mdxdb-test';
describe('FSCollection', () => {
    let collection;
    beforeEach(async () => {
        await fs.mkdir(TEST_DIR, { recursive: true });
        collection = new FSCollection('file:///test', TEST_DIR);
    });
    afterEach(async () => {
        await fs.rm(TEST_DIR, { recursive: true, force: true });
    });
    // ... rest of the tests
});
//# sourceMappingURL=collection.test.js.map