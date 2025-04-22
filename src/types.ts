export interface CodeOptions {
    length?: number;          // Length of random part (default: 16)
    charset?: string;         // Custom charset (default: A-Z0-9)
    includeYear?: boolean;    // Include 2-digit year (default: true)
    includeTimestamp?: boolean; // Include timestamp (default: true)
    separator?: string;       // Separator between parts (default: '-')
    includeChecksum?: boolean; // Add a checksum (default: false)
    formatter?: (parts: string[]) => string; // Custom formatting
  }
  
  export interface PrefixRules {
    minLength?: number;       // Minimum prefix length
    maxLength?: number;       // Maximum prefix length
    allowedChars?: RegExp;    // Regex for allowed chars
  }