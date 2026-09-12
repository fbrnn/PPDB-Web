import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/auth";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke sistem penerimaan murid baru (SPMB) dengan email OTP.",
};

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
      redirect("/admin/dashboard");
    } else {
      redirect("/dashboard");
    }
  }

  return (
    <main className="min-h-screen relative flex flex-col justify-center items-center p-4">
      {/* Full Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Overlay sangat tipis hanya agar teks tidak tenggelam jika gambar terlalu terang */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Main Content (Centered) */}
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-white/70 font-medium tracking-wide drop-shadow-md">
          &copy; {new Date().getFullYear()} SPMB SMK PGRI 2 Mejayan.
        </footer>
      </div>
    </main>
  );
}
