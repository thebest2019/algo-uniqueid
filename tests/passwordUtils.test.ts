import { PasswordUtils, passwordUtils } from '../src/passwordUtils';

describe('PasswordUtils', () => {
  // Test the default instance
  describe('default passwordUtils instance', () => {
    it('should hash a password', async () => {
      const password = 'MySecurePassword123!';
      const hashedPassword = await passwordUtils.hash(password);
      
      // Verify format: should be salt:hash
      expect(hashedPassword).toContain(':');
      
      // Split and verify parts
      const [salt, hash] = hashedPassword.split(':');
      expect(salt).toBeTruthy();
      expect(hash).toBeTruthy();
      
      // Salt should be a hex string of expected length (16 bytes = 32 hex chars)
      expect(salt.length).toBe(32);
      expect(/^[0-9a-f]+$/i.test(salt)).toBe(true);
      
      // Hash should be a hex string of expected length (64 bytes = 128 hex chars)
      expect(hash.length).toBe(128);
      expect(/^[0-9a-f]+$/i.test(hash)).toBe(true);
    });

    it('should verify a correct password', async () => {
      const password = 'MySecurePassword123!';
      const hashedPassword = await passwordUtils.hash(password);
      
      const isValid = await passwordUtils.verifyHash(password, hashedPassword);
      expect(isValid).toBe(true);
    });

    it('should reject an incorrect password', async () => {
      const password = 'MySecurePassword123!';
      const wrongPassword = 'WrongPassword456!';
      const hashedPassword = await passwordUtils.hash(password);
      
      const isValid = await passwordUtils.verifyHash(wrongPassword, hashedPassword);
      expect(isValid).toBe(false);
    });

    it('should reject invalid hash format', async () => {
      const password = 'MySecurePassword123!';
      const invalidHash = 'invalid-hash-format';
      
      await expect(passwordUtils.verifyHash(password, invalidHash))
        .rejects.toThrow('Invalid hash format');
    });
  });

  // Test custom configuration
  describe('custom PasswordUtils configuration', () => {
    it('should accept custom parameters', async () => {
      const customUtils = new PasswordUtils({
        saltLength: 8,
        iterations: 10000,
        keyLength: 32,
        algorithm: 'sha256'
      });
      
      const password = 'TestPassword123!';
      const hashedPassword = await customUtils.hash(password);
      
      // Verify format
      const [salt, hash] = hashedPassword.split(':');
      
      // Salt should be 8 bytes = 16 hex chars
      expect(salt.length).toBe(16);
      
      // Hash should be 32 bytes = 64 hex chars
      expect(hash.length).toBe(64);
      
      // Verify the password successfully
      const isValid = await customUtils.verifyHash(password, hashedPassword);
      expect(isValid).toBe(true);
    });
    
    it('should allow cross-verification between instances with same config', async () => {
      // Create two instances with same configuration
      const config = {
        saltLength: 12,
        iterations: 15000,
        keyLength: 48,
        algorithm: 'sha512'
      };
      
      const utils1 = new PasswordUtils(config);
      const utils2 = new PasswordUtils(config);
      
      const password = 'SharedPassword123!';
      const hashedPassword = await utils1.hash(password);
      
      // Verify using the second instance
      const isValid = await utils2.verifyHash(password, hashedPassword);
      expect(isValid).toBe(true);
    });
  });
  
  // Test edge cases
  describe('edge cases', () => {
    it('should handle empty passwords', async () => {
      const password = '';
      const hashedPassword = await passwordUtils.hash(password);
      
      // Verify format is still correct
      expect(hashedPassword).toContain(':');
      
      // Should verify the empty password
      const isValid = await passwordUtils.verifyHash(password, hashedPassword);
      expect(isValid).toBe(true);
    });
    
    it('should handle very long passwords', async () => {
      // Create a 1000 character password
      const password = 'A'.repeat(1000);
      const hashedPassword = await passwordUtils.hash(password);
      
      // Should verify the long password
      const isValid = await passwordUtils.verifyHash(password, hashedPassword);
      expect(isValid).toBe(true);
    });
    
    it('should handle special characters in passwords', async () => {
      const password = 'Special!@#$%^&*()_+{}[]|:;<>,.?/~`';
      const hashedPassword = await passwordUtils.hash(password);
      
      // Should verify the password with special characters
      const isValid = await passwordUtils.verifyHash(password, hashedPassword);
      expect(isValid).toBe(true);
    });
    
    it('should handle Unicode characters in passwords', async () => {
      const password = 'Unicode😀🙏🌍🔒🎵';
      const hashedPassword = await passwordUtils.hash(password);
      
      // Should verify the password with Unicode characters
      const isValid = await passwordUtils.verifyHash(password, hashedPassword);
      expect(isValid).toBe(true);
    });
  });

  // Test error handling
  describe('error handling', () => {
    it('should reject invalid algorithm', async () => {
      const invalidUtils = new PasswordUtils({
        algorithm: 'invalid-algorithm' as any
      });
      
      await expect(invalidUtils.hash('test'))
        .rejects.toThrow();
    });
    
    it('should reject when salt is missing from hash', async () => {
      await expect(passwordUtils.verifyHash('test', 'nosaltpart'))
        .rejects.toThrow('Invalid hash format');
    });
  });
});