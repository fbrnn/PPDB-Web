import crypto from "crypto";

export function generateOtpCode(length: number = 6): string {
  // Generate cryptographically secure random 6-digit numerical code
  const digits = "0123456789";
  let code = "";
  const randomBytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    code += digits[randomBytes[i] % digits.length];
  }
  return code;
}
