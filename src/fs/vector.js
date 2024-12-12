import { VectorSearchOptions, VectorMetadata } from '../types';
import { cosineSimilarity } from './similarity';
export async function vectorSearch(documents, options) {
    const results = [];
    for (const doc of documents) {
        if (!doc.embedding?.vector)
            continue;
        const score = cosineSimilarity(options.vector, doc.embedding.vector);
        if (options.threshold && score < options.threshold)
            continue;
        results.push({
            document: doc,
            score
        });
    }
    // Sort by similarity score (highest first)
    results.sort((a, b) => b.score - a.score);
    // Limit results if k is specified
    if (options.k && options.k > 0) {
        return results.slice(0, options.k);
    }
    return results;
}
//# sourceMappingURL=vector.js.map