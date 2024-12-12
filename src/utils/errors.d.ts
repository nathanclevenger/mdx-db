export declare class MDXDBError extends Error {
    constructor(message: string, details?: Record<string, any>);
}
export declare class DocumentNotFoundError extends MDXDBError {
    constructor(id: string, collection?: string);
}
export declare class DocumentValidationError extends MDXDBError {
    constructor(message: string, violations: Record<string, string>);
}
export declare class CollectionError extends MDXDBError {
    constructor(message: string, collection: string);
}
export declare class CollectionNotFoundError extends CollectionError {
    constructor(uri: string);
}
export declare class ProviderError extends MDXDBError {
    constructor(message: string, provider: string);
}
export declare class ProviderNotFoundError extends ProviderError {
    constructor(scheme: string);
}
export declare class VectorError extends MDXDBError {
    constructor(message: string, details?: Record<string, any>);
}
export declare class EmbeddingError extends VectorError {
    constructor(message: string, model?: string);
}
export declare class APIError extends MDXDBError {
    status?: number | undefined;
    endpoint?: string | undefined;
    constructor(message: string, status?: number | undefined, endpoint?: string | undefined);
}
export declare class AuthenticationError extends APIError {
    constructor(endpoint: string);
}
export declare class ValidationError extends MDXDBError {
    field?: string | undefined;
    value?: any | undefined;
    constructor(message: string, field?: string | undefined, value?: any | undefined);
}
//# sourceMappingURL=errors.d.ts.map