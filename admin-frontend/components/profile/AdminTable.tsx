"use client";

import {
  Edit3,
  Trash2,
  ShieldCheck,
  Mail,
  CalendarDays,
} from "lucide-react";

import { Admin } from "@/types/admin";

interface AdminTableProps {
  admins: Admin[];
  currentAdminId: number | null;
  onEdit: (admin: Admin) => void;
  onDelete: (admin: Admin) => void;
}

export default function AdminTable({
  admins,
  currentAdminId,
  onEdit,
  onDelete,
}: AdminTableProps) {
  const formatDate = (
    date: string,
  ) => {
    return new Date(date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    );
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#111827]">
      {/* Table Header */}

      <div className="flex shrink-0 items-center justify-between border-b border-slate-800 px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            All Administrators
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Manage administrator accounts
          </p>
        </div>

        <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300">
          {admins.length} Admin
          {admins.length !== 1
            ? "s"
            : ""}
        </span>
      </div>

      {/* Scrollable table */}

      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[850px] border-collapse">
          <thead className="sticky top-0 z-10 bg-[#172033]">
            <tr className="border-b border-slate-800">
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                ID
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Administrator
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Email
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Created
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Updated
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {admins.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-16 text-center"
                >
                  <ShieldCheck className="mx-auto h-10 w-10 text-slate-600" />

                  <p className="mt-3 text-sm text-slate-500">
                    No administrators found.
                  </p>
                </td>
              </tr>
            ) : (
              admins.map((admin) => {
                const isCurrentAdmin =
                  admin.id ===
                  currentAdminId;

                return (
                  <tr
                    key={admin.id}
                    className="border-b border-slate-800/70 transition hover:bg-slate-800/30"
                  >
                    {/* ID */}

                    <td className="px-5 py-4">
                      <span className="font-mono text-sm text-slate-400">
                        #
                        {String(
                          admin.id,
                        ).padStart(3, "0")}
                      </span>
                    </td>

                    {/* Administrator */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-semibold text-blue-400">
                          {admin.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-white">
                              {admin.name}
                            </p>

                            {isCurrentAdmin && (
                              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                                You
                              </span>
                            )}
                          </div>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Administrator
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Mail className="h-4 w-4 text-slate-500" />

                        {admin.email}
                      </div>
                    </td>

                    {/* Created */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <CalendarDays className="h-4 w-4 text-slate-500" />

                        {formatDate(
                          admin.createdAt,
                        )}
                      </div>
                    </td>

                    {/* Updated */}

                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-400">
                        {formatDate(
                          admin.updatedAt,
                        )}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* Edit */}

                        <button
                          onClick={() =>
                            onEdit(admin)
                          }
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-blue-400"
                          title="Edit administrator"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>

                        {/* Delete */}

                        <button
                          onClick={() =>
                            onDelete(admin)
                          }
                          disabled={
                            isCurrentAdmin
                          }
                          className={`rounded-lg p-2 transition ${
                            isCurrentAdmin
                              ? "cursor-not-allowed text-slate-700"
                              : "text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                          }`}
                          title={
                            isCurrentAdmin
                              ? "You cannot delete your own account"
                              : "Delete administrator"
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}