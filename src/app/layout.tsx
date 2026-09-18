import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { PrimeProvider } from "@/components/providers/prime-provider";
import "./globals.css";

const jost = Jost({
  variable: "--font-futura",
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
      className={`${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-red-600 selection:text-white">
        <PrimeProvider>{children}</PrimeProvider>
      </body>
    </html>
  );
}
