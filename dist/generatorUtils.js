"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatters = void 0;
exports.setPrefixRules = setPrefixRules;
exports.generateCode = generateCode;
exports.generateMultipleCodes = generateMultipleCodes;
const utils_1 = require("./utils");
let prefixRules = null;
function setPrefixRules(rules) {
    prefixRules = rules;
}
function generateCode(prefix, options = {}) {
    var _a, _b, _c, _d, _e;
    // Make prefix optional
    const prefixValue = prefix || '';
    // Only validate prefix if provided
    if (prefix && prefixRules) {
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
    const length = (_a = options.length) !== null && _a !== void 0 ? _a : 16;
    if (length < 8 || length > 64) {
        throw new Error('Length must be between 8 and 64');
    }
    // Generate components
    const year = ((_b = options.includeYear) !== null && _b !== void 0 ? _b : true)
        ? new Date().getFullYear().toString().slice(2).toUpperCase()
        : '';
    const timestamp = ((_c = options.includeTimestamp) !== null && _c !== void 0 ? _c : true)
        ? Date.now().toString(36).toUpperCase()
        : '';
    const charset = (_d = options.charset) !== null && _d !== void 0 ? _d : utils_1.defaultCharset;
    const randomPart = (0, utils_1.generateRandomString)(length, charset);
    // Build code
    const parts = [prefixValue, year, timestamp, randomPart].filter(Boolean);
    let code = options.formatter
        ? options.formatter(parts)
        : parts.join((_e = options.separator) !== null && _e !== void 0 ? _e : '-');
    // Add checksum if needed
    if (options.includeChecksum) {
        code += '-' + (0, utils_1.computeChecksum)(code);
    }
    return code;
}
function generateMultipleCodes(count, prefix, options = {}) {
    const codes = [];
    for (let i = 0; i < count; i++) {
        codes.push(generateCode(prefix, options));
    }
    return codes;
}
// Built-in formatters
exports.formatters = {
    uppercase: (parts) => parts.join('-').toUpperCase(),
    lowercase: (parts) => parts.join('-').toLowerCase(),
    compact: (parts) => parts.join(''),
    humanReadable: (parts) => parts.join('-').replace(/([a-z])([A-Z])/g, '$1 $2')
};
