"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Database,
  ExternalLink,
  FolderOpen,
  Layers3,
  Monitor,
  Palette,
  Smartphone,
  X,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import { api } from "@/lib/api";

import type { Project } from "@/types/project";

/* ============================================================
   WHAT I DO DATA
============================================================ */

const services = [
  {
    title: "Web Development",
    description:
      "Modern and responsive web applications using React, Next.js and more.",
    icon: Monitor,
    iconClass: "text-blue-500",
    background: "bg-blue-50",
  },

  {
    title: "Mobile App Development",
    description:
      "Cross-platform mobile apps with Flutter for beautiful user experiences.",
    icon: Smartphone,
    iconClass: "text-emerald-500",
    background: "bg-emerald-50",
  },

  {
    title: "Backend Development",
    description:
      "Scalable APIs and server-side applications using Node.js, Python and more.",
    icon: Database,
    iconClass: "text-orange-500",
    background: "bg-orange-50",
  },

  {
    title: "UI/UX Design",
    description:
      "Clean, modern and intuitive designs that users love.",
    icon: Palette,
    iconClass: "text-violet-500",
    background: "bg-violet-50",
  },
];

/* ============================================================
   BACKEND URL
============================================================ */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

/* ============================================================
   IMAGE URL HELPER
============================================================ */

function getProjectImage(image?: string) {
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
}

/* ============================================================
   HOME SECTIONS
============================================================ */

export default function HomeSections() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* ==========================================================
     SELECTED PROJECT
  ========================================================== */

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  /* ==========================================================
     LOAD PROJECTS
  ========================================================== */

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await api.get(
          "/public/projects",
        );

        const data = response.data;

        const projectList: Project[] =
          Array.isArray(data)
            ? data
            : data.projects || [];

        /*
         * Only active projects
         * Sort by project number
         * Display first 3 projects
         */

        const activeProjects =
          projectList
            .filter(
              (project) => project.active,
            )
            .sort(
              (a, b) =>
                a.project_number -
                b.project_number,
            )
            .slice(0, 3);

        setProjects(activeProjects);
      } catch (error) {
        console.error(
          "Failed to load featured projects:",
          error,
        );

        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  /* ==========================================================
     OPEN PROJECT POPUP
  ========================================================== */

  const handleProjectClick = async (
    project: Project,
  ) => {
    try {
      /*
       * Get the complete project from the backend.
       * This makes sure the popup always contains
       * the latest project information.
       */

      const response = await api.get<{
        project: Project | null;
      }>(
        `/public/projects/${project.id}`,
      );

      if (response.data.project) {
        setSelectedProject(
          response.data.project,
        );
      } else {
        setSelectedProject(project);
      }
    } catch (error) {
      console.error(
        "Failed to load project details:",
        error,
      );

      /*
       * If the detail request fails,
       * still open the project using
       * the already loaded project data.
       */

      setSelectedProject(project);
    }

    document.body.style.overflow = "hidden";
  };

  /* ==========================================================
     CLOSE PROJECT POPUP
  ========================================================== */

  const handleCloseProject = useCallback(
    () => {
      setSelectedProject(null);

      document.body.style.overflow =
        "auto";
    },
    [],
  );

  /* ==========================================================
     ESCAPE KEY
  ========================================================== */

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

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="w-full">

      {/* ======================================================
          WHAT I DO
      ====================================================== */}

      <section
        id="about"
        className="
          w-full
          bg-white
          px-5
          py-14
          text-slate-900
          sm:px-8
          sm:py-16
          lg:px-14
          lg:py-20
          xl:px-16
        "
      >
        <div className="mx-auto w-full max-w-[1500px]">

          {/* ==================================================
              SECTION HEADER
          ================================================== */}

          <div
            className="
              flex
              flex-col
              gap-6
              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >
            <div>

              {/* Blue line */}

              <div
                className="
                  mb-3
                  h-1
                  w-7
                  rounded-full
                  bg-blue-500
                "
              />

              {/* Heading */}

              <h2
                className="
                  text-3xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-slate-900
                  sm:text-4xl
                "
              >
                What I Do
              </h2>

              {/* Description */}

              <p
                className="
                  mt-2
                  max-w-[520px]
                  text-sm
                  leading-6
                  text-slate-500
                  sm:text-base
                  sm:leading-7
                "
              >
                I develop full-stack solutions with
                a focus on clean code, performance,
                and great user experiences.
              </p>
            </div>

            {/* ==================================================
                MORE ABOUT ME
            ================================================== */}

            <a
              href="/about"
              className="
                group
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-blue-500
                px-5
                py-2.5
                text-xs
                font-semibold
                text-blue-500
                transition-all
                duration-300
                hover:bg-blue-500
                hover:text-white
                sm:mt-2
                sm:px-6
                sm:py-3
                sm:text-sm
              "
            >
              More About Me

              <ArrowRight
                className="
                  h-3.5
                  w-3.5
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </a>
          </div>

          {/* ==================================================
              SERVICE CARDS
          ================================================== */}

          <div
            className="
              mt-8
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className={`
                    ${service.background}
                    min-h-[190px]
                    rounded-xl
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                    sm:min-h-[200px]
                  `}
                >

                  {/* Icon */}

                  <div className="mb-5">
                    <Icon
                      className={`
                        h-10
                        w-10
                        ${service.iconClass}
                      `}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Title */}

                  <h3
                    className="
                      text-base
                      font-bold
                      leading-6
                      text-slate-900
                      sm:text-[17px]
                    "
                  >
                    {service.title}
                  </h3>

                  {/* Description */}

                  <p
                    className="
                      mt-2.5
                      max-w-[260px]
                      text-sm
                      leading-6
                      text-slate-600
                    "
                  >
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          FEATURED PROJECTS
      ====================================================== */}

      <section
        id="projects"
        className="
          w-full
          bg-[#f1f6ff]
          px-5
          py-14
          text-slate-900
          sm:px-8
          sm:py-16
          lg:px-14
          lg:py-20
          xl:px-16
        "
      >
        <div className="mx-auto w-full max-w-[1500px]">

          {/* ==================================================
              SECTION HEADER
          ================================================== */}

          <div
            className="
              flex
              flex-col
              gap-6
              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >
            <div>

              {/* Blue line */}

              <div
                className="
                  mb-3
                  h-1
                  w-7
                  rounded-full
                  bg-blue-500
                "
              />

              {/* Heading */}

              <h2
                className="
                  text-3xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-slate-900
                  sm:text-4xl
                "
              >
                Featured Projects
              </h2>

              {/* Description */}

              <p
                className="
                  mt-2
                  max-w-[800px]
                  text-sm
                  leading-6
                  text-slate-500
                  sm:text-base
                  sm:leading-7
                "
              >
                Here are some of the projects I&apos;ve
                worked on. Each project reflects my
                passion for solving real-world problems.
              </p>
            </div>

            {/* ==================================================
                VIEW ALL PROJECTS
            ================================================== */}

            <a
              href="/projects"
              className="
                group
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-blue-500
                px-5
                py-2.5
                text-xs
                font-semibold
                text-blue-500
                transition-all
                duration-300
                hover:bg-blue-500
                hover:text-white
                sm:mt-2
                sm:px-6
                sm:py-3
                sm:text-sm
              "
            >
              View All Projects

              <ArrowRight
                className="
                  h-3.5
                  w-3.5
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </a>
          </div>

          {/* ==================================================
              PROJECT LIST
          ================================================== */}

          <div className="mt-8">

            {/* ==================================================
                LOADING SKELETON
            ================================================== */}

            {loading && (
              <div
                className="
                  grid
                  grid-cols-1
                  gap-6
                  md:grid-cols-3
                "
              >
                {[1, 2, 3].map(
                  (item) => (
                    <div
                      key={item}
                      className="
                        min-h-[410px]
                        overflow-hidden
                        rounded-xl
                        bg-white
                        shadow-sm
                      "
                    >

                      {/* Image */}

                      <div
                        className="
                          h-[190px]
                          w-full
                          animate-pulse
                          bg-slate-200
                        "
                      />

                      {/* Content */}

                      <div className="space-y-4 p-5">

                        <div
                          className="
                            h-5
                            w-1/2
                            animate-pulse
                            rounded
                            bg-slate-200
                          "
                        />

                        <div
                          className="
                            h-4
                            w-2/3
                            animate-pulse
                            rounded
                            bg-slate-200
                          "
                        />

                        <div
                          className="
                            h-14
                            w-full
                            animate-pulse
                            rounded
                            bg-slate-200
                          "
                        />

                        <div className="flex gap-2">
                          <div
                            className="
                              h-7
                              w-16
                              animate-pulse
                              rounded-full
                              bg-slate-200
                            "
                          />

                          <div
                            className="
                              h-7
                              w-20
                              animate-pulse
                              rounded-full
                              bg-slate-200
                            "
                          />

                          <div
                            className="
                              h-7
                              w-16
                              animate-pulse
                              rounded-full
                              bg-slate-200
                            "
                          />
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}

            {/* ==================================================
                PROJECT CARDS
            ================================================== */}

            {!loading &&
              projects.length > 0 && (
                <div
                  className="
                    grid
                    grid-cols-1
                    gap-6
                    md:grid-cols-3
                  "
                >
                  {projects.map(
                    (project) => {
                      const projectImage =
                        project.images?.[0]
                          ?.image;

                      return (
                        <motion.article
                          key={project.id}
                          whileHover={{
                            y: -5,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          onClick={() =>
                            handleProjectClick(
                              project,
                            )
                          }
                          className="
                            group
                            min-h-[410px]
                            cursor-pointer
                            overflow-hidden
                            rounded-xl
                            bg-white
                            shadow-sm
                            transition-all
                            duration-300
                            hover:shadow-xl
                          "
                        >

                          {/* =================================================
                              PROJECT IMAGE
                          ================================================= */}

                          <div
                            className="
                              relative
                              h-[200px]
                              w-full
                              overflow-hidden
                              bg-slate-100
                              sm:h-[210px]
                            "
                          >
                            {projectImage ? (
                              <img
                                src={getProjectImage(
                                  projectImage,
                                )}
                                alt={
                                  project.name
                                }
                                className="
                                  h-full
                                  w-full
                                  object-cover
                                  transition-transform
                                  duration-500
                                  group-hover:scale-105
                                "
                              />
                            ) : (
                              <div
                                className="
                                  flex
                                  h-full
                                  w-full
                                  items-center
                                  justify-center
                                  bg-gradient-to-br
                                  from-blue-500
                                  via-indigo-500
                                  to-purple-600
                                  px-6
                                  text-center
                                "
                              >
                                <span
                                  className="
                                    text-xl
                                    font-bold
                                    text-white
                                  "
                                >
                                  {
                                    project.name
                                  }
                                </span>
                              </div>
                            )}

                            {/* Image overlay */}

                            <div
                              className="
                                pointer-events-none
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-black/30
                                via-transparent
                                to-transparent
                              "
                            />

                            {/* Project number */}

                            <div
                              className="
                                absolute
                                left-4
                                top-4
                                rounded-full
                                bg-white/95
                                px-3
                                py-1.5
                                shadow-lg
                                backdrop-blur-sm
                              "
                            >
                              <span
                                className="
                                  text-[10px]
                                  font-black
                                  text-slate-800
                                "
                              >
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

                            {project.category?.name && (
                              <div
                                className="
                                  absolute
                                  right-4
                                  top-4
                                  max-w-[55%]
                                  rounded-full
                                  bg-blue-600/90
                                  px-3
                                  py-1.5
                                  shadow-lg
                                  backdrop-blur-sm
                                "
                              >
                                <span
                                  className="
                                    block
                                    truncate
                                    text-[10px]
                                    font-bold
                                    text-white
                                  "
                                >
                                  {
                                    project
                                      .category
                                      .name
                                  }
                                </span>
                              </div>
                            )}

                            {/* Hover View */}

                            <div
                              className="
                                absolute
                                inset-x-0
                                bottom-0
                                flex
                                translate-y-2
                                justify-center
                                pb-4
                                opacity-0
                                transition-all
                                duration-300
                                group-hover:translate-y-0
                                group-hover:opacity-100
                              "
                            >
                              <span
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  rounded-full
                                  bg-white
                                  px-5
                                  py-2.5
                                  text-xs
                                  font-bold
                                  text-slate-900
                                  shadow-xl
                                "
                              >
                                View Project

                                <ArrowRight
                                  className="
                                    h-4
                                    w-4
                                    text-blue-600
                                  "
                                />
                              </span>
                            </div>
                          </div>

                          {/* =================================================
                              PROJECT CONTENT
                          ================================================= */}

                          <div
                            className="
                              flex
                              min-h-[210px]
                              flex-col
                              p-5
                            "
                          >

                            {/* Name + external link */}

                            <div
                              className="
                                flex
                                items-start
                                justify-between
                                gap-3
                              "
                            >
                              <h3
                                className="
                                  line-clamp-1
                                  text-lg
                                  font-bold
                                  leading-6
                                  text-slate-900
                                  transition-colors
                                  duration-300
                                  group-hover:text-blue-600
                                "
                              >
                                {project.name}
                              </h3>

                              {project.project_link && (
                                <a
                                  href={
                                    project.project_link
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`Open ${project.name}`}
                                  onClick={(event) =>
                                    event.stopPropagation()
                                  }
                                  className="
                                    shrink-0
                                    rounded-md
                                    p-1
                                    text-slate-500
                                    transition
                                    hover:bg-blue-50
                                    hover:text-blue-500
                                  "
                                >
                                  <ExternalLink className="h-5 w-5" />
                                </a>
                              )}
                            </div>

                            {/* Category */}

                            {project.category?.name && (
                              <p
                                className="
                                  mt-1.5
                                  text-sm
                                  font-medium
                                  text-slate-500
                                "
                              >
                                {
                                  project
                                    .category
                                    .name
                                }
                              </p>
                            )}

                            {/* Description */}

                            <p
                              className="
                                mt-3
                                line-clamp-3
                                text-sm
                                leading-6
                                text-slate-600
                              "
                            >
                              {project.description ||
                                "A software project developed with modern technologies to solve real-world problems."}
                            </p>

                            {/* Technologies */}

                            {project.technologies
                              ?.length > 0 && (
                              <div
                                className="
                                  mt-auto
                                  flex
                                  flex-wrap
                                  gap-2
                                  pt-5
                                "
                              >
                                {project.technologies
                                  .slice(
                                    0,
                                    4,
                                  )
                                  .map(
                                    (
                                      technology,
                                      index,
                                    ) => {
                                      const badgeStyles =
                                        [
                                          "bg-blue-50 text-blue-600",
                                          "bg-purple-50 text-purple-600",
                                          "bg-cyan-50 text-cyan-600",
                                          "bg-emerald-50 text-emerald-600",
                                        ];

                                      return (
                                        <span
                                          key={
                                            technology.id
                                          }
                                          className={`
                                            rounded-full
                                            px-3
                                            py-1.5
                                            text-xs
                                            font-semibold
                                            ${
                                              badgeStyles[
                                                index %
                                                  badgeStyles.length
                                              ]
                                            }
                                          `}
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
                                  .length >
                                  4 && (
                                  <span
                                    className="
                                      rounded-full
                                      bg-slate-100
                                      px-3
                                      py-1.5
                                      text-xs
                                      font-semibold
                                      text-slate-500
                                    "
                                  >
                                    +
                                    {project
                                      .technologies
                                      .length -
                                      4}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Duration */}

                            <div
                              className="
                                mt-5
                                flex
                                items-center
                                justify-between
                                border-t
                                border-slate-100
                                pt-4
                              "
                            >
                              <div
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  text-xs
                                  font-medium
                                  text-slate-400
                                "
                              >
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

                              <span
                                className="
                                  flex
                                  items-center
                                  gap-1
                                  text-xs
                                  font-bold
                                  text-blue-600
                                "
                              >
                                View Details

                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                              </span>
                            </div>
                          </div>
                        </motion.article>
                      );
                    },
                  )}
                </div>
              )}

            {/* ==================================================
                NO PROJECTS
            ================================================== */}

            {!loading &&
              projects.length === 0 && (
                <div
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-6
                    py-12
                    text-center
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-blue-50
                    "
                  >
                    <FolderOpen className="h-6 w-6 text-blue-500" />
                  </div>

                  <h3
                    className="
                      mt-4
                      text-lg
                      font-semibold
                      text-slate-800
                    "
                  >
                    No featured projects available
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-slate-500
                    "
                  >
                    Please check back later for
                    featured projects.
                  </p>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* ======================================================
          PROJECT DETAIL POPUP
      ====================================================== */}

      <AnimatePresence>
        {selectedProject && (
          <HomeProjectModal
            project={selectedProject}
            onClose={handleCloseProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   PROJECT MODAL
============================================================ */

interface HomeProjectModalProps {
  project: Project;
  onClose: () => void;
}

function HomeProjectModal({
  project,
  onClose,
}: HomeProjectModalProps) {
  const [activeImage, setActiveImage] =
    useState(0);

  const images =
    project.images || [];

  /* ==========================================================
     RESET ACTIVE IMAGE
  ========================================================== */

  useEffect(() => {
    setActiveImage(0);
  }, [project.id]);

  /* ==========================================================
     NEXT IMAGE
  ========================================================== */

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

  /* ==========================================================
     PREVIOUS IMAGE
  ========================================================== */

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
      className="
        fixed
        inset-0
        z-[200]
        flex
        items-center
        justify-center
        bg-slate-950/80
        p-3
        backdrop-blur-md
        sm:p-6
        lg:p-10
      "
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
        className="
          relative
          flex
          max-h-[94vh]
          w-full
          max-w-6xl
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-white/70
          bg-white
          shadow-[0_30px_100px_rgba(0,0,0,0.4)]
        "
      >

        {/* =====================================================
            COLOR TOP BAR
        ====================================================== */}

        <div
          className="
            h-1.5
            w-full
            bg-gradient-to-r
            from-blue-600
            via-cyan-400
            to-purple-500
          "
        />

        {/* =====================================================
            CLOSE BUTTON
        ====================================================== */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="
            absolute
            right-5
            top-5
            z-30
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/50
            bg-white/95
            text-slate-600
            shadow-lg
            backdrop-blur-md
            transition-all
            duration-300
            hover:rotate-90
            hover:bg-slate-900
            hover:text-white
          "
        >
          <X className="h-5 w-5" />
        </button>

        {/* =====================================================
            MODAL SCROLL AREA
        ====================================================== */}

        <div
          className="
            max-h-[calc(94vh-6px)]
            overflow-y-auto
          "
        >

          {/* ===================================================
              FULL IMAGE AREA
          =================================================== */}

          <div
            className="
              relative
              bg-gradient-to-br
              from-[#edf5ff]
              via-white
              to-[#f5efff]
            "
          >

            {/* Background Glow */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-64
                w-96
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-blue-200/30
                blur-[90px]
              "
            />

            {/* =================================================
                FULL IMAGE
            ================================================= */}

            <div
              className="
                relative
                flex
                h-[300px]
                w-full
                items-center
                justify-center
                p-4
                sm:h-[430px]
                sm:p-7
                lg:h-[520px]
                lg:p-10
              "
            >
              {currentImage ? (
                <img
                  src={getProjectImage(
                    currentImage,
                  )}
                  alt={project.name}
                  className="
                    max-h-full
                    max-w-full
                    object-contain
                    drop-shadow-[0_20px_35px_rgba(15,23,42,0.15)]
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white/60
                  "
                >
                  <FolderOpen
                    className="
                      h-20
                      w-20
                      text-blue-200
                    "
                  />
                </div>
              )}

              {/* =================================================
                  PROJECT NUMBER
              ================================================= */}

              <div
                className="
                  absolute
                  left-6
                  top-6
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-slate-950/90
                  px-4
                  py-2.5
                  shadow-xl
                "
              >
                <span
                  className="
                    text-[11px]
                    font-black
                    uppercase
                    tracking-wider
                    text-white
                  "
                >
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
                <div
                  className="
                    absolute
                    bottom-6
                    right-6
                    rounded-full
                    bg-white/95
                    px-4
                    py-2.5
                    text-[11px]
                    font-bold
                    text-slate-700
                    shadow-lg
                    backdrop-blur-md
                  "
                >
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
                  className="
                    absolute
                    left-4
                    top-1/2
                    flex
                    h-12
                    w-12
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white
                    bg-white/90
                    text-slate-700
                    shadow-xl
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:bg-blue-600
                    hover:text-white
                    sm:left-7
                  "
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
                  className="
                    absolute
                    right-4
                    top-1/2
                    flex
                    h-12
                    w-12
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white
                    bg-white/90
                    text-slate-700
                    shadow-xl
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:bg-blue-600
                    hover:text-white
                    sm:right-7
                  "
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* =================================================
                IMAGE THUMBNAILS
            ================================================= */}

            {images.length > 1 && (
              <div
                className="
                  border-t
                  border-slate-200/80
                  bg-white/70
                  px-5
                  py-4
                  backdrop-blur-md
                "
              >
                <div
                  className="
                    flex
                    gap-3
                    overflow-x-auto
                    pb-1
                  "
                >
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
                        className={`
                          relative
                          h-16
                          w-24
                          flex-shrink-0
                          overflow-hidden
                          rounded-xl
                          border-2
                          bg-white
                          transition-all
                          duration-300
                          sm:h-20
                          sm:w-28
                          ${
                            activeImage ===
                            index
                              ? "scale-[1.03] border-blue-500 shadow-lg shadow-blue-500/20"
                              : "border-transparent opacity-60 hover:border-blue-200 hover:opacity-100"
                          }
                        `}
                      >
                        <img
                          src={getProjectImage(
                            image.image,
                          )}
                          alt={`${project.name} image ${
                            index + 1
                          }`}
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                        />

                        {activeImage ===
                          index && (
                          <div
                            className="
                              absolute
                              inset-x-0
                              bottom-0
                              h-1
                              bg-blue-500
                            "
                          />
                        )}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ===================================================
              PROJECT INFORMATION
          =================================================== */}

          <div
            className="
              grid
              lg:grid-cols-[1fr_300px]
            "
          >

            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div
              className="
                p-7
                sm:p-9
                lg:p-12
              "
            >

              {/* Category */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-blue-50
                  px-4
                  py-2
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-blue-500
                  "
                />

                <span
                  className="
                    text-xs
                    font-bold
                    text-blue-600
                  "
                >
                  {project.category?.name}
                </span>
              </div>

              {/* Project Name */}

              <h2
                className="
                  mt-5
                  text-3xl
                  font-black
                  tracking-tight
                  text-[#101828]
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                {project.name}
              </h2>

              {/* =================================================
                  ABOUT PROJECT
              ================================================= */}

              <div className="mt-8">

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      h-8
                      w-1
                      rounded-full
                      bg-gradient-to-b
                      from-blue-500
                      to-cyan-400
                    "
                  />

                  <h3
                    className="
                      text-sm
                      font-black
                      uppercase
                      tracking-[0.16em]
                      text-slate-800
                    "
                  >
                    About This Project
                  </h3>
                </div>

                <p
                  className="
                    mt-4
                    text-sm
                    leading-7
                    text-slate-500
                    sm:text-base
                  "
                >
                  {project.description ||
                    "Project description will be available soon."}
                </p>
              </div>

              {/* =================================================
                  TECHNOLOGIES
              ================================================= */}

              <div className="mt-9">

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-purple-50
                    "
                  >
                    <Layers3
                      className="
                        h-4
                        w-4
                        text-purple-600
                      "
                    />
                  </div>

                  <h3
                    className="
                      text-sm
                      font-black
                      uppercase
                      tracking-[0.16em]
                      text-slate-800
                    "
                  >
                    Technologies Used
                  </h3>
                </div>

                <div
                  className="
                    mt-5
                    flex
                    flex-wrap
                    gap-2.5
                  "
                >
                  {project.technologies?.map(
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
                          className={`
                            rounded-xl
                            border
                            px-4
                            py-2.5
                            text-xs
                            font-bold
                            ${
                              styles[
                                index %
                                  styles.length
                              ]
                            }
                          `}
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

              {/* =================================================
                  LIVE PROJECT
              ================================================= */}

              {project.project_link && (
                <a
                  href={
                    project.project_link
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-10
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    px-6
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    shadow-blue-500/20
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    hover:shadow-blue-500/30
                  "
                >
                  View Live Project

                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside
              className="
                border-t
                border-slate-200
                bg-[#f8fbff]
                p-7
                lg:border-l
                lg:border-t-0
                lg:p-8
              "
            >

              <h3
                className="
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-slate-400
                "
              >
                Project Information
              </h3>

              <div
                className="
                  mt-6
                  space-y-4
                "
              >

                {/* =================================================
                    CATEGORY
                ================================================= */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-blue-100
                    bg-white
                    p-5
                    shadow-sm
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-blue-500
                    "
                  >
                    Category
                  </p>

                  <p
                    className="
                      mt-2
                      text-sm
                      font-black
                      text-slate-800
                    "
                  >
                    {project.category?.name}
                  </p>
                </div>

                {/* =================================================
                    DURATION
                ================================================= */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-purple-100
                    bg-white
                    p-5
                    shadow-sm
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-purple-500
                    "
                  >
                    Duration
                  </p>

                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <CalendarDays
                      className="
                        h-4
                        w-4
                        text-purple-500
                      "
                    />

                    <p
                      className="
                        text-sm
                        font-black
                        text-slate-800
                      "
                    >
                      {project.duration}{" "}
                      {project.duration ===
                      1
                        ? "Month"
                        : "Months"}
                    </p>
                  </div>
                </div>

                {/* =================================================
                    PROJECT NUMBER
                ================================================= */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-cyan-100
                    bg-white
                    p-5
                    shadow-sm
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-cyan-600
                    "
                  >
                    Project Number
                  </p>

                  <p
                    className="
                      mt-2
                      text-sm
                      font-black
                      text-slate-800
                    "
                  >
                    #
                    {String(
                      project.project_number,
                    ).padStart(2, "0")}
                  </p>
                </div>

                {/* =================================================
                    PROJECT IMAGES
                ================================================= */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-emerald-100
                    bg-white
                    p-5
                    shadow-sm
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-emerald-600
                    "
                  >
                    Project Gallery
                  </p>

                  <p
                    className="
                      mt-2
                      text-sm
                      font-black
                      text-slate-800
                    "
                  >
                    {images.length}{" "}
                    {images.length === 1
                      ? "Image"
                      : "Images"}
                  </p>
                </div>

                {/* =================================================
                    TECHNOLOGY COUNT
                ================================================= */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-orange-100
                    bg-white
                    p-5
                    shadow-sm
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-orange-500
                    "
                  >
                    Technologies
                  </p>

                  <p
                    className="
                      mt-2
                      text-sm
                      font-black
                      text-slate-800
                    "
                  >
                    {project.technologies
                      ?.length || 0}{" "}
                    {project.technologies
                      ?.length === 1
                      ? "Technology"
                      : "Technologies"}
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




