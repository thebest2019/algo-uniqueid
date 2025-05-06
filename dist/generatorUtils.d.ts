import { CodeOptions, PrefixRules } from './types';
export declare function setPrefixRules(rules: PrefixRules | null): void;
export declare function generateCode(prefix?: string, options?: CodeOptions): string;
export declare function generateMultipleCodes(count: number, prefix?: string, options?: CodeOptions): string[];
export declare const formatters: {
    uppercase: (parts: string[]) => string;
    lowercase: (parts: string[]) => string;
    compact: (parts: string[]) => string;
    humanReadable: (parts: string[]) => string;
};
