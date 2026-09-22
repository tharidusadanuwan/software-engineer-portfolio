"use client";

import {
  Edit3,
  Trash2,
  Images,
  Code2,
  ExternalLink,
  MoreVertical,
} from "lucide-react";

import { Project } from "@/types/project";

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onManageImages: (project: Project) => void;
  onManageTechnologies: (project: Project) => void;
}

export default function ProjectTable({
  projects,
  onEdit,
  onDelete,
  onManageImages,
  onManageTechnologies,
}: ProjectTableProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#111827]">
      {/* Header */}

      <div className="flex shrink-0 items-center justify-between border-b border-slate-800 px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            All Projects
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Manage your portfolio projects
          </p>
        </div>

        <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300">
          {projects.length} Projects
        </span>
      </div>

      {/* Scroll area */}

      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead className="sticky top-0 z-10 bg-[#172033]">
            <tr className="border-b border-slate-800">
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                #
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Project
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Category
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Duration
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Technologies
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Images
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-16 text-center text-slate-500"
                >
                  No projects found.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-slate-800/70 transition hover:bg-slate-800/30"
                >
                  {/* Number */}

                  <td className="px-5 py-4">
                    <span className="font-mono text-sm text-slate-400">
                      {String(
                        project.project_number,
                      ).padStart(2, "0")}
                    </span>
                  </td>

                  {/* Project */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {project.images?.[0] ? (
                        <img
                          src={getImageUrl(
                            project.images[0].image,
                          )}
                          alt={project.name}
                          className="h-11 w-14 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-14 items-center justify-center rounded-lg bg-slate-800">
                          <Images className="h-5 w-5 text-slate-500" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="max-w-[240px] truncate font-medium text-white">
                          {project.name}
                        </p>

                        <p className="mt-1 max-w-[240px] truncate text-xs text-slate-500">
                          {project.description ||
                            "No description"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}

                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">
                      {project.category?.name ||
                        "No Category"}
                    </span>
                  </td>

                  {/* Duration */}

                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-300">
                      {project.duration}{" "}
                      {project.duration === 1
                        ? "month"
                        : "months"}
                    </span>
                  </td>

                  {/* Technologies */}

                  <td className="px-5 py-4">
                    <button
                      onClick={() =>
                        onManageTechnologies(project)
                      }
                      className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                    >
                      <Code2 className="h-4 w-4 text-purple-400" />

                      {project.technologies?.length || 0}
                    </button>
                  </td>

                  {/* Images */}

                  <td className="px-5 py-4">
                    <button
                      onClick={() =>
                        onManageImages(project)
                      }
                      className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                    >
                      <Images className="h-4 w-4 text-emerald-400" />

                      {project.images?.length || 0}
                    </button>
                  </td>

                  {/* Status */}

                  <td className="px-5 py-4">
                    {project.active ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-500/10 px-3 py-1.5 text-xs font-medium text-slate-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Actions */}

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {project.project_link && (
                        <a
                          href={project.project_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-blue-400"
                          title="Open project"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}

                      <button
                        onClick={() =>
                          onEdit(project)
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-blue-400"
                        title="Edit"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() =>
                          onDelete(project)
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <button
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        title="More"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getImageUrl(image: string) {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:5000";

  return `${backendUrl}${image}`;
}