# Olympus YRF Subgraph - Agent Guide

## Project Overview

This is a The Graph subgraph for indexing Olympus Protocol's Yield Repurchase Facility (YRF) contracts across multiple versions (1.0, 1.1, 1.2). The subgraph tracks yield adjustments, market creation events, and contract shutdowns.

## Key Architecture

### Contract Versions
- **v1.0**: `0x30A967eB957E5B1eE053B75F1A57ea6bfb2e907E` (uses `dai()` method)
- **v1.1**: `0xcaA3d3E653A626e2656d2E799564fE952D39d855` (uses `reserve()` method)
- **v1.2**: `0x271e35a8555a62F6bA76508E85dfD76D580B0692` (uses `reserve()` method)

### File Structure
```
src/
├── handlers/
│   ├── v1_0-handlers.ts    # Handles v1.0 contract events
│   └── v1_1-handlers.ts    # Handles v1.1+ contract events
├── utils/
│   ├── contract-lookup-v1_0.ts    # v1.0 contract creation logic
│   ├── contract-lookup-v1_1.ts    # v1.1+ contract creation logic
│   ├── token-lookup.ts             # ERC20 token metadata fetching
│   └── decimal-conversion.ts       # BigInt to BigDecimal conversion
```

### Event Handlers
- `NextYieldSet(uint256)` - Yield adjustment events
- `RepoMarket(uint256,uint256)` - Market creation events
- `Shutdown()` - Contract shutdown events

## Development Workflow

### Required Commands After Changes
```bash
# 1. Generate code from schema and ABIs
yarn codegen

# 2. Build the subgraph
yarn build

# 3. Run linting and formatting
yarn lint
```

**IMPORTANT**: Always run all three commands after making any changes to the codebase.

### Key Commands
- `yarn codegen` - Removes generated/ folder and regenerates AssemblyScript types
- `yarn build` - Compiles the subgraph to WebAssembly
- `yarn lint` - Runs ESLint and Prettier for code formatting
- `yarn test` - Runs unit tests (if any exist)
- `yarn deploy` - Deploys to The Graph Studio
- `yarn deploy-local` - Deploys to local graph node

## Schema Entities

- **Contract**: Contract instances with version info and reserve token
- **Token**: ERC20 token metadata (symbol, name, decimals)
- **NextYieldSet**: Yield adjustment events with decimal conversion
- **RepoMarket**: Market creation events with bid amounts
- **Shutdown**: Contract shutdown events

## Key Features

- **Version-aware processing**: Separate handlers for different contract versions
- **Token metadata**: Automatic lookup of ERC20 token information
- **Decimal conversion**: Human-readable decimal amounts alongside raw values
- **Contract tracking**: Version detection and reserve token mapping

## Testing

Run tests with:
```bash
yarn test
```

## Deployment

Environment variables required:
- `SUBGRAPH_VERSION` - Version label for deployment
- `GRAPH_STUDIO_TOKEN` - The Graph Studio deployment key