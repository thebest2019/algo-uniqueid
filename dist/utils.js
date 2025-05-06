"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCharset = void 0;
exports.generateRandomString = generateRandomString;
exports.computeChecksum = computeChecksum;
exports.defaultCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
/**
 * Generates a random string of specified length using the provided charset
 * @param length Length of the string to generate
 * @param charset Characters to use in the random string
 * @returns Random string
 */
function generateRandomString(length, charset) {
    let result = '';
    const charactersLength = charset.length;
    for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
/**
 * Computes a single-character checksum for the given input string
 * @param input String to compute checksum for
 * @returns Single character checksum
 */
function computeChecksum(input) {
    // Simple implementation - compute a hash and convert to a single character
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    // Get absolute value and mod by 36 to get a single alphanumeric character
    const charCode = Math.abs(hash) % 36;
    // Convert to a single character (0-9, A-Z)
    return charCode < 10
        ? charCode.toString()
        : String.fromCharCode(charCode - 10 + 65);
}
