import { checkSSL } from '../src/index';
import { SSLCertificateInfo } from '../src/types';


describe('checkSSL', () => {
    it('should return certificate info for a valid domain', async () => {
        const domain = 'example.com';
        const result = await checkSSL(domain);

        expect(result).toHaveProperty('issuer');
        expect(result).toHaveProperty('validFrom');
        expect(result).toHaveProperty('validTo');
        expect(result).toHaveProperty('subject');
    });

    it('should throw an error for an invalid domain', async () => {
        const invalidDomain = 'invalid-domain';

        await expect(checkSSL(invalidDomain)).rejects.toThrow();
    });
});

it('should throw an error for a domain with no SSL certificate', async () => {
    const noSSLDomain = 'localhost'; // Example of a domain that typically has no SSL
    await expect(checkSSL(noSSLDomain)).rejects.toThrow();
});

it('should return certificate info with correct types', async () => {
    const domain = 'example.com';
    const result: SSLCertificateInfo = await checkSSL(domain);
    expect(typeof result.validFrom).toBe('string');
    expect(typeof result.validTo).toBe('string');
    expect(typeof result.valid).toBe('boolean');
    expect(typeof result.daysRemaining).toBe('number');
});