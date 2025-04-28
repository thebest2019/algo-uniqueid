export interface CodeOptions {
  length?: number;
  charset?: string;
  separator?: string;
  formatter?: (parts: string[]) => string;
  includeYear?: boolean;
  includeTimestamp?: boolean;
  includeChecksum?: boolean;
}

export interface PrefixRules {
  minLength?: number;
  maxLength?: number;
  allowedChars?: RegExp;
}