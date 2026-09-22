"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import {
  ArrowRight,
  Brain,
  Cloud,
  Code2,
  Database,
  Layers3,
  Monitor,
  Palette,
  Server,
  Smartphone,
  Wrench,
  Zap,
} from "lucide-react";

import {
  FaAngular,
  FaBootstrap,
  FaCss3Alt,
  FaDocker,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaLaravel,
  FaNodeJs,
  FaNpm,
  FaPhp,
  FaPython,
  FaReact,
  FaVuejs,
} from "react-icons/fa";

import {
  SiDart,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiFlutter,
  SiJson,
  SiMongodb,
  SiNextdotjs,
  SiPandas,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiSupabase,
  SiTailwindcss,
  SiTauri,
  SiTypescript,
  SiVercel,
} from "react-icons/si";


/* ============================================================
   TYPES
============================================================ */

type Skill = {
  name: string;
  icon?: React.ElementType;
  iconClass?: string;
};

type SkillCategory = {
  title: string;
  description: string;
  icon: React.ElementType;
  iconClass: string;
  background: string;
  skills: Skill[];
};

/* ============================================================
   SKILL CATEGORIES
============================================================ */

const skillCategories: SkillCategory[] = [
  /* ==========================================================
     FRONTEND
  ========================================================== */

  {
    title: "Frontend",

    description:
      "Building modern, responsive, and user-friendly interfaces with modern frontend technologies.",

    icon: Code2,

    iconClass: "text-blue-500",

    background: "bg-blue-50",

    skills: [
      {
        name: "React.js",
        icon: FaReact,
        iconClass: "text-cyan-500",
      },

      {
        name: "Next.js",
        icon: SiNextdotjs,
        iconClass: "text-slate-900",
      },

      {
        name: "Angular",
        icon: FaAngular,
        iconClass: "text-red-500",
      },

      {
        name: "Vue.js",
        icon: FaVuejs,
        iconClass: "text-emerald-500",
      },

      {
        name: "JavaScript",
        icon: FaJs,
        iconClass: "text-yellow-500",
      },

      {
        name: "TypeScript",
        icon: SiTypescript,
        iconClass: "text-blue-600",
      },

      {
        name: "HTML5",
        icon: FaHtml5,
        iconClass: "text-orange-500",
      },

      {
        name: "CSS3",
        icon: FaCss3Alt,
        iconClass: "text-blue-500",
      },

      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        iconClass: "text-cyan-500",
      },

      {
        name: "Bootstrap",
        icon: FaBootstrap,
        iconClass: "text-violet-600",
      },
    ],
  },

  /* ==========================================================
     BACKEND
  ========================================================== */

  {
    title: "Backend",

    description:
      "Developing scalable server-side applications, APIs, authentication systems, and business logic.",

    icon: Server,

    iconClass: "text-indigo-500",

    background: "bg-indigo-50",

    skills: [
      {
        name: "Node.js",
        icon: FaNodeJs,
        iconClass: "text-green-500",
      },

      {
        name: "Express.js",
        icon: SiExpress,
        iconClass: "text-slate-800",
      },

      {
        name: "NestJS",
        icon: Layers3,
        iconClass: "text-red-500",
      },

      {
        name: "Python",
        icon: FaPython,
        iconClass: "text-yellow-500",
      },

      {
        name: "FastAPI",
        icon: SiFastapi,
        iconClass: "text-emerald-500",
      },

      {
  name: "C#",
  icon: Code2,
  iconClass: "text-purple-600",
},

      {
        name: "ASP.NET",
        icon: Code2,
        iconClass: "text-purple-500",
      },

      {
        name: "ASP.NET MVC",
        icon: Code2,
        iconClass: "text-violet-500",
      },

      {
        name: "PHP",
        icon: FaPhp,
        iconClass: "text-indigo-500",
      },

      {
        name: "Laravel",
        icon: FaLaravel,
        iconClass: "text-red-500",
      },
    ],
  },

  /* ==========================================================
     DATABASES
  ========================================================== */

  {
    title: "Databases",

    description:
      "Designing structured data models and working with relational and NoSQL database systems.",

    icon: Database,

    iconClass: "text-orange-500",

    background: "bg-orange-50",

    skills: [
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        iconClass: "text-blue-500",
      },

      {
        name: "MySQL",
        icon: Database,
        iconClass: "text-blue-600",
      },

      {
        name: "Microsoft SQL Server",
        icon: Database,
        iconClass: "text-red-500",
      },

      {
        name: "MongoDB",
        icon: SiMongodb,
        iconClass: "text-green-500",
      },

      {
        name: "Supabase",
        icon: SiSupabase,
        iconClass: "text-emerald-500",
      },

      {
        name: "Firebase",
        icon: SiFirebase,
        iconClass: "text-yellow-500",
      },
    ],
  },

  /* ==========================================================
     AI & MACHINE LEARNING
  ========================================================== */

  {
    title: "AI & Machine Learning",

    description:
      "Exploring intelligent applications using machine learning, Generative AI, RAG, and AI APIs.",

    icon: Brain,

    iconClass: "text-violet-500",

    background: "bg-violet-50",

    skills: [
      {
        name: "Machine Learning",
        icon: Brain,
        iconClass: "text-violet-500",
      },

      {
        name: "Generative AI",
        icon: Brain,
        iconClass: "text-indigo-500",
      },

      {
        name: "RAG",
        icon: Layers3,
        iconClass: "text-blue-500",
      },

      {
        name: "AI APIs / LLMs",
        icon: Brain,
        iconClass: "text-purple-500",
      },

      {
        name: "Python",
        icon: FaPython,
        iconClass: "text-yellow-500",
      },

      {
        name: "Pandas",
        icon: SiPandas,
        iconClass: "text-blue-600",
      },

      {
        name: "Matplotlib",
        icon: Code2,
        iconClass: "text-cyan-600",
      },
    ],
  },

  /* ==========================================================
     MOBILE & DESKTOP
  ========================================================== */

  {
    title: "Mobile & Desktop",

    description:
      "Developing cross-platform mobile and desktop applications with modern development frameworks.",

    icon: Smartphone,

    iconClass: "text-emerald-500",

    background: "bg-emerald-50",

    skills: [
      {
        name: "Flutter",
        icon: SiFlutter,
        iconClass: "text-sky-500",
      },

      {
        name: "Dart",
        icon: SiDart,
        iconClass: "text-blue-500",
      },

      {
        name: "Tauri",
        icon: SiTauri,
        iconClass: "text-slate-800",
      },

      {
        name: "Angular",
        icon: FaAngular,
        iconClass: "text-red-500",
      },
    ],
  },

  /* ==========================================================
     APIS & DEVELOPMENT
  ========================================================== */

  {
    title: "APIs & Development",

    description:
      "Building and integrating reliable APIs with authentication, structured data, and modern development practices.",

    icon: Zap,

    iconClass: "text-cyan-500",

    background: "bg-cyan-50",

    skills: [
      {
        name: "REST APIs",
        icon: Code2,
        iconClass: "text-blue-500",
      },

      {
        name: "JSON",
        icon: SiJson,
        iconClass: "text-yellow-500",
      },

      {
        name: "CRUD",
        icon: Database,
        iconClass: "text-orange-500",
      },

      {
        name: "JWT",
        icon: Code2,
        iconClass: "text-purple-500",
      },

      {
        name: "OAuth",
        icon: Code2,
        iconClass: "text-green-500",
      },

      {
        name: "Postman",
        icon: SiPostman,
        iconClass: "text-orange-500",
      },
    ],
  },

  /* ==========================================================
     CLOUD & DEPLOYMENT
  ========================================================== */

  {
    title: "Cloud & Deployment",

    description:
      "Taking applications from development to production using deployment platforms, containers, and version control.",

    icon: Cloud,

    iconClass: "text-blue-600",

    background: "bg-sky-50",

    skills: [
      {
        name: "Vercel",
        icon: SiVercel,
        iconClass: "text-slate-900",
      },

      {
        name: "Render",
        icon: Cloud,
        iconClass: "text-blue-500",
      },

      {
        name: "Docker",
        icon: FaDocker,
        iconClass: "text-blue-500",
      },

      {
        name: "GitHub",
        icon: FaGithub,
        iconClass: "text-slate-900",
      },

      {
        name: "Git",
        icon: FaGitAlt,
        iconClass: "text-orange-500",
      },

      {
        name: "Firebase",
        icon: SiFirebase,
        iconClass: "text-yellow-500",
      },
    ],
  },

  /* ==========================================================
     UI / UX
  ========================================================== */

  {
    title: "UI/UX & Design",

    description:
      "Designing clean, modern, responsive, and user-focused interfaces with strong visual consistency.",

    icon: Palette,

    iconClass: "text-pink-500",

    background: "bg-pink-50",

    skills: [
      {
        name: "Figma",
        icon: FaFigma,
        iconClass: "text-purple-500",
      },

      {
        name: "Adobe Photoshop",
        icon: Palette,
        iconClass: "text-blue-600",
      },

      {
        name: "Adobe Illustrator",
        icon: Palette,
        iconClass: "text-orange-500",
      },

      {
        name: "Responsive Web Design",
        icon: Monitor,
        iconClass: "text-blue-500",
      },
    ],
  },

  /* ==========================================================
     TOOLS
  ========================================================== */

  {
    title: "Tools",

    description:
      "Using professional development tools and workflow technologies to build, test, and maintain applications.",

    icon: Wrench,

    iconClass: "text-slate-600",

    background: "bg-slate-100",

    skills: [
      {
        name: "VS Code",
        icon: Code2,
        iconClass: "text-blue-500",
      },

      {
  name: "Visual Studio",
  icon: Code2,
  iconClass: "text-purple-600",
},

      {
        name: "GitHub",
        icon: FaGithub,
        iconClass: "text-slate-900",
      },

      {
        name: "Postman",
        icon: SiPostman,
        iconClass: "text-orange-500",
      },

      {
        name: "Prisma",
        icon: SiPrisma,
        iconClass: "text-slate-700",
      },

      {
        name: "npm",
        icon: FaNpm,
        iconClass: "text-red-500",
      },
    ],
  },
];

/* ============================================================
   PAGE
============================================================ */

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-900">

        <Navbar />

      {/* ======================================================
          HERO
      ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-white
          px-5
          pb-16
          pt-28
          sm:px-8
          sm:pb-20
          sm:pt-32
          lg:px-14
          lg:pb-24
          lg:pt-36
          xl:px-16
        "
      >

        {/* Background glow */}

        <div
          className="
            pointer-events-none
            absolute
            left-[10%]
            top-[-100px]
            h-[400px]
            w-[400px]
            rounded-full
            bg-blue-500/10
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[-100px]
            top-[20%]
            h-[450px]
            w-[450px]
            rounded-full
            bg-indigo-500/10
            blur-[130px]
          "
        />

        <div
          className="
            relative
            mx-auto
            w-full
            max-w-[1500px]
            text-center
          "
        >

          {/* Label */}

          <div
            className="
              mx-auto
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-100
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
                font-semibold
                uppercase
                tracking-[0.18em]
                text-blue-600
              "
            >
              My Skills
            </span>
          </div>

          {/* Heading */}

          <h1
            className="
              mx-auto
              max-w-4xl
              text-4xl
              font-bold
              leading-tight
              tracking-tight
              text-slate-900
              sm:text-5xl
              lg:text-6xl
            "
          >
            Technologies &amp;

            <span className="block text-blue-500">
              Technical Expertise
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-sm
              leading-7
              text-slate-500
              sm:text-base
              lg:text-lg
            "
          >
            A collection of technologies, frameworks, tools,
            and development practices I use to design and
            build modern software solutions.
          </p>

          {/* Skill highlights */}

          <div
            className="
              mx-auto
              mt-9
              flex
              max-w-3xl
              flex-wrap
              items-center
              justify-center
              gap-3
            "
          >
            <div
              className="
                rounded-full
                border
                border-slate-200
                bg-white
                px-5
                py-2.5
                text-xs
                font-semibold
                text-slate-600
                shadow-sm
              "
            >
              Full-Stack Development
            </div>

            <div
              className="
                rounded-full
                border
                border-slate-200
                bg-white
                px-5
                py-2.5
                text-xs
                font-semibold
                text-slate-600
                shadow-sm
              "
            >
              AI &amp; Machine Learning
            </div>

            <div
              className="
                rounded-full
                border
                border-slate-200
                bg-white
                px-5
                py-2.5
                text-xs
                font-semibold
                text-slate-600
                shadow-sm
              "
            >
              UI/UX Design
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================
          SKILL CATEGORIES
      ====================================================== */}

      <section
        className="
          bg-[#f1f6ff]
          px-5
          py-16
          sm:px-8
          sm:py-20
          lg:px-14
          lg:py-24
          xl:px-16
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1500px]
          "
        >

          {/* Section heading */}

          <div className="mb-10">

            <div
              className="
                mb-4
                h-1
                w-8
                rounded-full
                bg-blue-500
              "
            />

            <h2
              className="
                text-3xl
                font-bold
                tracking-tight
                text-slate-900
                sm:text-4xl
              "
            >
              My Technical Skills
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
                sm:text-base
              "
            >
              Explore the technologies and tools I work with
              across different areas of software development.
            </p>

          </div>

          {/* ==================================================
              CATEGORY GRID
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-6
              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            {skillCategories.map((category) => {

              const CategoryIcon = category.icon;

              return (
                <article
                  key={category.title}
                  className="
                    group
                    flex
                    min-h-[430px]
                    flex-col
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-blue-200
                    hover:shadow-xl
                    sm:p-7
                  "
                >

                  {/* ==================================================
                      CATEGORY HEADER
                  ================================================== */}

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className={`
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          ${category.background}
                        `}
                      >
                        <CategoryIcon
                          className={`
                            h-6
                            w-6
                            ${category.iconClass}
                          `}
                          strokeWidth={1.8}
                        />
                      </div>

                      <div>

                        <h3
                          className="
                            text-lg
                            font-bold
                            text-slate-900
                          "
                        >
                          {category.title}
                        </h3>

                        <p
                          className="
                            mt-1
                            text-xs
                            font-medium
                            text-slate-400
                          "
                        >
                          {category.skills.length} skills
                        </p>

                      </div>

                    </div>

                    <div
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        bg-slate-50
                        text-slate-400
                        transition
                        group-hover:bg-blue-50
                        group-hover:text-blue-500
                      "
                    >
                      <ArrowRight className="h-4 w-4" />
                    </div>

                  </div>

                  {/* Description */}

                  <p
                    className="
                      mt-5
                      min-h-[72px]
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    {category.description}
                  </p>

                  {/* Divider */}

                  <div
                    className="
                      my-5
                      h-px
                      bg-slate-100
                    "
                  />

                  {/* ==================================================
                      SKILL BADGES
                  ================================================== */}

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-2.5
                    "
                  >

                    {category.skills.map((skill) => {

                      const SkillIcon = skill.icon;

                      return (
                        <div
                          key={skill.name}
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-3
                            py-2.5
                            transition-all
                            duration-200
                            hover:border-blue-200
                            hover:bg-blue-50
                            hover:shadow-sm
                          "
                        >

                          {SkillIcon ? (
                            <SkillIcon
                              className={`
                                h-4
                                w-4
                                shrink-0
                                ${skill.iconClass}
                              `}
                            />
                          ) : (
                            <span
                              className={`
                                h-2
                                w-2
                                shrink-0
                                rounded-full
                                bg-current
                                ${skill.iconClass}
                              `}
                            />
                          )}

                          <span
                            className="
                              text-xs
                              font-semibold
                              text-slate-700
                            "
                          >
                            {skill.name}
                          </span>

                        </div>
                      );
                    })}

                  </div>

                </article>
              );
            })}

          </div>
        </div>
      </section>

      {/* ======================================================
          DEVELOPMENT APPROACH
      ====================================================== */}

      <section
        className="
          bg-white
          px-5
          py-16
          sm:px-8
          sm:py-20
          lg:px-14
          lg:py-24
          xl:px-16
        "
      >

        <div
          className="
            mx-auto
            grid
            w-full
            max-w-[1200px]
            grid-cols-1
            items-center
            gap-10
            lg:grid-cols-[0.8fr_1.2fr]
            lg:gap-16
          "
        >

          {/* ==================================================
              LEFT CONTENT
          ================================================== */}

          <div>

            <div
              className="
                mb-4
                h-1
                w-8
                rounded-full
                bg-blue-500
              "
            />

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
              More Than

              <span className="block text-blue-500">
                Just Technologies
              </span>
            </h2>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-slate-500
                sm:text-base
              "
            >
              I focus on combining the right technologies
              with clean architecture, practical problem
              solving, responsive design, and maintainable
              code to create useful software solutions.
            </p>

            <a
              href="/projects"
              className="
                group
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-blue-600
                px-6
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-blue-600/20
                transition-all
                duration-300
                hover:bg-blue-500
                hover:shadow-blue-500/30
              "
            >
              Explore My Projects

              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </a>

          </div>

          {/* ==================================================
              RIGHT FEATURE CARDS
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
            "
          >

            {/* Clean Code */}

            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-6
                transition
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-lg
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                "
              >
                <Code2 className="h-5 w-5 text-blue-500" />
              </div>

              <h3
                className="
                  mt-5
                  font-bold
                  text-slate-900
                "
              >
                Clean Code
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Writing structured, readable, maintainable,
                and reusable code.
              </p>

            </div>

            {/* Scalable Systems */}

            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-6
                transition
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-lg
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-indigo-50
                "
              >
                <Layers3
                  className="h-5 w-5 text-indigo-500"
                />
              </div>

              <h3
                className="
                  mt-5
                  font-bold
                  text-slate-900
                "
              >
                Scalable Systems
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Designing applications with scalability,
                performance, and reliability in mind.
              </p>

            </div>

            {/* Problem Solving */}

            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-6
                transition
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-lg
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-violet-50
                "
              >
                <Brain
                  className="h-5 w-5 text-violet-500"
                />
              </div>

              <h3
                className="
                  mt-5
                  font-bold
                  text-slate-900
                "
              >
                Problem Solving
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Turning real-world requirements into practical
                and effective software solutions.
              </p>

            </div>

            {/* User Experience */}

            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-6
                transition
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-lg
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-pink-50
                "
              >
                <Palette
                  className="h-5 w-5 text-pink-500"
                />
              </div>

              <h3
                className="
                  mt-5
                  font-bold
                  text-slate-900
                "
              >
                User Experience
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Creating intuitive interfaces that are
                responsive, accessible, and easy to use.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* ======================================================
          CTA
      ====================================================== */}

      <section
        className="
          bg-[#f1f6ff]
          px-5
          py-16
          sm:px-8
          sm:py-20
          lg:px-14
          lg:py-24
          xl:px-16
        "
      >

      </section>

      <Footer />

    </main>
  );
}