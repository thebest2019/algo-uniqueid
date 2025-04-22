import { CodeOptions, PrefixRules } from './types';
import { defaultCharset, generateRandomString, computeChecksum } from './utils';

let prefixRules: PrefixRules | null = null;

export function setPrefixRules(rules: PrefixRules | null): void {
  prefixRules = rules;
}

export function generateCode(
  prefix: string,
  options: CodeOptions = {}
): string {
  // Validate prefix
  if (!prefix || typeof prefix !== 'string') {
    throw new Error('Prefix must be a non-empty string');
  }

  if (prefixRules) {
    if (prefixRules.minLength && prefix.length < prefixRules.minLength) {
      throw new Error(`Prefix must be at least ${prefixRules.minLength} characters`);
    }
    if (prefixRules.maxLength && prefix.length > prefixRules.maxLength) {
      throw new Error(`Prefix must be at most ${prefixRules.maxLength} characters`);
    }
    if (prefixRules.allowedChars && !prefixRules.allowedChars.test(prefix)) {
      throw new Error('Prefix contains invalid characters');
    }
  }

  // Validate length
  const length = options.length ?? 16;
  if (length < 8 || length > 64) {
    throw new Error('Length must be between 8 and 64');
  }

  // Generate components
  const year = options.includeYear ?? true 
    ? new Date().getFullYear().toString().slice(2).toUpperCase() 
    : '';
  
  const timestamp = options.includeTimestamp ?? true 
    ? Date.now().toString(36).toUpperCase() 
    : '';

  const charset = options.charset ?? defaultCharset;
  const randomPart = generateRandomString(length, charset);

  // Build code
  const parts = [prefix, year, timestamp, randomPart].filter(Boolean);
  let code = options.formatter 
    ? options.formatter(parts) 
    : parts.join(options.separator ?? '-');

  // Add checksum if needed
  if (options.includeChecksum) {
    code += '-' + computeChecksum(code);
  }

  return code;
}

export function generateMultipleCodes(
  prefix: string,
  count: number,
  options: CodeOptions = {}
): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    codes.push(generateCode(prefix, options));
  }
  return codes;
}

// Built-in formatters
export const formatters = {
  uppercase: (parts: string[]) => parts.join('-').toUpperCase(),
  lowercase: (parts: string[]) => parts.join('-').toLowerCase(),
  compact: (parts: string[]) => parts.join(''),
  humanReadable: (parts: string[]) => parts.join('-').replace(/([a-z])([A-Z])/g, '$1 $2')
};