"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  X,
  FolderTree,
  Hash,
  Type,
  ToggleLeft,
  Loader2,
} from "lucide-react";

import { api } from "@/lib/api";
import {
  Category,
  CreateCategoryData,
} from "@/types/category";

interface CategoryFormProps {
  open: boolean;
  category?: Category | null;
  onClose: () => void;
  onSuccess: (category: Category) => void;
}

export default function CategoryForm({
  open,
  category,
  onClose,
  onSuccess,
}: CategoryFormProps) {
  const isEdit = Boolean(category);

  const [categoryNumber, setCategoryNumber] =
    useState("");

  const [name, setName] = useState("");

  const [active, setActive] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // Populate edit form
  useEffect(() => {
    if (!open) return;

    setError("");

    if (category) {
      setCategoryNumber(
        String(category.category_number),
      );

      setName(category.name);

      setActive(category.active);
    } else {
      setCategoryNumber("");
      setName("");
      setActive(true);
    }
  }, [open, category]);

  // Don't render when closed
  if (!open) {
    return null;
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    const trimmedName = name.trim();

    if (!categoryNumber) {
      setError(
        "Please enter a category number.",
      );
      return;
    }

    const number = Number(categoryNumber);

    if (!Number.isInteger(number) || number < 1) {
      setError(
        "Category number must be a positive number.",
      );
      return;
    }

    if (!trimmedName) {
      setError(
        "Please enter a category name.",
      );
      return;
    }

    try {
      setLoading(true);

      if (isEdit && category) {
        const response = await api.patch(
          `/categories/${category.id}`,
          {
            category_number: number,
            name: trimmedName,
            active,
          },
        );

        onSuccess(response.data.category);
      } else {
        const data: CreateCategoryData = {
          category_number: number,
          name: trimmedName,
          active,
        };

        const response = await api.post(
          "/categories",
          data,
        );

        onSuccess(response.data.category);
      }

      onClose();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";

      setError(
        Array.isArray(message)
          ? message.join(", ")
          : message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
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
          if (!loading) {
            onClose();
          }
        }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto p-4">
        <div
          className="
            relative
            w-full
            max-w-lg
            overflow-hidden
            rounded-2xl
            border
            border-slate-800
            bg-[#111827]
            shadow-2xl
            shadow-black/50
          "
          onClick={(event) =>
            event.stopPropagation()
          }
        >

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                <FolderTree size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  {isEdit
                    ? "Update Category"
                    : "Add Category"}
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  {isEdit
                    ? "Update category information."
                    : "Create a new project category."}
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-slate-500
                transition
                hover:bg-slate-800
                hover:text-white
                disabled:opacity-50
              "
            >
              <X size={19} />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6"
          >

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-5">

              {/* Category Number */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Category Number
                </label>

                <div className="relative">
                  <Hash
                    size={18}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-slate-600
                    "
                  />

                  <input
                    type="number"
                    min="1"
                    value={categoryNumber}
                    onChange={(event) =>
                      setCategoryNumber(
                        event.target.value,
                      )
                    }
                    placeholder="e.g. 1"
                    disabled={loading}
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-700
                      bg-[#0B1220]
                      pl-10
                      pr-4
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-slate-600
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/10
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  />
                </div>
              </div>

              {/* Category Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Category Name
                </label>

                <div className="relative">
                  <Type
                    size={18}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-slate-600
                    "
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="e.g. Web Development"
                    disabled={loading}
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-700
                      bg-[#0B1220]
                      pl-10
                      pr-4
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-slate-600
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/10
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  />
                </div>
              </div>

              {/* Active */}
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#0B1220] p-4">

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <ToggleLeft size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      Active Category
                    </p>

                    <p className="text-xs text-slate-600">
                      Show this category as active.
                    </p>
                  </div>
                </div>

                {/* Switch */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    setActive(!active)
                  }
                  className={`
                    relative
                    h-6
                    w-11
                    shrink-0
                    rounded-full
                    transition
                    ${
                      active
                        ? "bg-blue-600"
                        : "bg-slate-700"
                    }
                  `}
                >
                  <span
                    className={`
                      absolute
                      top-1
                      h-4
                      w-4
                      rounded-full
                      bg-white
                      shadow-sm
                      transition-all
                      ${
                        active
                          ? "left-6"
                          : "left-1"
                      }
                    `}
                  />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                disabled={loading}
                onClick={onClose}
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
                type="submit"
                disabled={loading}
                className="
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-500
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                    {isEdit
                      ? "Updating..."
                      : "Creating..."}
                  </>
                ) : (
                  <>
                    {isEdit
                      ? "Update Category"
                      : "Create Category"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}