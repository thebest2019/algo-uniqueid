import { generateRandomString, computeChecksum } from '../src/utils';

describe('generateRandomString', () => {
    it('should generate a string of correct length', () => {
        const str = generateRandomString(10, 'ABC');
        expect(str.length).toBe(10);
        expect(str).toMatch(/^[A-C]{10}$/);
    });
});

describe('computeChecksum', () => {
    it('should compute a single-character checksum', () => {
        const checksum = computeChecksum('TEST123');
        expect(checksum).toMatch(/^[A-Z0-9]$/);
    });
});