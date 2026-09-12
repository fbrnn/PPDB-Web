import nodemailer from "nodemailer";

/**
 * Email Dispatcher for OTP Authentication
 */
export async function sendOtpEmail(email: string, code: string): Promise<boolean> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Fallback to console jika SMTP belum disetting di .env.local
  if (!user || !pass || user === "email.anda@gmail.com") {
    console.log("==================================================");
    console.log(`🔑 [SPMB AUTH] (MOCK) Kode OTP untuk ${email}: ${code}`);
    console.log(`⏰ Berlaku selama 10 menit.`);
    console.log("==================================================");
    console.log("⚠️ Peringatan: Konfigurasi SMTP belum diisi di .env.local, email tidak terkirim beneran.");
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"SPMB SMK PGRI 2 Mejayan" <${user}>`,
      to: email,
      subject: "Kode Verifikasi OTP Pendaftaran SPMB",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #0f172a; text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">Verifikasi Pendaftaran SPMB</h2>
          <p style="color: #334155; font-size: 16px; line-height: 1.5;">Halo,</p>
          <p style="color: #334155; font-size: 16px; line-height: 1.5;">Gunakan kode OTP berikut untuk masuk ke sistem pendaftaran SPMB SMK PGRI 2 Mejayan:</p>
          
          <div style="text-align: center; margin: 35px 0;">
            <span style="display: inline-block; font-size: 36px; font-weight: 800; color: #2563eb; letter-spacing: 8px; padding: 15px 35px; background-color: #eff6ff; border-radius: 10px; border: 1px dashed #93c5fd;">${code}</span>
          </div>
          
          <p style="color: #ef4444; font-size: 14px; text-align: center; margin-bottom: 5px;">Kode ini hanya berlaku selama <b>10 menit</b>.</p>
          <p style="color: #334155; font-size: 14px; text-align: center;"><b>PENTING:</b> Jangan berikan kode ini kepada siapa pun, termasuk pihak sekolah.</p>
          
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
          <p style="color: #64748b; font-size: 12px; text-align: center;">Ini adalah pesan otomatis, mohon tidak membalas email ini.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("❌ Error mengirim email OTP via Nodemailer:", error);
    return false;
  }
}
