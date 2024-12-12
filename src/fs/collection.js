import { promises as fs } from 'fs';
import path from 'path';
import { Collection, Document, QueryParams, QueryOptions, VectorSearchOptions } from '@/types';
import { FSDocument } from './document';
import { resolveFilePath, parseQueryParams } from './utils';
import { vectorSearch } from '@/vector/search';
import { defaultEmbeddingModel } from './embedding';
import { logger } from '@/utils/logger';
import { DocumentNotFoundError, ValidationError } from '@/utils/errors';
import { validateDocument, validateQueryParams } from '@/utils/validation';
//# sourceMappingURL=collection.js.map