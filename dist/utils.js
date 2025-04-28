"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCharset = void 0;
exports.generateRandomString = generateRandomString;
exports.computeChecksum = computeChecksum;
exports.defaultCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function generateRandomString(length, charset) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charset[Math.floor(Math.random() * charset.length)];
    }
    return result;
}
function computeChecksum(code) {
    let sum = 0;
    for (let i = 0; i < code.length; i++) {
        sum += code.charCodeAt(i);
    }
    return (sum % 36).toString(36).toUpperCase();
}
