import tls from 'tls';
import { SSLCertificateInfo } from './types';


/**s
 * Checks SSL certificate details of a given domain.
 * @param {string} domain - The domain name to check (e.g., "example.com")
 * @param {number} port - The port to connect to (default: 443)
 * @returns {Promise<object>} Certificate details
 */
export async function checkSSL(domain: string, port: number = 443): Promise<SSLCertificateInfo> {
    return new Promise((resolve, reject) => {
        const socket = tls.connect(port, domain, { servername: domain }, () => {
            const cert = socket.getPeerCertificate();
            if (!cert || !cert.valid_to) {
                return reject(new Error("No certificate found"));
            }

            const validToDate = new Date(cert.valid_to);  // Convert to Date
            const now = new Date();
            const daysRemaining = Math.ceil((+validToDate - +now) / (1000 * 60 * 60 * 24));

            resolve({
                valid: now < validToDate,
                validFrom: cert.valid_from,
                validTo: cert.valid_to,
                daysRemaining,
                issuer: cert.issuer,
                subject: cert.subject
            });

            socket.end();
        });

        socket.on('error', reject);
    });
}
