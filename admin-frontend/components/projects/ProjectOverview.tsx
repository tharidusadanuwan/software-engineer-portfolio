"use client";

import {
  FolderKanban,
  CheckCircle2,
  XCircle,
  Layers3,
} from "lucide-react";

import { Project } from "@/types/project";

interface ProjectOverviewProps {
  projects: Project[];
}

export default function ProjectOverview({
  projects,
}: ProjectOverviewProps) {
  const activeProjects = projects.filter(
    (project) => project.active,
  ).length;

  const inactiveProjects = projects.length - activeProjects;

  const categories = new Set(
    projects.map((project) => project.categoryId),
  ).size;

  const cards = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: FolderKanban,
    },
    {
      title: "Active Projects",
      value: activeProjects,
      icon: CheckCircle2,
    },
    {
      title: "Inactive Projects",
      value: inactiveProjects,
      icon: XCircle,
    },
    {
      title: "Categories Used",
      value: categories,
      icon: Layers3,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  {card.value}
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                <Icon className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}