/**
 * Password hashing and verification functions
 */
export declare class PasswordUtils {
    private readonly saltLength;
    private readonly iterations;
    private readonly keyLength;
    private readonly algorithm;
    constructor(options?: {
        saltLength?: number;
        iterations?: number;
        keyLength?: number;
        algorithm?: string;
    });
    /**
     * Hash a password using PBKDF2
     * @param password The password to hash
     * @returns Promise resolving to hash in format 'salt:hash'
     */
    hash(password: string): Promise<string>;
    /**
     * Verify a password against a stored hash
     * @param password The password to verify
     * @param hashWithSalt The stored hash in format 'salt:hash'
     * @returns Promise resolving to boolean
     */
    verifyHash(password: string, hashWithSalt: string): Promise<boolean>;
}
export declare const passwordUtils: PasswordUtils;
