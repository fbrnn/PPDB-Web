import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col justify-center items-center p-4">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-2"
        >
          <i className="pi pi-arrow-left text-xs" />
          <span>Kembali ke Beranda Utama</span>
        </Link>
      </div>

      <LoginForm />

      <footer className="mt-8 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} SPMB Online. Hak cipta dilindungi undang-undang.
      </footer>
    </main>
  );
}
