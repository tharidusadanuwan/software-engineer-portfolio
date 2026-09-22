"use client";

import { useEffect, useState } from "react";

import {
  X,
  Save,
  Loader2,
  UserRound,
  Mail,
  Lock,
} from "lucide-react";

import { Admin } from "@/types/admin";

interface AdminFormProps {
  admin?: Admin | null;
  loading?: boolean;
  onSubmit: (data: {
    name: string;
    email: string;
    password?: string;
  }) => Promise<void>;
  onClose: () => void;
}

export default function AdminForm({
  admin,
  loading = false,
  onSubmit,
  onClose,
}: AdminFormProps) {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  useEffect(() => {
    if (admin) {
      setName(admin.name);
      setEmail(admin.email);
      setPassword("");
    } else {
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [admin]);

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    const data: {
      name: string;
      email: string;
      password?: string;
    } = {
      name: name.trim(),
      email: email.trim(),
    };

    if (password.trim()) {
      data.password =
        password.trim();
    }

    await onSubmit(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-[#111827] shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {admin
                ? "Edit Administrator"
                : "Add Administrator"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {admin
                ? "Update administrator information"
                : "Create a new administrator account"}
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          {/* Name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Name
            </label>

            <div className="relative">
              <UserRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                required
                maxLength={100}
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Administrator name"
                className="w-full rounded-xl border border-slate-700 bg-[#0b1220] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <input
                type="email"
                required
                maxLength={150}
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-slate-700 bg-[#0b1220] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
              {admin && (
                <span className="ml-2 text-xs font-normal text-slate-500">
                  Leave empty to keep current password
                </span>
              )}
            </label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <input
                type="password"
                required={!admin}
                minLength={6}
                maxLength={100}
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value,
                  )
                }
                placeholder={
                  admin
                    ? "Enter new password"
                    : "Enter password"
                }
                className="w-full rounded-xl border border-slate-700 bg-[#0b1220] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Password must contain at least 6
              characters.
            </p>
          </div>

          {/* Security notice */}

          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
            <div className="flex gap-3">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

              <div>
                <p className="text-sm font-medium text-blue-300">
                  Secure administrator account
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Passwords are securely hashed before
                  being stored in the database.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}

              {admin
                ? "Update Admin"
                : "Create Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}