// Importing the 'crypto' module for cryptographic operations
import crypto from "crypto";

// Shared secret for cryptographic operations
export const SECRET = "sarathi-secret";

// Function to generate a random salt for password hashing
export function randomSalt() {

  // Generating 128 random bytes and converting them to base64 string
  return crypto.randomBytes(128).toString("base64");
}

// Function for authenticating a password using a salt
export function authentication(salt: string, password: string) {

   // Creating an HMAC (Hash-based Message Authentication Code) using SHA-256
  // Concatenating salt and password with a "/" separator and hashing it using HMAC


  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)     // Updating with the shared secret
    .digest("hex");     // Generating the hexadecimal digest
}
