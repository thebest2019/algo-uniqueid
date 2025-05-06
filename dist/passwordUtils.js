"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordUtils = exports.PasswordUtils = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Password hashing and verification functions
 */
class PasswordUtils {
    constructor(options = {}) {
        this.saltLength = options.saltLength || 16;
        this.iterations = options.iterations || 100000;
        this.keyLength = options.keyLength || 64;
        this.algorithm = options.algorithm || 'sha512';
    }
    /**
     * Hash a password using PBKDF2
     * @param password The password to hash
     * @returns Promise resolving to hash in format 'salt:hash'
     */
    hash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // Generate a random salt
                const salt = crypto_1.default.randomBytes(this.saltLength).toString('hex');
                // Hash the password with the salt
                crypto_1.default.pbkdf2(password, salt, this.iterations, this.keyLength, this.algorithm, (err, derivedKey) => {
                    if (err)
                        return reject(err);
                    // Return salt and hash together for verification
                    resolve(`${salt}:${derivedKey.toString('hex')}`);
                });
            });
        });
    }
    /**
     * Verify a password against a stored hash
     * @param password The password to verify
     * @param hashWithSalt The stored hash in format 'salt:hash'
     * @returns Promise resolving to boolean
     */
    verifyHash(password, hashWithSalt) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // Split the hash string to get salt and hash
                const [salt, storedHash] = hashWithSalt.split(':');
                if (!salt || !storedHash) {
                    return reject(new Error('Invalid hash format'));
                }
                // Hash the input password with the stored salt
                crypto_1.default.pbkdf2(password, salt, this.iterations, this.keyLength, this.algorithm, (err, derivedKey) => {
                    if (err)
                        return reject(err);
                    // Compare computed hash with stored hash
                    resolve(derivedKey.toString('hex') === storedHash);
                });
            });
        });
    }
}
exports.PasswordUtils = PasswordUtils;
// Create a singleton instance for convenience
exports.passwordUtils = new PasswordUtils();
