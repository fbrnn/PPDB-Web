import { Metadata } from "next";
import { getCurrentUser } from "@/features/auth/auth";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { About } from "@/components/landing/about";
import { Programs } from "@/components/landing/programs";
import { Facilities } from "@/components/landing/facilities";
import { News } from "@/components/landing/news";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Beranda | SPMB Online",
  description:
    "Penerimaan Murid Baru Online - Informasi pendaftaran, jadwal, program keahlian, dan fasilitas sekolah.",
};

export default async function PublicLandingPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar userRole={user?.role} />
      <main className="flex-grow">
        <Hero />
        <About />
        <Programs />
        <Facilities />
        <News />
      </main>
      <Footer />
    </div>
  );
}
