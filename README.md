# @mdx.do/db

A powerful MDX-based database that treats MDX documents as collections, with built-in support for JSON-LD, vector search, and multiple storage backends.

[![npm version](https://badge.fury.io/js/@mdx.do%2Fdb.svg)](https://www.npmjs.com/package/@mdx.do/db)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 📝 **MDX-Native**: Built on top of [@mdx.do/mdx](https://npmjs.com/package/@mdx.do/mdx) for first-class MDX support
- 🔍 **Vector Search**: Built-in support for semantic search using embeddings
- 🌐 **JSON-LD**: Native support for linked data through JSON-LD conventions
- 🔄 **Multiple Backends**: Support for both filesystem and HTTP/API backends
- 🎯 **Type-Safe**: Written in TypeScript with comprehensive type definitions
- ⚡ **Async/Await**: Modern Promise-based API
- 🔒 **Error Handling**: Comprehensive error handling with detailed error types
- 📊 **Debugging**: Built-in logging and debugging support

## Installation

```bash
npm install @mdx.do/db
```

## Quick Start

```typescript
import { db } from '@mdx.do/db'

// Create a collection
const posts = db('https://example.com/posts')

// Create a document
const post = await posts.create({
  mdx: '# Hello World\nThis is my first post!',
  data: {
    title: 'Hello World',
    published: true
  }
})

// Search documents
const results = await posts.search('hello')

// Query with filters
const published = await posts.find({ published: true })

// Vector search
const similar = await posts.semanticSearch('concept', {
  k: 5,
  threshold: 0.7
})
```

## Configuration

### Environment Variables

- `MDXDB_URL`: Default base URL for collections
- `MDXDB_TOKEN`: API authentication token

### Custom Configuration

```typescript
import { createDatabase } from '@mdx.do/db'

const db = createDatabase({
  base: 'https://example.com',
  apiKey: 'your-api-key',
  // For filesystem provider
  basePath: '/path/to/data'
})
```

## API Reference

### Database

The main database function creates and manages collections:

```typescript
// Using URL
const posts = db('https://example.com/posts')

// Using proxy syntax
const posts = db.posts

// Custom configuration
const posts = db('https://example.com/posts', {
  apiKey: 'custom-key'
})
```

### Collection

Collections provide CRUD operations and querying capabilities:

#### Basic Operations

```typescript
// Get a document
const doc = await collection.get('doc-id')

// Create a document
const doc = await collection.create({
  mdx: '# New Document',
  data: { title: 'New' }
})

// Update a document
const updated = await collection.update('doc-id', {
  data: { published: true }
})

// Delete a document
await collection.delete('doc-id')
```

#### Querying

```typescript
// List all documents
const docs = await collection.list()

// Search by text
const results = await collection.search('query')

// Filter documents
const published = await collection.find({ published: true })

// Namespace search
const allDocs = await collection.namespace()
```

### Vector Search

Built-in support for semantic search using embeddings:

```typescript
// Search using vector
const results = await collection.vectorSearch({
  vector: [0.1, 0.2, ...],
  k: 10,
  threshold: 0.8
})

// Semantic search using text
const similar = await collection.semanticSearch('concept', {
  k: 5,
  threshold: 0.7
})
```

### Document Interface

Documents follow JSON-LD conventions and include MDX capabilities:

```typescript
interface Document {
  // JSON-LD metadata
  id: string
  context: string | Record<string, any>
  type?: string
  
  // MDX content
  mdx: string
  data: Record<string, any>
  
  // React components
  default: ComponentType<any>
  markdown: ComponentType<any>
  
  // Operations
  merge(update: Record<string, any>): Promise<Document>
  append(content: string): Promise<Document>
}
```

## Providers

### Filesystem Provider

```typescript
import { db } from '@mdx.do/db/fs'

const posts = db('file:///posts', {
  basePath: '/path/to/data'
})
```

### HTTP/API Provider

```typescript
import { db } from '@mdx.do/db'

const posts = db('https://example.com/posts', {
  apiKey: 'your-api-key',
  apiURI: uri => `${uri}.json` // Custom API endpoint
})
```

## Error Handling

The library provides detailed error types for better error handling:

```typescript
try {
  await collection.get('non-existent')
} catch (error) {
  if (error instanceof DocumentNotFoundError) {
    console.log('Document not found:', error.message)
  } else if (error instanceof ValidationError) {
    console.log('Validation failed:', error.message)
  }
}
```

## Debugging

Enable debug logging by setting the DEBUG environment variable:

```bash
# Enable all debug logs
DEBUG=mdxdb:* npm test

# Enable specific components
DEBUG=mdxdb:fs:*,mdxdb:vector:* npm test
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with debug output
npm run debug

# Run tests with coverage
npm run test:coverage
```

## License

MIT © [MDX.do](https://mdx.do)