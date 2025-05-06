# Algo UniqueID Generator 🚀

A lightweight, customizable library for generating unique identifiers with optional prefixes, timestamps, random strings, checksums, and secure password utilities. Perfect for order IDs, user codes, transaction references, authentication systems, and more!

[![npm version](https://img.shields.io/npm/v/algo-uniqueid)](https://www.npmjs.com/package/algo-uniqueid)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Features ✨

- ✅ **Customizable format**: Optional Prefix + Year + Timestamp + Random chars  
- ✅ **Password utilities**: Secure hashing and verification built-in  
- ✅ **SSL check utilities**: Checking ssl certificate information built-in  
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

// With prefix
const orderId = generateCode('ORD'); 
// Example: "ORD-23-K4X9-7B2F5G8H1J3M6P9Q"

// Without prefix (new feature!)
const uniqueId = generateCode(); 
// Example: "23-K4X9-7B2F5G8H1J3M6P9Q"
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

// Note: Updated signature, count is the first parameter now
const batch = generateMultipleCodes(5, 'PRD', { length: 10 });
// Returns 5 unique codes like ["PRD-23-K4X9-ABC123DEF4", ...]

// Without prefix
const batchWithoutPrefix = generateMultipleCodes(5, { length: 10 });
// Returns 5 unique codes like ["23-K4X9-ABC123DEF4", ...]
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
generateCode(); // ✅ Works with no prefix  
```

### Password Utilities (New Feature!) 🔐

```js
import { passwordUtils } from 'algo-uniqueid';

// Hash a password
const hashedPassword = await passwordUtils.hash('MySecurePassword123!');
// Example: "a1b2c3d4e5f6g7h8:1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7"

// Verify a password
const isValid = await passwordUtils.verifyHash('MySecurePassword123!', hashedPassword);
// true if password matches, false otherwise
```

### Custom Password Security Settings

```js
import { PasswordUtils } from 'algo-uniqueid';

// Create a custom password utility instance with specific security settings
const customPasswordUtils = new PasswordUtils({
  saltLength: 32,      // Length of salt in bytes (default: 16)
  iterations: 150000,  // PBKDF2 iterations (default: 100000)
  keyLength: 128,      // Output key length in bytes (default: 64)
  algorithm: 'sha512'  // Hashing algorithm (default: 'sha512')
});

// Use custom instance for higher security needs
const enhanced = await customPasswordUtils.hash('SuperSecretPassword!');
```

---

## API Reference 📖

### Code Generation

`generateCode(prefix?: string, options?: CodeOptions): string`

Generates a single unique code with an optional prefix.

### Options:

| Key              | Type     | Default                          | Description                        |
| ---------------- | -------- | -------------------------------- | ---------------------------------- |
| length           | number   | 16                               | Length of the random part.         |
| charset          | string   | A-Z0-9                           | Characters for random generation.  |
| includeYear      | boolean  | true                             | Include 2-digit year (e.g., "23"). |
| includeTimestamp | boolean  | true                             | Include timestamp.                 |
| separator        | string   | '-'                              | Separator between parts.           |
| includeChecksum  | boolean  | false                            | Append a checksum digit.           |
| formatter        | function | (parts) => parts.join(separator) | Custom formatting function.        |


### Built-in Formatters

```js
formatters.uppercase;      // "PREFIX-23-ABC123-XYZ"  
formatters.lowercase;      // "prefix-23-abc123-xyz"  
formatters.compact;        // "PREFIX23ABC123XYZ"  
formatters.humanReadable;  // "PREFIX 23 ABC123 XYZ"  
```

### Password Utilities

`passwordUtils.hash(password: string): Promise<string>`

Hashes a password using PBKDF2 with a random salt.

`passwordUtils.verifyHash(password: string, hashWithSalt: string): Promise<boolean>`

Verifies a password against a stored hash.

`new PasswordUtils(options?: PasswordUtilsOptions)`

Creates a custom instance with specific security settings.

#### Password Options:

| Key        | Type   | Default  | Description                           |
| ---------- | ------ | -------- | ------------------------------------- |
| saltLength | number | 16       | Length of salt in bytes.              |
| iterations | number | 100000   | PBKDF2 iterations count.              |
| keyLength  | number | 64       | Output key length in bytes.           |
| algorithm  | string | 'sha512' | Hash algorithm (sha512, sha256, etc). |

--- 

### checkSSL  Utilities

`checkSSL(domain: string, port?: number): Promise<SSLCertificateInfo>`

This utility has **no external dependencies**. It uses only the built-in `tls` module.

```js
import { checkSSL } from 'algo-uniqueid';

const domain = 'example.com';

checkSSL(domain)
  .then(info => console.log(info))
  .catch(err => console.error(err));

// Output
{
  "valid": true,
  "validFrom": "May 1 00:00:00 2025 GMT",
  "validTo": "Jul 30 23:59:59 2025 GMT",
  "daysRemaining": 85,
  "issuer": {
    "O": "Let's Encrypt",
    "CN": "R3"
  },
  "subject": {
    "CN": "example.com"
  }
}
```


## Contributing 🤝
PRs and issues welcome!
1. **Fork the repo** 
2. **Install dependencies (`npm install`)**  
3. **Run tests (`npm run test`)**