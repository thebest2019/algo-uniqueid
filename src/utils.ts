export const defaultCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generateRandomString(length: number, charset: string): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset[Math.floor(Math.random() * charset.length)];
  }
  return result;
}

export function computeChecksum(code: string): string {
  let sum = 0;
  for (let i = 0; i < code.length; i++) {
    sum += code.charCodeAt(i);
  }
  return (sum % 36).toString(36).toUpperCase();
}