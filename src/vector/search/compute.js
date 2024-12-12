import { Document, VectorSearchOptions } from '@/types';
import { VectorSearchResult } from '../types';
import { cosineSimilarity } from '../similarity';
import { matchesFilter } from '../filter';
import { logger } from '@/utils/logger';
import { EPSILON } from '../constants';
export async function computeSearchResults(documents, options) {
    const results = [];
    for (const doc of documents) {
        if (!doc.embedding?.vector) {
            logger.vector.debug('Skipping document without embedding', { id: doc.id });
            continue;
        }
        try {
            const score = cosineSimilarity(options.vector, doc.embedding.vector);
            // Apply similarity threshold with epsilon
            if (options.threshold && score < options.threshold - EPSILON) {
                continue;
            }
            // Apply document filter if provided
            if (options.filter && !matchesFilter(doc, options.filter)) {
                continue;
            }
            results.push({ document: doc, score });
        }
        catch (error) {
            logger.vector.error('Error computing similarity', {
                error,
                documentId: doc.id
            });
            continue;
        }
    }
    // Sort by similarity score (highest first)
    const sortedResults = [...results].sort((a, b) => b.score - a.score);
    // Apply k limit if specified
    if (options.k && options.k > 0) {
        return sortedResults.slice(0, options.k);
    }
    return sortedResults;
}
//# sourceMappingURL=compute.js.map