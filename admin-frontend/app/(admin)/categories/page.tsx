"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  X,
  Trash2,
  Loader2,
} from "lucide-react";

import { api } from "@/lib/api";

import {
  Category,
} from "@/types/category";

import CategoryOverview from "@/components/categories/CategoryOverview";
import CategoryTable from "@/components/categories/CategoryTable";
import CategoryForm from "@/components/categories/CategoryForm";

export default function CategoriesPage() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [formOpen, setFormOpen] =
    useState(false);

  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [deleteCategory, setDeleteCategory] =
    useState<Category | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  // =========================================================
  // FETCH CATEGORIES
  // =========================================================

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get("/categories");

      setCategories(
        response.data.categories || [],
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Failed to load categories.";

      setError(
        Array.isArray(message)
          ? message.join(", ")
          : message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredCategories =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return categories;
      }

      return categories.filter(
        (category) =>
          category.name
            .toLowerCase()
            .includes(query) ||
          String(
            category.category_number,
          ).includes(query),
      );
    }, [categories, search]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const total = categories.length;

  const active = categories.filter(
    (category) => category.active,
  ).length;

  const inactive = categories.filter(
    (category) => !category.active,
  ).length;

  // =========================================================
  // ADD
  // =========================================================

  const handleAdd = () => {
    setEditingCategory(null);
    setFormOpen(true);
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (
    category: Category,
  ) => {
    setEditingCategory(category);
    setFormOpen(true);
  };

  // =========================================================
  // FORM SUCCESS
  // =========================================================

  const handleFormSuccess = (
    category: Category,
  ) => {
    if (editingCategory) {
      // Update existing row
      setCategories((current) =>
        current.map((item) =>
          item.id === category.id
            ? category
            : item,
        ),
      );

      setSuccess(
        "Category updated successfully.",
      );
    } else {
      // Add new row
      setCategories((current) =>
        [...current, category].sort(
          (a, b) =>
            a.category_number -
            b.category_number,
        ),
      );

      setSuccess(
        "Category created successfully.",
      );
    }

    setEditingCategory(null);

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = (
    category: Category,
  ) => {
    setDeleteCategory(category);
  };

  const confirmDelete = async () => {
    if (!deleteCategory) return;

    try {
      setDeleting(true);
      setError("");

      await api.delete(
        `/categories/${deleteCategory.id}`,
      );

      setCategories((current) =>
        current.filter(
          (item) =>
            item.id !==
            deleteCategory.id,
        ),
      );

      setDeleteCategory(null);

      setSuccess(
        "Category deleted successfully.",
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Failed to delete category.";

      setError(
        Array.isArray(message)
          ? message.join(", ")
          : message,
      );

      setDeleteCategory(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className="
        flex
        h-[calc(90vh-4rem)]
        min-h-0
        flex-col
        gap-5
        overflow-hidden
      "
    >

      {/* =====================================================
          OVERVIEW
      ====================================================== */}
      <div className="shrink-0">
        <CategoryOverview
          total={total}
          active={active}
          inactive={inactive}
          onAdd={handleAdd}
        />
      </div>

      {/* =====================================================
          SUCCESS MESSAGE
      ====================================================== */}
      {success && (
        <div className="fixed right-5 top-24 z-[80] flex max-w-sm items-center gap-3 rounded-xl border border-emerald-500/20 bg-[#111827] px-4 py-3 shadow-2xl shadow-black/30">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />

          <p className="text-sm text-emerald-400">
            {success}
          </p>

          <button
            type="button"
            onClick={() => setSuccess("")}
            className="ml-auto text-slate-600 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* =====================================================
          ERROR MESSAGE
      ====================================================== */}
      {error && (
        <div className="fixed right-5 top-24 z-[80] flex max-w-md items-start gap-3 rounded-xl border border-red-500/20 bg-[#111827] px-4 py-3 shadow-2xl shadow-black/30">

          <AlertTriangle
            size={18}
            className="mt-0.5 shrink-0 text-red-400"
          />

          <p className="text-sm leading-5 text-red-400">
            {error}
          </p>

          <button
            type="button"
            onClick={() => setError("")}
            className="ml-auto shrink-0 text-slate-600 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* =====================================================
          TABLE
      ====================================================== */}
      <CategoryTable
        categories={filteredCategories}
        loading={loading}
        search={search}
        onSearchChange={setSearch}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRefresh={fetchCategories}
      />

      {/* =====================================================
          ADD / UPDATE FORM
      ====================================================== */}
      <CategoryForm
        open={formOpen}
        category={editingCategory}
        onClose={() => {
          if (!deleting) {
            setFormOpen(false);
            setEditingCategory(null);
          }
        }}
        onSuccess={handleFormSuccess}
      />

      {/* =====================================================
          DELETE CONFIRMATION
      ====================================================== */}
      {deleteCategory && (
        <>
          {/* Overlay */}
          <div
            className="
              fixed
              inset-0
              z-[100]
              bg-black/70
              backdrop-blur-sm
            "
            onClick={() => {
              if (!deleting) {
                setDeleteCategory(null);
              }
            }}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div
              className="
                w-full
                max-w-md
                rounded-2xl
                border
                border-slate-800
                bg-[#111827]
                p-6
                shadow-2xl
                shadow-black/50
              "
            >

              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <Trash2 size={21} />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-white">
                Delete Category?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Are you sure you want to delete{" "}
                <span className="font-medium text-slate-300">
                  "{deleteCategory.name}"
                </span>
                ? This action cannot be undone.
              </p>

              {/* Project warning */}
              {deleteCategory.projectCount >
                0 && (
                <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3">
                  <p className="text-xs leading-5 text-amber-400">
                    This category currently has{" "}
                    {deleteCategory.projectCount}{" "}
                    {deleteCategory.projectCount ===
                    1
                      ? "project"
                      : "projects"}
                    . The backend will prevent
                    deletion until those projects
                    are moved or removed.
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  disabled={deleting}
                  onClick={() =>
                    setDeleteCategory(null)
                  }
                  className="
                    h-11
                    rounded-xl
                    border
                    border-slate-700
                    px-5
                    text-sm
                    font-medium
                    text-slate-400
                    transition
                    hover:bg-slate-800
                    hover:text-white
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={deleting}
                  onClick={confirmDelete}
                  className="
                    flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-red-600
                    px-5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-red-500
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {deleting ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />

                      Delete Category
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}