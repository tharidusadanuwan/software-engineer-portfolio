"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FolderOpen,
  Layers3,
  X,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { api } from "@/lib/api";
import type {
  Category,
  Project,
} from "@/types/project";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

/* =====================================================
   PROJECTS PAGE
===================================================== */

export default function ProjectsPage() {
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState<number | null>(null);

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* ===================================================
     IMAGE URL
  =================================================== */

  const getImageUrl = useCallback(
    (image?: string) => {
      if (!image) {
        return "/assets/myimage.jpg";
      }

      if (
        image.startsWith("http://") ||
        image.startsWith("https://")
      ) {
        return image;
      }

      return `${BACKEND_URL}${
        image.startsWith("/") ? "" : "/"
      }${image}`;
    },
    [],
  );

  /* ===================================================
     LOAD PROJECTS + CATEGORIES
  =================================================== */

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          categoriesResponse,
          projectsResponse,
        ] = await Promise.all([
          api.get<{
            categories: Category[];
          }>("/public/categories"),

          api.get<{
            projects: Project[];
          }>("/public/projects"),
        ]);

        setCategories(
          categoriesResponse.data.categories || [],
        );

        setProjects(
          projectsResponse.data.projects || [],
        );
      } catch (err) {
        console.error(
          "Failed to load projects:",
          err,
        );

        setError(
          "Unable to load projects. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* ===================================================
     FILTER PROJECTS
  =================================================== */

  const filteredProjects = useMemo(() => {
    if (selectedCategory === null) {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.categoryId === selectedCategory,
    );
  }, [projects, selectedCategory]);

  /* ===================================================
     OPEN PROJECT
  =================================================== */

  const handleProjectClick = async (
    project: Project,
  ) => {
    try {
      /*
       * Fetch the complete project from the API.
       * This keeps the popup connected to the database.
       */

      const response = await api.get<{
        project: Project | null;
      }>(`/public/projects/${project.id}`);

      if (response.data.project) {
        setSelectedProject(
          response.data.project,
        );
      } else {
        setSelectedProject(project);
      }
    } catch (err) {
      console.error(
        "Failed to load project details:",
        err,
      );

      /*
       * If the detailed API fails,
       * still open the project using
       * the data already loaded.
       */

      setSelectedProject(project);
    }

    document.body.style.overflow = "hidden";
  };

  /* ===================================================
     CLOSE PROJECT
  =================================================== */

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null);

    document.body.style.overflow = "auto";
  }, []);

  /* ===================================================
     ESCAPE KEY
  =================================================== */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape" &&
        selectedProject
      ) {
        handleCloseProject();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    selectedProject,
    handleCloseProject,
  ]);

  return (
    <main className="min-h-screen bg-[#f4f8ff] text-[#101828]">
      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />

      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden bg-[#07111f] px-6 pb-20 pt-32 sm:px-8 lg:px-14 xl:px-20">
        {/* Decorative gradients */}

        <div className="pointer-events-none absolute -left-40 top-10 h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="pointer-events-none absolute right-[-120px] top-20 h-[400px] w-[400px] rounded-full bg-cyan-400/10 blur-[120px]" />

        <div className="pointer-events-none absolute bottom-[-180px] left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]" />

        {/* Decorative dots */}

        <div className="pointer-events-none absolute left-[10%] top-[35%] h-2 w-2 rounded-full bg-blue-400/60" />

        <div className="pointer-events-none absolute right-[15%] top-[25%] h-3 w-3 rounded-full bg-cyan-300/40" />

        <div className="pointer-events-none absolute bottom-[25%] left-[25%] h-2 w-2 rounded-full bg-purple-400/50" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mx-auto max-w-3xl text-center"
          >
            {/* Badge */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2">
              <FolderOpen className="h-4 w-4 text-blue-400" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                My Projects
              </span>
            </div>

            {/* Heading */}

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              All{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Explore the software applications and
              intelligent systems I&apos;ve designed,
              developed, and deployed using modern
              technologies.
            </p>
          </motion.div>

          {/* =================================================
              CATEGORY FILTER
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {/* ALL */}

            <button
              type="button"
              onClick={() =>
                setSelectedCategory(null)
              }
              className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 sm:text-sm ${
                selectedCategory === null
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25"
                  : "border border-slate-700 bg-white/5 text-slate-300 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-white"
              }`}
            >
              All Projects
            </button>

            {/* DATABASE CATEGORIES */}

            {categories.map(
              (category, index) => {
                const gradients = [
                  "from-blue-600 to-cyan-500",
                  "from-violet-600 to-purple-500",
                  "from-cyan-600 to-teal-500",
                  "from-orange-500 to-pink-500",
                  "from-emerald-500 to-cyan-500",
                ];

                const gradient =
                  gradients[
                    index % gradients.length
                  ];

                const active =
                  selectedCategory ===
                  category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(
                        category.id,
                      )
                    }
                    className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 sm:text-sm ${
                      active
                        ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
                        : "border border-slate-700 bg-white/5 text-slate-300 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-white"
                    }`}
                  >
                    {category.name}
                  </button>
                );
              },
            )}
          </motion.div>
        </div>
      </section>

      {/* =================================================
          PROJECTS SECTION
      ================================================= */}

      <section className="relative px-6 py-20 sm:px-8 lg:px-14 lg:py-24 xl:px-20">
        {/* Background decoration */}

        <div className="pointer-events-none absolute left-0 top-40 h-80 w-80 rounded-full bg-blue-100/70 blur-[100px]" />

        <div className="pointer-events-none absolute right-0 top-[45%] h-80 w-80 rounded-full bg-purple-100/60 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          {/* Section heading */}

          {!loading &&
            !error &&
            filteredProjects.length > 0 && (
              <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                    Portfolio
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-[#101828] sm:text-3xl">
                    My Latest Work
                  </h2>
                </div>

                <p className="text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-bold text-slate-700">
                    {filteredProjects.length}
                  </span>{" "}
                  {filteredProjects.length === 1
                    ? "project"
                    : "projects"}
                </p>
              </div>
            )}

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="h-[220px] animate-pulse bg-slate-200" />

                    <div className="space-y-4 p-6">
                      <div className="h-4 w-28 animate-pulse rounded-full bg-slate-200" />

                      <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />

                      <div className="h-4 w-full animate-pulse rounded bg-slate-200" />

                      <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />

                      <div className="flex gap-2">
                        <div className="h-7 w-16 animate-pulse rounded-full bg-slate-200" />
                        <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200" />
                        <div className="h-7 w-16 animate-pulse rounded-full bg-slate-200" />
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {!loading && error && (
            <div className="rounded-3xl border border-red-200 bg-white px-6 py-20 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
                <FolderOpen className="h-7 w-7 text-red-400" />
              </div>

              <h3 className="mt-5 text-xl font-black text-slate-900">
                Projects Couldn&apos;t Be Loaded
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {error}
              </p>
            </div>
          )}

          {/* =================================================
              EMPTY
          ================================================= */}

          {!loading &&
            !error &&
            filteredProjects.length === 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                  <FolderOpen className="h-7 w-7 text-blue-400" />
                </div>

                <h3 className="mt-5 text-xl font-black text-slate-900">
                  No Projects Found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  There are currently no active
                  projects in this category.
                </p>

                {selectedCategory !==
                  null && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedCategory(
                        null,
                      )
                    }
                    className="mt-6 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-500"
                  >
                    View All Projects
                  </button>
                )}
              </div>
            )}

          {/* =================================================
              PROJECT GRID
          ================================================= */}

          {!loading &&
            !error &&
            filteredProjects.length > 0 && (
              <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map(
                    (project, index) => {
                      const firstImage =
                        project.images?.[0]
                          ?.image;

                      return (
                        <motion.article
                          layout
                          key={project.id}
                          initial={{
                            opacity: 0,
                            y: 30,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.95,
                          }}
                          transition={{
                            duration: 0.4,
                            delay:
                              index * 0.05,
                          }}
                          onClick={() =>
                            handleProjectClick(
                              project,
                            )
                          }
                          className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_20px_45px_rgba(37,99,235,0.14)]"
                        >
                          {/* =================================================
                              PROJECT IMAGE
                          ================================================= */}

                          <div className="relative h-[225px] overflow-hidden bg-slate-100">
                            {firstImage ? (
                              <img
                                src={getImageUrl(
                                  firstImage,
                                )}
                                alt={
                                  project.name
                                }
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
                                <FolderOpen className="h-14 w-14 text-blue-200" />
                              </div>
                            )}

                            {/* Image gradient */}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

                            {/* Project Number */}

                            <div className="absolute left-4 top-4 flex h-9 min-w-9 items-center justify-center rounded-full bg-white/95 px-3 shadow-lg backdrop-blur-sm">
                              <span className="text-[11px] font-black text-slate-800">
                                #
                                {String(
                                  project.project_number,
                                ).padStart(
                                  2,
                                  "0",
                                )}
                              </span>
                            </div>

                            {/* Category */}

                            <div className="absolute right-4 top-4 max-w-[60%] rounded-full bg-blue-600/90 px-3 py-1.5 shadow-lg backdrop-blur-sm">
                              <span className="block truncate text-[10px] font-bold text-white">
                                {
                                  project
                                    .category
                                    ?.name
                                }
                              </span>
                            </div>

                            {/* Hover View */}

                            <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center pb-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                              <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-slate-900 shadow-xl">
                                View Project
                                <ArrowRight className="h-4 w-4 text-blue-600" />
                              </span>
                            </div>
                          </div>

                          {/* =================================================
                              PROJECT CONTENT
                          ================================================= */}

                          <div className="p-6">
                            {/* Category */}

                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-blue-500" />

                              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                                {
                                  project
                                    .category
                                    ?.name
                                }
                              </span>
                            </div>

                            {/* Name */}

                            <h3 className="mt-3 line-clamp-1 text-xl font-black text-[#101828] transition-colors duration-300 group-hover:text-blue-600">
                              {
                                project.name
                              }
                            </h3>

                            {/* Description */}

                            <p className="mt-3 line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-500">
                              {project.description ||
                                "A software project developed using modern technologies and development practices."}
                            </p>

                            {/* Technologies */}

                            <div className="mt-5 flex min-h-[36px] flex-wrap gap-2">
                              {project.technologies
                                ?.slice(0, 4)
                                .map(
                                  (
                                    technology,
                                    technologyIndex,
                                  ) => {
                                    const badgeStyles =
                                      [
                                        "bg-blue-50 text-blue-600 border-blue-100",
                                        "bg-purple-50 text-purple-600 border-purple-100",
                                        "bg-cyan-50 text-cyan-600 border-cyan-100",
                                        "bg-emerald-50 text-emerald-600 border-emerald-100",
                                      ];

                                    return (
                                      <span
                                        key={
                                          technology.id
                                        }
                                        className={`rounded-full border px-3 py-1.5 text-[10px] font-bold ${
                                          badgeStyles[
                                            technologyIndex %
                                              badgeStyles.length
                                          ]
                                        }`}
                                      >
                                        {
                                          technology.technology
                                        }
                                      </span>
                                    );
                                  },
                                )}

                              {project
                                .technologies
                                ?.length >
                                4 && (
                                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-500">
                                  +
                                  {project
                                    .technologies
                                    .length -
                                    4}
                                </span>
                              )}
                            </div>

                            {/* Bottom */}

                            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                <CalendarDays className="h-3.5 w-3.5" />

                                <span>
                                  {
                                    project.duration
                                  }{" "}
                                  {project.duration ===
                                  1
                                    ? "Month"
                                    : "Months"}
                                </span>
                              </div>

                              <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 transition-all duration-300 group-hover:gap-2.5">
                                Details
                                <ArrowRight className="h-3.5 w-3.5" />
                              </span>
                            </div>
                          </div>
                        </motion.article>
                      );
                    },
                  )}
                </AnimatePresence>
              </div>
            )}
        </div>
      </section>

      {/* =================================================
          PROJECT DETAIL POPUP
      ================================================= */}

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            getImageUrl={getImageUrl}
            onClose={handleCloseProject}
          />
        )}
      </AnimatePresence>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />
    </main>
  );
}

/* =====================================================
   PROJECT MODAL
===================================================== */

interface ProjectModalProps {
  project: Project;
  getImageUrl: (image?: string) => string;
  onClose: () => void;
}

function ProjectModal({
  project,
  getImageUrl,
  onClose,
}: ProjectModalProps) {
  const [activeImage, setActiveImage] =
    useState(0);

  const images = project.images || [];

  /* ===================================================
     RESET IMAGE WHEN PROJECT CHANGES
  =================================================== */

  useEffect(() => {
    setActiveImage(0);
  }, [project.id]);

  /* ===================================================
     IMAGE NAVIGATION
  =================================================== */

  const nextImage = () => {
    if (images.length <= 1) {
      return;
    }

    setActiveImage((current) =>
      current >= images.length - 1
        ? 0
        : current + 1,
    );
  };

  const previousImage = () => {
    if (images.length <= 1) {
      return;
    }

    setActiveImage((current) =>
      current <= 0
        ? images.length - 1
        : current - 1,
    );
  };

  const currentImage =
    images[activeImage]?.image;

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-md sm:p-6 lg:p-10"
      onClick={onClose}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 35,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.97,
        }}
        transition={{
          duration: 0.3,
        }}
        onClick={(event) =>
          event.stopPropagation()
        }
        className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.4)]"
      >
        {/* =================================================
            TOP COLOR BAR
        ================================================= */}

        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-500" />

        {/* =================================================
            CLOSE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/90 text-slate-600 shadow-lg backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:bg-slate-900 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* =================================================
            MODAL SCROLL AREA
        ================================================= */}

        <div className="max-h-[calc(94vh-6px)] overflow-y-auto">
          {/* =================================================
              FULL PROJECT IMAGE
          ================================================= */}

          <div className="relative bg-gradient-to-br from-[#edf5ff] via-white to-[#f5efff]">
            {/* Decorative glow */}

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/30 blur-[90px]" />

            {/* Image area */}

            <div className="relative flex h-[300px] w-full items-center justify-center p-4 sm:h-[430px] sm:p-7 lg:h-[520px] lg:p-10">
              {currentImage ? (
                <img
                  src={getImageUrl(
                    currentImage,
                  )}
                  alt={project.name}
                  className="max-h-full max-w-full object-contain drop-shadow-[0_20px_35px_rgba(15,23,42,0.15)]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white/60">
                  <FolderOpen className="h-20 w-20 text-blue-200" />
                </div>
              )}

              {/* =================================================
                  PROJECT NUMBER
              ================================================= */}

              <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-slate-950/90 px-4 py-2.5 shadow-xl">
                <span className="text-[11px] font-black uppercase tracking-wider text-white">
                  Project #
                  {String(
                    project.project_number,
                  ).padStart(2, "0")}
                </span>
              </div>

              {/* =================================================
                  IMAGE COUNTER
              ================================================= */}

              {images.length > 0 && (
                <div className="absolute bottom-6 right-6 rounded-full bg-white/95 px-4 py-2.5 text-[11px] font-bold text-slate-700 shadow-lg backdrop-blur-md">
                  {activeImage + 1} /{" "}
                  {images.length}
                </div>
              )}

              {/* =================================================
                  PREVIOUS
              ================================================= */}

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={previousImage}
                  aria-label="Previous project image"
                  className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white/90 text-slate-700 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white sm:left-7"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              {/* =================================================
                  NEXT
              ================================================= */}

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next project image"
                  className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white/90 text-slate-700 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white sm:right-7"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* =================================================
                THUMBNAILS
            ================================================= */}

            {images.length > 1 && (
              <div className="border-t border-slate-200/80 bg-white/70 px-5 py-4 backdrop-blur-md">
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {images.map(
                    (image, index) => (
                      <button
                        key={image.id}
                        type="button"
                        onClick={() =>
                          setActiveImage(
                            index,
                          )
                        }
                        className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-all duration-300 sm:h-20 sm:w-28 ${
                          activeImage === index
                            ? "scale-[1.03] border-blue-500 shadow-lg shadow-blue-500/20"
                            : "border-transparent opacity-60 hover:border-blue-200 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={getImageUrl(
                            image.image,
                          )}
                          alt={`${project.name} image ${
                            index + 1
                          }`}
                          className="h-full w-full object-cover"
                        />

                        {activeImage ===
                          index && (
                          <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-500" />
                        )}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>

          {/* =================================================
              PROJECT DETAILS
          ================================================= */}

          <div className="grid lg:grid-cols-[1fr_300px]">
            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div className="p-7 sm:p-9 lg:p-12">
              {/* Category */}

              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" />

                <span className="text-xs font-bold text-blue-600">
                  {project.category?.name}
                </span>
              </div>

              {/* Title */}

              <h2 className="mt-5 text-3xl font-black tracking-tight text-[#101828] sm:text-4xl lg:text-5xl">
                {project.name}
              </h2>

              {/* Description */}

              <div className="mt-8">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-gradient-to-b from-blue-500 to-cyan-400" />

                  <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-800">
                    About This Project
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                  {project.description ||
                    "Project description will be available soon."}
                </p>
              </div>

              {/* Technologies */}

              <div className="mt-9">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50">
                    <Layers3 className="h-4 w-4 text-purple-600" />
                  </div>

                  <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-800">
                    Technologies Used
                  </h3>
                </div>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {project.technologies
                    ?.map(
                      (
                        technology,
                        index,
                      ) => {
                        const styles = [
                          "border-blue-100 bg-blue-50 text-blue-600",
                          "border-purple-100 bg-purple-50 text-purple-600",
                          "border-cyan-100 bg-cyan-50 text-cyan-600",
                          "border-emerald-100 bg-emerald-50 text-emerald-600",
                          "border-orange-100 bg-orange-50 text-orange-600",
                        ];

                        return (
                          <span
                            key={
                              technology.id
                            }
                            className={`rounded-xl border px-4 py-2.5 text-xs font-bold ${
                              styles[
                                index %
                                  styles.length
                              ]
                            }`}
                          >
                            {
                              technology.technology
                            }
                          </span>
                        );
                      },
                    )}
                </div>
              </div>

              {/* Live Project */}

              {project.project_link && (
                <a
                  href={
                    project.project_link
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30"
                >
                  View Live Project

                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            {/* =================================================
                INFORMATION SIDEBAR
            ================================================= */}

            <aside className="border-t border-slate-200 bg-[#f8fbff] p-7 lg:border-l lg:border-t-0 lg:p-8">
              <h3 className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Project Information
              </h3>

              <div className="mt-6 space-y-4">
                {/* Category */}

                <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500">
                    Category
                  </p>

                  <p className="mt-2 text-sm font-black text-slate-800">
                    {project.category?.name}
                  </p>
                </div>

                {/* Duration */}

                <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-purple-500">
                    Duration
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-purple-500" />

                    <p className="text-sm font-black text-slate-800">
                      {project.duration}{" "}
                      {project.duration ===
                      1
                        ? "Month"
                        : "Months"}
                    </p>
                  </div>
                </div>

                {/* Project Number */}

                <div className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-600">
                    Project Number
                  </p>

                  <p className="mt-2 text-sm font-black text-slate-800">
                    #
                    {String(
                      project.project_number,
                    ).padStart(2, "0")}
                  </p>
                </div>

                {/* Images */}

                <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                    Project Gallery
                  </p>

                  <p className="mt-2 text-sm font-black text-slate-800">
                    {images.length}{" "}
                    {images.length === 1
                      ? "Image"
                      : "Images"}
                  </p>
                </div>

                {/* Technologies Count */}

                <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
                    Technologies
                  </p>

                  <p className="mt-2 text-sm font-black text-slate-800">
                    {project
                      .technologies
                      ?.length || 0}{" "}
                    Technologies
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}