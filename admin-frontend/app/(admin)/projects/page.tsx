"use client";

import { useEffect, useState } from "react";

import {
  Plus,
  Search,
  Loader2,
  RefreshCw,
} from "lucide-react";

import { api } from "@/lib/api";

import {
  Project,
  Category,
} from "@/types/project";

import ProjectOverview from "@/components/projects/ProjectOverview";
import ProjectTable from "@/components/projects/ProjectTable";
import ProjectForm from "@/components/projects/ProjectForm";
import ProjectImageManager from "@/components/projects/ProjectImageManager";
import ProjectTechnologyManager from "@/components/projects/ProjectTechnologyManager";

export default function ProjectsPage() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [formLoading, setFormLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [editingProject, setEditingProject] =
    useState<Project | null>(null);

  const [imageProject, setImageProject] =
    useState<Project | null>(null);

  const [technologyProject, setTechnologyProject] =
    useState<Project | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);

      const [
        projectsResponse,
        categoriesResponse,
      ] = await Promise.all([
        api.get("/projects"),
        api.get("/categories"),
      ]);

      setProjects(
        projectsResponse.data.projects,
      );

      setCategories(
        categoriesResponse.data.categories,
      );
    } catch (error) {
      console.error(
        "Failed to load project data:",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddForm = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const openEditForm = (
    project: Project,
  ) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const saveProject = async (data: {
    project_number: number;
    name: string;
    description?: string;
    categoryId: number;
    duration: number;
    project_link?: string;
    active: boolean;
  }) => {
    try {
      setFormLoading(true);

      if (editingProject) {
        await api.patch(
          `/projects/${editingProject.id}`,
          data,
        );
      } else {
        await api.post(
          "/projects",
          data,
        );
      }

      closeForm();

      await loadData();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to save project",
      );
    } finally {
      setFormLoading(false);
    }
  };

  const deleteProject = async (
    project: Project,
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"?\n\nThis will also delete all project images and technologies.`,
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/projects/${project.id}`,
      );

      await loadData();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to delete project",
      );
    }
  };

  const filteredProjects =
    projects.filter((project) => {
      const query =
        search.toLowerCase().trim();

      if (!query) return true;

      return (
        project.name
          .toLowerCase()
          .includes(query) ||
        project.category?.name
          ?.toLowerCase()
          .includes(query) ||
        project.technologies?.some(
          (technology) =>
            technology.technology
              .toLowerCase()
              .includes(query),
        )
      );
    });

  return (
    <div className="flex h-[calc(90vh-5rem)] min-h-0 flex-col gap-5 overflow-hidden">
      {/* Page Header */}

      <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Projects
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage projects displayed on your portfolio
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            disabled={loading}
            className="rounded-xl border border-slate-700 p-3 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                loading
                  ? "animate-spin"
                  : ""
              }`}
            />
          </button>

          <button
            onClick={openAddForm}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
          >
            <Plus className="h-4 w-4" />

            Add Project
          </button>
        </div>
      </div>

      {/* Overview */}

      <div className="shrink-0">
        <ProjectOverview
          projects={projects}
        />
      </div>

      {/* Search */}

      <div className="flex shrink-0 items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search projects, categories or technologies..."
            className="w-full rounded-xl border border-slate-800 bg-[#111827] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}

      {loading ? (
        <div className="flex min-h-0 flex-1 items-center justify-center rounded-2xl border border-slate-800 bg-[#111827]">
          <Loader2 className="h-7 w-7 animate-spin text-blue-400" />
        </div>
      ) : (
        <ProjectTable
          projects={filteredProjects}
          onEdit={openEditForm}
          onDelete={deleteProject}
          onManageImages={
            setImageProject
          }
          onManageTechnologies={
            setTechnologyProject
          }
        />
      )}

      {/* Project Form */}

      {showForm && (
        <ProjectForm
          project={editingProject}
          categories={categories}
          loading={formLoading}
          onSubmit={saveProject}
          onClose={closeForm}
        />
      )}

      {/* Image Manager */}

      {imageProject && (
        <ProjectImageManager
          project={imageProject}
          onClose={() =>
            setImageProject(null)
          }
        />
      )}

      {/* Technology Manager */}

      {technologyProject && (
        <ProjectTechnologyManager
          projectId={
            technologyProject.id
          }
          projectName={
            technologyProject.name
          }
          onClose={() =>
            setTechnologyProject(null)
          }
        />
      )}
    </div>
  );
}