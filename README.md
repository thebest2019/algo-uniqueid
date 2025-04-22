# Algo UniqueID Generator 🚀

A lightweight, customizable library for generating unique identifiers with prefixes, timestamps, random strings, and checksums. Perfect for order IDs, user codes, transaction references, and more!

[![npm version](https://img.shields.io/npm/v/algo-uniqueid)](https://www.npmjs.com/package/algo-uniqueid)  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)  
[![Tests](https://github.com/mrbest2019/algo-uniqueid/actions/workflows/tests.yml/badge.svg)](https://github.com/mrbest2019/algo-uniqueid/actions)

---

## Features ✨

- ✅ **Customizable format**: Prefix + Year + Timestamp + Random chars  
- ✅ **Batch generation**: Create multiple unique IDs at once  
- ✅ **Validation**: Enforce prefix rules (length, allowed characters)  
- ✅ **Checksum support**: Optional checksum digit for verification  
- ✅ **Multiple formatters**: Uppercase, lowercase, compact, human-readable  
- ✅ **TypeScript support**: Fully typed for better developer experience  

---

## Installation 📦

```bash
npm install algo-uniqueid
# or
yarn add algo-uniqueid
```



## Usage 🛠

### Basic Example

```js
import { generateCode } from 'algo-uniqueid';

const orderId = generateCode('ORD'); 
// Example: "ORD-23-K4X9-7B2F5G8H1J3M6P9Q"
```

### Custom Options

```js
const userId = generateCode('USR', {
  length: 12,                // Random part length (default: 16)
  charset: '0123456789',     // Only numbers
  separator: '_',            // Custom separator
  includeChecksum: true,     // Add a checksum
});
// Example: "USR_23_K4X9_123456789012_A"
```

### Batch Generation

```js
import { generateMultipleCodes } from 'algo-uniqueid';

const batch = generateMultipleCodes('PRD', 5, { length: 10 });
// Returns 5 unique codes like ["PRD-23-K4X9-ABC123DEF4", ...]
```

### Custom Formatters

```js
import { generateCode, formatters } from 'algo-uniqueid';

const compactCode = generateCode('ITEM', { 
  formatter: formatters.compact // Remove separators
});
// Example: "ITEM23K4X9ABC123DEF4"
```

### Prefix Validation Rules

```js
import { setPrefixRules } from 'algo-uniqueid';

setPrefixRules({
  minLength: 3,
  maxLength: 5,
  allowedChars: /^[A-Z]+$/, // Only uppercase letters
});

generateCode('VALID'); // ✅ Works  
generateCode('TOOLONG'); // ❌ Throws error  
generateCode('123'); // ❌ Throws error (invalid chars)
```

---

## API Reference 📖
`generateCode(prefix: string, options?: CodeOptions): string`

Generates a single unique code.

### Options:

| Key              | Type     | Default           | Description                                      |
|------------------|----------|-------------------|--------------------------------------------------|
| length          | number   | 16                | Length of the random part.                      |
| charset         | string   | A-Z0-9            | Characters for random generation.               |
| includeYear     | boolean  | true              | Include 2-digit year (e.g., "23").              |
| includeTimestamp| boolean  | true              | Include timestamp.                              |
| separator       | string   | '-'               | Separator between parts.                        |
| includeChecksum | boolean  | false             | Append a checksum digit.                        |
| formatter       | function | (parts) => parts.join(separator) | Custom formatting function.   |


### Built-in Formatters

```js
formatters.uppercase;      // "PREFIX-23-ABC123-XYZ"  
formatters.lowercase;      // "prefix-23-abc123-xyz"  
formatters.compact;        // "PREFIX23ABC123XYZ"  
formatters.humanReadable;  // "PREFIX 23 ABC123 XYZ"  
```

--- 

## Error Handling ⚠️
The library throws descriptive errors for invalid inputs:
```js
generateCode(''); // ❌ Error: "Prefix must be a non-empty string"
generateCode('AB', { length: 5 }); // ❌ Error: "Length must be between 8 and 64"
```

## Contributing 🤝
PRs and issues welcome!
1. **Fork the repo** 
2. **Install dependencies (`npm install`)**  
3. **Run tests (`npm run test`)**  
  