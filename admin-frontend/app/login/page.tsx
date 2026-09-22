import Link from "next/link";
import { ShieldCheck, Code2 } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left */}
        <div className="hidden lg:flex relative overflow-hidden bg-[#0F172A]">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                <Code2 size={23} />
              </div>

              <div>
                <h1 className="font-bold">
                  DevPortfolio
                </h1>

                <p className="text-xs text-slate-500">
                  Admin Panel
                </p>
              </div>
            </div>

            <div className="max-w-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                <ShieldCheck
                  size={30}
                  className="text-blue-400"
                />
              </div>

              <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
                Manage your
                <span className="block text-blue-500">
                  digital portfolio.
                </span>
              </h2>

              <p className="mt-6 leading-7 text-slate-400">
                Manage projects, skills, experience,
                education, services and messages from
                one powerful admin dashboard.
              </p>
            </div>

            <p className="text-sm text-slate-600">
              © 2026 DevPortfolio. Admin Portal.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                <Code2 size={23} />
              </div>

              <div>
                <h1 className="font-bold">
                  DevPortfolio
                </h1>

                <p className="text-xs text-slate-500">
                  Admin Panel
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm font-medium text-blue-400">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold">
                Admin Sign In
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Sign in to access your dashboard.
              </p>
            </div>

            <LoginForm />

            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an admin account?{" "}
              <Link
                href="/signup"
                className="font-medium text-blue-400 transition hover:text-blue-300"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}