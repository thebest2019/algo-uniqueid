export declare const defaultCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
/**
 * Generates a random string of specified length using the provided charset
 * @param length Length of the string to generate
 * @param charset Characters to use in the random string
 * @returns Random string
 */
export declare function generateRandomString(length: number, charset: string): string;
/**
 * Computes a single-character checksum for the given input string
 * @param input String to compute checksum for
 * @returns Single character checksum
 */
export declare function computeChecksum(input: string): string;
