/**
 * Email Dispatcher for OTP Authentication
 * In development, OTP is prominently logged to the terminal for rapid testing.
 */
export async function sendOtpEmail(email: string, code: string): Promise<boolean> {
  console.log("==================================================");
  console.log(`🔑 [SPMB AUTH] Kode OTP untuk ${email}: ${code}`);
  console.log(`⏰ Berlaku selama 10 menit.`);
  console.log("==================================================");

  // If external email provider API / SMTP is configured in the future,
  // it can be integrated here without modifying the caller.
  return true;
}
