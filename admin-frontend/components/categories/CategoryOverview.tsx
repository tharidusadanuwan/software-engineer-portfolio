"use client";

import {
  FolderTree,
  CheckCircle2,
  XCircle,
  Plus,
} from "lucide-react";

interface CategoryOverviewProps {
  total: number;
  active: number;
  inactive: number;
  onAdd: () => void;
}

export default function CategoryOverview({
  total,
  active,
  inactive,
  onAdd,
}: CategoryOverviewProps) {
  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-blue-400">
            Portfolio Management
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Categories
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Create and manage the categories used to
            organize your portfolio projects.
          </p>
        </div>

        {/* Add Button */}
        <button
          type="button"
          onClick={onAdd}
          className="
            flex
            h-11
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-blue-600/10
            transition
            hover:bg-blue-500
            active:scale-[0.98]
          "
        >
          <Plus size={18} />

          Add Category
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total */}
        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Categories
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                {total}
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <FolderTree size={20} />
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Active Categories
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                {active}
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>

        {/* Inactive */}
        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Inactive Categories
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                {inactive}
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <XCircle size={20} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}