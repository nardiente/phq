import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_CRYPTO_KEY ?? '';

export const getIPAddress = async () => {
  // Fetch the IP address from an external service
  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();
  return data.ip;
};

// Function to encrypt
const encrypt = (plainText: string): string => {
  return CryptoJS.AES.encrypt(plainText, secretKey).toString();
};

// Function to decrypt
// const decrypt = (cipherToken): string => {
//   return CryptoJS.AES.decrypt(cipherToken, secretKey).toString(
//     CryptoJS.enc.Utf8,
//   )
// }

export const generateToken = async () => {
  // Generate a secure random value
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  const secureRandom = array[0].toString(36); // Convert to base 36 for a shorter string

  // Generate a random value using Math.random()
  const randomValue = Math.random().toString(36).substring(2); // Remove '0.'

  // Get device-specific information
  const userAgent = navigator.userAgent;
  const encryptedUserAgent = encrypt(userAgent); // Encrypt userAgent
  const timestamp = Date.now();
  const ipAddress = await getIPAddress();

  // Combine all values to create a unique token
  const token = `${secureRandom}${randomValue}-${encryptedUserAgent}-${ipAddress}-${timestamp}`;

  // Encrypt the token
  const encryptedToken = encrypt(token); // Encrypt the token

  return encryptedToken; // Return the encrypted token
};
