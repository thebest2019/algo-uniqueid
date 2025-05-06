import tls from 'tls';
export interface CodeOptions {
    length?: number;
    charset?: string;
    separator?: string;
    formatter?: (parts: string[]) => string;
    includeYear?: boolean;
    includeTimestamp?: boolean;
    includeChecksum?: boolean;
}
export interface PrefixRules {
    minLength?: number;
    maxLength?: number;
    allowedChars?: RegExp;
}
export interface SSLCertificateInfo {
    valid: boolean;
    validFrom: string;
    validTo: string;
    daysRemaining: number;
    issuer: tls.PeerCertificate['issuer'];
    subject: tls.PeerCertificate['subject'];
}
