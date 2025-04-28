import crypto from 'crypto';

/**
 * Password hashing and verification functions
 */
export class PasswordUtils {
  private readonly saltLength: number;
  private readonly iterations: number;
  private readonly keyLength: number;
  private readonly algorithm: string;

  constructor(options: {
    saltLength?: number;
    iterations?: number;
    keyLength?: number;
    algorithm?: string;
  } = {}) {
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
  async hash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // Generate a random salt
      const salt = crypto.randomBytes(this.saltLength).toString('hex');
      
      // Hash the password with the salt
      crypto.pbkdf2(
        password, 
        salt, 
        this.iterations, 
        this.keyLength, 
        this.algorithm, 
        (err, derivedKey) => {
          if (err) return reject(err);
          // Return salt and hash together for verification
          resolve(`${salt}:${derivedKey.toString('hex')}`);
        }
      );
    });
  }

  /**
   * Verify a password against a stored hash
   * @param password The password to verify
   * @param hashWithSalt The stored hash in format 'salt:hash'
   * @returns Promise resolving to boolean
   */
  async verifyHash(password: string, hashWithSalt: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Split the hash string to get salt and hash
      const [salt, storedHash] = hashWithSalt.split(':');
      
      if (!salt || !storedHash) {
        return reject(new Error('Invalid hash format'));
      }
      
      // Hash the input password with the stored salt
      crypto.pbkdf2(
        password, 
        salt, 
        this.iterations, 
        this.keyLength, 
        this.algorithm, 
        (err, derivedKey) => {
          if (err) return reject(err);
          // Compare computed hash with stored hash
          resolve(derivedKey.toString('hex') === storedHash);
        }
      );
    });
  }
}

// Create a singleton instance for convenience
export const passwordUtils = new PasswordUtils();