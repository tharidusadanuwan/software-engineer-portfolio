"use client";

import {
  Edit3,
  Trash2,
  Search,
  FolderTree,
  RefreshCw,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Category } from "@/types/category";

interface CategoryTableProps {
  categories: Category[];
  loading: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onRefresh: () => void;
}

export default function CategoryTable({
  categories,
  loading,
  search,
  onSearchChange,
  onEdit,
  onDelete,
  onRefresh,
}: CategoryTableProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#111827]">

      {/* Table Header */}
      <div className="shrink-0 border-b border-slate-800 p-4 sm:p-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h2 className="text-base font-semibold text-white">
              All Categories
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Manage your portfolio project categories.
            </p>
          </div>

          <div className="flex items-center gap-2">

            {/* Search */}
            <div className="relative flex-1 sm:flex-none">
              <Search
                size={16}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-600
                "
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  onSearchChange(
                    event.target.value,
                  )
                }
                placeholder="Search categories..."
                className="
                  h-10
                  w-full
                  rounded-xl
                  border
                  border-slate-800
                  bg-[#0B1220]
                  pl-9
                  pr-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-blue-500/50
                  sm:w-64
                "
              />
            </div>

            {/* Refresh */}
            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-slate-800
                bg-[#0B1220]
                text-slate-500
                transition
                hover:border-slate-700
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
              title="Refresh categories"
            >
              <RefreshCw
                size={17}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          SCROLLABLE TABLE AREA
      ====================================================== */}
      <div className="min-h-0 flex-1 overflow-auto">

        <table className="w-full min-w-[850px] border-collapse">

          {/* Table Head */}
          <thead className="sticky top-0 z-10 bg-[#111827]">
            <tr className="border-b border-slate-800">

              <th className="w-[100px] px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                No.
              </th>

              <th className="min-w-[260px] px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Category
              </th>

              <th className="w-[150px] px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Projects
              </th>

              <th className="w-[150px] px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Status
              </th>

              <th className="w-[150px] px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>

            {/* Loading */}
            {loading && categories.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-16 text-center"
                >
                  <div className="flex flex-col items-center justify-center">

                    <RefreshCw
                      size={22}
                      className="animate-spin text-blue-500"
                    />

                    <p className="mt-3 text-sm text-slate-500">
                      Loading categories...
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {/* Empty */}
            {!loading &&
              categories.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/70 text-slate-600">
                        <FolderTree size={22} />
                      </div>

                      <p className="mt-4 text-sm font-medium text-slate-400">
                        No categories found
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        Try another search or create
                        a new category.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

            {/* Rows */}
            {categories.map(
              (category) => (
                <tr
                  key={category.id}
                  className="
                    border-b
                    border-slate-800/70
                    transition
                    hover:bg-slate-800/30
                  "
                >

                  {/* Number */}
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-slate-400">
                      #{String(
                        category.category_number,
                      ).padStart(2, "0")}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <FolderTree size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                          {category.name}
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-600">
                          Category ID:{" "}
                          {category.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Projects */}
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-400">
                      {category.projectCount}
                    </span>

                    <span className="ml-1 text-xs text-slate-600">
                      {category.projectCount ===
                      1
                        ? "project"
                        : "projects"}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    {category.active ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                        <CheckCircle2
                          size={13}
                        />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-xs font-medium text-slate-500">
                        <XCircle
                          size={13}
                        />
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() =>
                          onEdit(category)
                        }
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-slate-800
                          text-slate-500
                          transition
                          hover:border-blue-500/30
                          hover:bg-blue-500/10
                          hover:text-blue-400
                        "
                        title="Edit category"
                      >
                        <Edit3 size={15} />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          onDelete(category)
                        }
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-slate-800
                          text-slate-500
                          transition
                          hover:border-red-500/30
                          hover:bg-red-500/10
                          hover:text-red-400
                        "
                        title="Delete category"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex shrink-0 items-center justify-between border-t border-slate-800 px-5 py-3">
        <p className="text-xs text-slate-600">
          Showing{" "}
          <span className="font-medium text-slate-400">
            {categories.length}
          </span>{" "}
          categories
        </p>

        <p className="hidden text-xs text-slate-700 sm:block">
          Scroll to view more
        </p>
      </div>
    </div>
  );
}