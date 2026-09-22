"use client";

import { useEffect, useState } from "react";

import {
  X,
  Plus,
  Pencil,
  Trash2,
  Check,
  Loader2,
  Code2,
} from "lucide-react";

import { api } from "@/lib/api";
import { ProjectTechnology } from "@/types/project";

interface Props {
  projectId: number;
  projectName: string;
  onClose: () => void;
}

export default function ProjectTechnologyManager({
  projectId,
  projectName,
  onClose,
}: Props) {
  const [technologies, setTechnologies] =
    useState<ProjectTechnology[]>([]);

  const [technology, setTechnology] =
    useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [editingValue, setEditingValue] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const loadTechnologies = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/projects/${projectId}/technologies`,
      );

      setTechnologies(
        response.data.technologies,
      );
    } catch (error) {
      console.error(
        "Failed to load technologies:",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTechnologies();
  }, [projectId]);

  const addTechnology = async () => {
    if (!technology.trim()) return;

    try {
      setSaving(true);

      await api.post(
        `/projects/${projectId}/technologies`,
        {
          technology:
            technology.trim(),
        },
      );

      setTechnology("");

      await loadTechnologies();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to add technology",
      );
    } finally {
      setSaving(false);
    }
  };

  const updateTechnology = async (
    id: number,
  ) => {
    if (!editingValue.trim()) return;

    try {
      setSaving(true);

      await api.patch(
        `/projects/${projectId}/technologies/${id}`,
        {
          technology:
            editingValue.trim(),
        },
      );

      setEditingId(null);
      setEditingValue("");

      await loadTechnologies();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to update technology",
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteTechnology = async (
    id: number,
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this technology?",
    );

    if (!confirmed) return;

    try {
      setSaving(true);

      await api.delete(
        `/projects/${projectId}/technologies/${id}`,
      );

      await loadTechnologies();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to delete technology",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#111827] shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Technologies
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {projectName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Add */}

        <div className="border-b border-slate-800 p-5">
          <div className="flex gap-2">
            <input
              type="text"
              value={technology}
              onChange={(e) =>
                setTechnology(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTechnology();
                }
              }}
              placeholder="e.g. React.js"
              className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-[#0b1220] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />

            <button
              onClick={addTechnology}
              disabled={
                saving ||
                !technology.trim()
              }
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}

              Add
            </button>
          </div>
        </div>

        {/* List */}

        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
            </div>
          ) : technologies.length === 0 ? (
            <div className="py-12 text-center">
              <Code2 className="mx-auto h-9 w-9 text-slate-600" />

              <p className="mt-3 text-sm text-slate-500">
                No technologies added yet.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {technologies.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#0b1220] p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                    <Code2 className="h-4 w-4 text-purple-400" />
                  </div>

                  {editingId === item.id ? (
                    <input
                      autoFocus
                      value={editingValue}
                      onChange={(e) =>
                        setEditingValue(
                          e.target.value,
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          updateTechnology(
                            item.id,
                          );
                        }

                        if (e.key === "Escape") {
                          setEditingId(null);
                        }
                      }}
                      className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                    />
                  ) : (
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-200">
                      {item.technology}
                    </span>
                  )}

                  {editingId === item.id ? (
                    <button
                      onClick={() =>
                        updateTechnology(
                          item.id,
                        )
                      }
                      disabled={saving}
                      className="rounded-lg p-2 text-emerald-400 hover:bg-emerald-500/10"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditingValue(
                          item.technology,
                        );
                      }}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-blue-400"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  )}

                  <button
                    onClick={() =>
                      deleteTechnology(
                        item.id,
                      )
                    }
                    disabled={saving}
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}