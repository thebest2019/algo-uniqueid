import { SSLCertificateInfo } from './types';
/**s
 * Checks SSL certificate details of a given domain.
 * @param {string} domain - The domain name to check (e.g., "example.com")
 * @param {number} port - The port to connect to (default: 443)
 * @returns {Promise<object>} Certificate details
 */
export declare function checkSSL(domain: string, port?: number): Promise<SSLCertificateInfo>;
