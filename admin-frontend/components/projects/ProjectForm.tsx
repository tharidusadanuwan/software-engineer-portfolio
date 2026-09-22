"use client";

import { useEffect, useState } from "react";
import {
  X,
  Save,
  Loader2,
  Link as LinkIcon,
} from "lucide-react";

import { Project, Category } from "@/types/project";

interface ProjectFormProps {
  project?: Project | null;
  categories: Category[];
  loading?: boolean;
  onSubmit: (data: {
    project_number: number;
    name: string;
    description?: string;
    categoryId: number;
    duration: number;
    project_link?: string;
    active: boolean;
  }) => Promise<void>;
  onClose: () => void;
}

export default function ProjectForm({
  project,
  categories,
  loading = false,
  onSubmit,
  onClose,
}: ProjectFormProps) {
  const [projectNumber, setProjectNumber] =
    useState("");

  const [name, setName] = useState("");

  const [description, setDescription] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [duration, setDuration] =
    useState("");

  const [projectLink, setProjectLink] =
    useState("");

  const [active, setActive] =
    useState(true);

  useEffect(() => {
    if (project) {
      setProjectNumber(
        String(project.project_number),
      );

      setName(project.name);

      setDescription(
        project.description || "",
      );

      setCategoryId(
        String(project.categoryId),
      );

      setDuration(
        String(project.duration),
      );

      setProjectLink(
        project.project_link || "",
      );

      setActive(project.active);
    } else {
      setProjectNumber("");
      setName("");
      setDescription("");
      setCategoryId("");
      setDuration("");
      setProjectLink("");
      setActive(true);
    }
  }, [project]);

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    await onSubmit({
      project_number: Number(projectNumber),
      name: name.trim(),
      description:
        description.trim() || undefined,
      categoryId: Number(categoryId),
      duration: Number(duration),
      project_link:
        projectLink.trim() || undefined,
      active,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#111827] shadow-2xl">
        {/* Header */}

        <div className="flex shrink-0 items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {project
                ? "Edit Project"
                : "Add New Project"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {project
                ? "Update project information"
                : "Add a new project to your portfolio"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <div className="space-y-5 p-6">
            {/* Number + Name */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Project Number
                </label>

                <input
                  type="number"
                  min="1"
                  required
                  value={projectNumber}
                  onChange={(e) =>
                    setProjectNumber(
                      e.target.value,
                    )
                  }
                  placeholder="01"
                  className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Project Name
                </label>

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="TeaYieldAI"
                  className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Category + Duration */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Category
                </label>

                <select
                  required
                  value={categoryId}
                  onChange={(e) =>
                    setCategoryId(
                      e.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                >
                  <option value="">
                    Select category
                  </option>

                  {categories
                    .filter(
                      (category) =>
                        category.active,
                    )
                    .map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Duration
                </label>

                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    required
                    value={duration}
                    onChange={(e) =>
                      setDuration(
                        e.target.value,
                      )
                    }
                    placeholder="3"
                    className="w-full rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                    months
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Description
              </label>

              <textarea
                rows={5}
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value,
                  )
                }
                placeholder="Describe the project..."
                className="w-full resize-none rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            {/* Project Link */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Project Link
              </label>

              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                <input
                  type="url"
                  value={projectLink}
                  onChange={(e) =>
                    setProjectLink(
                      e.target.value,
                    )
                  }
                  placeholder="https://github.com/..."
                  className="w-full rounded-xl border border-slate-700 bg-[#0b1220] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Active */}

            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#0b1220] p-4">
              <div>
                <p className="text-sm font-medium text-white">
                  Project Status
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Show this project as active
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActive(!active)
                }
                className={`relative h-6 w-11 rounded-full transition ${
                  active
                    ? "bg-blue-600"
                    : "bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    active
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Footer */}

          <div className="flex shrink-0 justify-end gap-3 border-t border-slate-800 px-6 py-4">
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

              {project
                ? "Update Project"
                : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}