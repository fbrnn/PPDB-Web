import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PrimeProvider } from "@/components/providers/prime-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | SPMB Online",
    default: "SPMB Online - Sistem Penerimaan Murid Baru",
  },
  description:
    "Portal resmi pendaftaran murid dan mahasiswa baru secara online, transparan, dan terintegrasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
        <PrimeProvider>{children}</PrimeProvider>
      </body>
    </html>
  );
}
