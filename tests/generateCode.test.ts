import {
    generateCode,
    generateMultipleCodes,
    setPrefixRules,
    formatters,
  } from '../src/index';
  
  describe('generateCode', () => {
    // Reset prefix rules before each test
    beforeEach(() => {
      setPrefixRules(null);
    });
  
    it('should generate a code with default options', () => {
      const code = generateCode('TEST');
      expect(code).toMatch(/^TEST-\d{2}-[A-Z0-9]+-[A-Z0-9]{16}$/);
    });
  
    it('should respect custom length', () => {
      const code = generateCode('TEST', { length: 10 });
      const parts = code.split('-');
      expect(parts[3].length).toBe(10); // Random part should be 10 chars
    });
  
    it('should use custom charset', () => {
      const code = generateCode('NUM', { charset: '0123456789' });
      expect(code).toMatch(/^NUM-\d{2}-[A-Z0-9]+-\d+$/);
    });
  
    it('should exclude year if requested', () => {
      const code = generateCode('TEST', { includeYear: false });
      expect(code).not.toMatch(/-23-/); // Assuming current year is 2023
    });
  
    it('should exclude timestamp if requested', () => {
      const code = generateCode('TEST', { includeTimestamp: false });
      const parts = code.split('-');
      expect(parts[2]).toMatch(/[A-Z0-9]{16}/); // Only random part remains
    });
  
    it('should use custom separator', () => {
      const code = generateCode('TEST', { separator: '_' });
      expect(code).toMatch(/^TEST_\d{2}_[A-Z0-9]+_[A-Z0-9]{16}$/);
    });
  
    it('should add checksum if enabled', () => {
      const code = generateCode('TEST', { includeChecksum: true });
      const parts = code.split('-');
      expect(parts[4]).toMatch(/[A-Z0-9]{1}/); // Checksum is 1 char
    });
  
    it('should apply custom formatter', () => {
      const code = generateCode('TEST', { formatter: formatters.compact });
      expect(code).not.toContain('-');
    });
  
    it('should throw if prefix is empty', () => {
      expect(() => generateCode('')).toThrow('Prefix must be a non-empty string');
    });
  
    it('should enforce prefix rules if set', () => {
      setPrefixRules({ minLength: 3, allowedChars: /^[A-Z]+$/ });
      expect(() => generateCode('AB')).toThrow('Prefix must be at least 3 characters');
      expect(() => generateCode('123')).toThrow('Prefix contains invalid characters');
    });
  
    it('should throw if length is invalid', () => {
      expect(() => generateCode('TEST', { length: 5 })).toThrow('Length must be between 8 and 64');
      expect(() => generateCode('TEST', { length: 100 })).toThrow('Length must be between 8 and 64');
    });
  });
  
  describe('generateMultipleCodes', () => {
    it('should generate multiple unique codes', () => {
      const codes = generateMultipleCodes('TEST', 5);
      expect(codes.length).toBe(5);
      expect(new Set(codes).size).toBe(5); // All codes should be unique
    });
  });