import { SHA256 } from 'crypto-js';

export const generateId = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString();
  
  // Create a hash using timestamp and random number
  const hash = SHA256(timestamp + random).toString();
  
  // Return first 12 characters of hash
  return hash.slice(0, 12);
}; 