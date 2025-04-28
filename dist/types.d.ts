export interface CodeOptions {
    length?: number;
    charset?: string;
    includeYear?: boolean;
    includeTimestamp?: boolean;
    separator?: string;
    includeChecksum?: boolean;
    formatter?: (parts: string[]) => string;
}
export interface PrefixRules {
    minLength?: number;
    maxLength?: number;
    allowedChars?: RegExp;
}
