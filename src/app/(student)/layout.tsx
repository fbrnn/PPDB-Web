import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/features/auth/auth";
import { signOutUser } from "@/features/auth/actions";
import { GraduationCap, LayoutDashboard, FileText, LogOut } from "lucide-react";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  async function handleSignOut() {
    "use server";
    await signOutUser();
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Topbar Navigasi Siswa */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-base font-bold text-slate-800 leading-none block">
                    SPMB <span className="text-red-600">Portal</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Area Siswa
                  </span>
                </div>
              </Link>

              <nav className="hidden sm:flex items-center gap-4 text-sm font-medium">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/pendaftaran"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Formulir Pendaftaran</span>
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <div className="text-xs font-bold text-slate-800">
                  {user.email}
                </div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                  Calon Siswa
                </div>
              </div>

              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} SPMB Online. Layanan Penerimaan Murid Baru.
      </footer>
    </div>
  );
}
