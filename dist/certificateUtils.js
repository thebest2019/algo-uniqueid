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
exports.checkSSL = checkSSL;
const tls_1 = __importDefault(require("tls"));
/**s
 * Checks SSL certificate details of a given domain.
 * @param {string} domain - The domain name to check (e.g., "example.com")
 * @param {number} port - The port to connect to (default: 443)
 * @returns {Promise<object>} Certificate details
 */
function checkSSL(domain_1) {
    return __awaiter(this, arguments, void 0, function* (domain, port = 443) {
        return new Promise((resolve, reject) => {
            const socket = tls_1.default.connect(port, domain, { servername: domain }, () => {
                const cert = socket.getPeerCertificate();
                if (!cert || !cert.valid_to) {
                    return reject(new Error("No certificate found"));
                }
                const validToDate = new Date(cert.valid_to); // Convert to Date
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
    });
}
