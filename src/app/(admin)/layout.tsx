import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/features/auth/auth";
import { signOutUser } from "@/features/auth/actions";
import {
  ShieldAlert,
  LayoutDashboard,
  Users,
  LogOut,
  ExternalLink,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();

  async function handleSignOut() {
    "use server";
    await signOutUser();
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Navbar Admin */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2.5 font-bold text-base"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <span>
                  Admin <span className="text-blue-400">SPMB</span>
                </span>
              </Link>

              <nav className="hidden sm:flex items-center gap-2 text-xs font-medium">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/admin/pendaftar"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span>Data Pendaftar</span>
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 transition-colors ml-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Lihat Web Utama</span>
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <div className="text-xs font-semibold text-white">
                  {admin.email}
                </div>
                <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                  {admin.role}
                </div>
              </div>

              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-5 text-center text-xs text-slate-400">
        Panel Administrator SPMB Online &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
