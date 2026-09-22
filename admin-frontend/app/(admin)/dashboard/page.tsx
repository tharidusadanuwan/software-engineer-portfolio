"use client";

import { useEffect, useState } from "react";

interface Admin {
  id: number;
  name: string;
  email: string;
}

export default function DashboardPage() {
  const [admin, setAdmin] =
    useState<Admin | null>(null);

  useEffect(() => {
    const user =
      localStorage.getItem("admin_user");

    if (user) {
      setAdmin(JSON.parse(user));
    }
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-400">
          Overview
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Welcome back, {admin?.name || "Admin"}.
          Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
          <p className="text-sm text-slate-500">
            Projects
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            0
          </h2>

          <p className="mt-2 text-xs text-slate-600">
            Portfolio projects
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
          <p className="text-sm text-slate-500">
            Skills
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            0
          </h2>

          <p className="mt-2 text-xs text-slate-600">
            Technical skills
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
          <p className="text-sm text-slate-500">
            Experience
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            0
          </h2>

          <p className="mt-2 text-xs text-slate-600">
            Work experience
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
          <p className="text-sm text-slate-500">
            Messages
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            0
          </h2>

          <p className="mt-2 text-xs text-slate-600">
            Contact messages
          </p>
        </div>

      </div>

      {/* Welcome Card */}
      <div className="mt-6 rounded-2xl border border-slate-800 bg-[#111827] p-6">
        <h2 className="text-lg font-semibold">
          Admin Control Center
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Manage your professional profile, projects,
          technical skills, experience, education,
          certifications, services and incoming
          messages from this dashboard.
        </p>
      </div>
    </div>
  );
}