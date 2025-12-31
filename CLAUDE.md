# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package

Published as `@quilltap/qtap-plugin-gab-ai` (public npm package).

## Build Commands

```bash
npm run build    # Bundle TypeScript to index.js using esbuild
npm run clean    # Remove built index.js
```

## Architecture

This is a Quilltap LLM provider plugin that integrates Gab AI's API. The plugin uses an OpenAI-compatible API pattern.

### Key Files

- **index.ts** - Plugin entry point exporting the `LLMProviderPlugin` interface with metadata, config, capabilities, and factory methods
- **provider.ts** - `GabAIProvider` class extending `OpenAICompatibleProvider` from `@quilltap/plugin-utils` with Gab-specific config (base URL: `https://gab.ai/v1`)
- **types.ts** - Re-exports types from `@quilltap/plugin-types`
- **manifest.json** - Plugin metadata including compatibility requirements (Quilltap >=1.7.0, Node >=18.0.0)
- **icon.tsx** - React component for the provider icon

### Build System

esbuild bundles the plugin to CommonJS format. External packages (`@quilltap/plugin-types`, `@quilltap/plugin-utils`, React, Next.js, zod) are provided at runtime by the main Quilltap app and should not be bundled.

### Plugin Interface

The plugin exports:
- `metadata` - Provider name, display name, colors, abbreviation
- `config` - API key requirements
- `capabilities` - Supports chat only (no image generation, embeddings, or web search)
- `attachmentSupport` - Text-only, no file attachments
- `createProvider()` - Factory for GabAIProvider instances
- `getAvailableModels()` - Fetches models from Gab AI API
- `validateApiKey()` - Validates API credentials
- `formatTools()` / `parseToolCalls()` - OpenAI-format tool handling

### Dependencies

Runtime dependencies (`@quilltap/plugin-utils`, React, Next.js, zod) are provided by the Quilltap host application. The OpenAI SDK is provided transitively via `@quilltap/plugin-utils`.
