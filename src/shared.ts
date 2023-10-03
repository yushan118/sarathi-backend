import crypto from "crypto";

export const SECRET = "sarathi-secret";

export function randomSalt() {
  return crypto.randomBytes(128).toString("base64");
}

export function authentication(salt: string, password: string) {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
}
