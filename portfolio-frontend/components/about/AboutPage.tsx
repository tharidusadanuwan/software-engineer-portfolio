"use client";

import Image from "next/image";

import {
  ArrowRight,
  Download,
  GraduationCap,
  Code2,
  Brain,
  Database,
  Smartphone,
  Monitor,
  Palette,
  Layers3,
  Cloud,
  Server,
} from "lucide-react";

import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiFlutter,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiTailwindcss,
} from "react-icons/si";

/* ============================================================
   WHAT I DO SERVICES
============================================================ */

const services = [
  {
    title: "Web Development",

    description:
      "I build modern, responsive, and user-friendly web applications using technologies like React.js, Next.js, JavaScript, and TypeScript. I focus on clean interfaces, performance, scalability, and delivering seamless experiences across devices.",

    icon: Monitor,

    iconClass: "text-blue-500",

    background: "bg-blue-50",
  },

  {
    title: "Full-Stack Development",

    description:
      "I develop complete web solutions covering both frontend and backend, from user interfaces to databases and APIs. I work with Node.js, NestJS, FastAPI, .NET, PHP/Laravel, PostgreSQL, MySQL, and MongoDB to build reliable applications.",

    icon: Layers3,

    iconClass: "text-indigo-500",

    background: "bg-indigo-50",
  },

  {
    title: "Backend & API Development",

    description:
      "I create secure and scalable backend systems with well-structured REST APIs, authentication, database integration, and business logic. I focus on maintainable architecture, efficient data handling, security, and reliable communication between applications.",

    icon: Server,

    iconClass: "text-orange-500",

    background: "bg-orange-50",
  },

  {
    title: "Mobile App Development",

    description:
      "I develop cross-platform mobile applications using Flutter and Dart, with responsive interfaces and practical functionality. I can integrate applications with APIs, databases, authentication systems, and cloud services.",

    icon: Smartphone,

    iconClass: "text-emerald-500",

    background: "bg-emerald-50",
  },

  {
    title: "AI & Machine Learning",

    description:
      "I build AI-powered applications that use Machine Learning, Generative AI, RAG, and AI APIs to solve real-world problems. I focus on integrating intelligent features into practical software solutions that provide useful, data-driven insights.",

    icon: Brain,

    iconClass: "text-violet-500",

    background: "bg-violet-50",
  },

  {
    title: "UI/UX Design",

    description:
      "I design clean, modern, and user-focused interfaces using Figma, Photoshop, and Illustrator. I focus on intuitive navigation, responsive layouts, visual consistency, and creating engaging user experiences.",

    icon: Palette,

    iconClass: "text-pink-500",

    background: "bg-pink-50",
  },

  {
    title: "Database & System Development",

    description:
      "I design and manage structured databases using PostgreSQL, MySQL, SQL Server, and MongoDB. I develop efficient data models, relationships, CRUD operations, and database-driven systems with scalability in mind.",

    icon: Database,

    iconClass: "text-cyan-500",

    background: "bg-cyan-50",
  },

  {
    title: "Deployment & Integration",

    description:
      "I help take applications from development to production using platforms such as Vercel, Render, GitHub, and cloud services. I also work with API integrations, environment configuration, version control, and deployment troubleshooting.",

    icon: Cloud,

    iconClass: "text-blue-600",

    background: "bg-sky-50",
  },
];

/* ============================================================
   TECHNOLOGIES
============================================================ */

const technologies = [
  {
    name: "React",
    icon: FaReact,
    className: "text-cyan-500",
  },

  {
    name: "Next.js",
    icon: SiNextdotjs,
    className: "text-slate-900",
  },

  {
    name: "Node.js",
    icon: FaNodeJs,
    className: "text-green-500",
  },

  {
    name: "Python",
    icon: FaPython,
    className: "text-yellow-500",
  },

  {
    name: "Flutter",
    icon: SiFlutter,
    className: "text-sky-500",
  },

  {
    name: "MongoDB",
    icon: SiMongodb,
    className: "text-green-500",
  },

  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    className: "text-blue-500",
  },

  {
    name: "Firebase",
    icon: SiFirebase,
    className: "text-yellow-500",
  },

  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    className: "text-cyan-500",
  },

  {
    name: "Git",
    icon: FaGitAlt,
    className: "text-orange-500",
  },
];

/* ============================================================
   ABOUT PAGE
============================================================ */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-900">

      {/* ======================================================
          ABOUT HERO
      ====================================================== */}

      <section
        id="about"
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

        {/* ==================================================
            BACKGROUND GLOW
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-[10%]
            top-[15%]
            h-[450px]
            w-[450px]
            rounded-full
            bg-blue-500/5
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[-100px]
            top-[10%]
            h-[450px]
            w-[450px]
            rounded-full
            bg-indigo-500/5
            blur-[120px]
          "
        />

        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

        <div
          className="
            relative
            mx-auto
            grid
            w-full
            max-w-[1500px]
            grid-cols-1
            items-center
            gap-12
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-20
          "
        >

          {/* ==================================================
              LEFT IMAGE
          ================================================== */}

          <div
            className="
              relative
              order-2
              flex
              justify-center
              lg:order-1
            "
          >

            {/* Blue circle */}

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[330px]
                w-[330px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-gradient-to-br
                from-blue-500
                to-indigo-600
                sm:h-[410px]
                sm:w-[410px]
              "
            />

            {/* Glow */}

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[390px]
                w-[390px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-blue-500/20
                blur-3xl
                sm:h-[480px]
                sm:w-[480px]
              "
            />

            {/* Profile image */}

            <div
              className="
                relative
                z-10
                h-[430px]
                w-[330px]
                sm:h-[520px]
                sm:w-[400px]
              "
            >
              <Image
                src="/assets/image_about.png"
                alt="Tharidu Sasaruwan - Software Engineer"
                fill
                priority
                sizes="
                  (max-width: 640px) 330px,
                  400px
                "
                className="
                  object-contain
                  object-bottom
                  drop-shadow-[0_25px_40px_rgba(0,0,0,0.25)]
                "
              />
            </div>

            {/* =================================================
                EDUCATION FLOATING CARD
            ================================================= */}

            <div
              className="
                absolute
                bottom-8
                left-0
                z-20
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                py-4
                shadow-xl
                sm:left-4
              "
            >
              <div className="flex items-center gap-3">

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
                  <GraduationCap
                    className="h-6 w-6 text-blue-500"
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    BEng (Hons)
                  </p>

                  <p className="text-xs text-slate-500">
                    Computer Software Engineering
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* ==================================================
              RIGHT ABOUT CONTENT
          ================================================== */}

          <div
            className="
              order-1
              lg:order-2
            "
          >

            {/* Small label */}

            <div
              className="
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
                About Me
              </span>
            </div>

            {/* Heading */}

            <h1
              className="
                max-w-3xl
                text-4xl
                font-bold
                leading-tight
                tracking-tight
                text-slate-900
                sm:text-5xl
                lg:text-[52px]
              "
            >
              Building Software

              <span className="block text-blue-500">
                With Purpose.
              </span>
            </h1>

            {/* ==================================================
                ABOUT ME PARAGRAPH
            ================================================== */}

            <div
              className="
                mt-7
                max-w-3xl
                space-y-4
              "
            >

              <p
                className="
                  text-base
                  leading-8
                  text-slate-600
                  sm:text-lg
                "
              >
                I&apos;m a passionate Software Engineer and
                Full-Stack Developer with a BEng (Hons) in
                Computer Software Engineering.
              </p>

              <p
                className="
                  text-sm
                  leading-7
                  text-slate-500
                  sm:text-base
                "
              >
                I enjoy designing and developing modern,
                scalable, and user-focused software solutions.
                My experience includes React.js, Next.js,
                Node.js, Python, FastAPI, C#, .NET,
                PHP/Laravel, and Flutter.
              </p>

              <p
                className="
                  text-sm
                  leading-7
                  text-slate-500
                  sm:text-base
                "
              >
                I have strong knowledge of PostgreSQL, MySQL,
                SQL Server, MongoDB, REST APIs, and cloud-based
                technologies. I&apos;m also interested in AI/ML,
                Generative AI, RAG, and AI-powered application
                development.
              </p>

              <p
                className="
                  text-sm
                  leading-7
                  text-slate-500
                  sm:text-base
                "
              >
                Through academic, personal, and real-world
                projects, I have developed strong problem-solving
                and analytical skills. I enjoy learning new
                technologies, experimenting with innovative
                ideas, and turning concepts into working
                applications.
              </p>

              <p
                className="
                  text-sm
                  leading-7
                  text-slate-500
                  sm:text-base
                "
              >
                My goal is to build high-quality, efficient,
                and impactful digital solutions while
                continuously growing as a software engineer.
              </p>

            </div>

            {/* ==================================================
                BUTTONS
            ================================================== */}

            <div
              className="
                mt-8
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >

              {/* Download CV */}

              <a
                href="/assets/Tharidu_Cv_SE.pdf"
                download="Tharidu_Sasaruwan_CV.pdf"
                className="
                  inline-flex
                  items-center
                  justify-center
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
                  transition
                  hover:bg-blue-500
                "
              >
                <Download className="h-4 w-4" />

                Download CV
              </a>

              {/* Let's Connect */}

              <a
                href="/contact"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-slate-300
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-slate-700
                  transition
                  hover:border-blue-500
                  hover:text-blue-500
                "
              >
                Let&apos;s Connect

                <ArrowRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </a>

            </div>

          </div>

        </div>
      </section>

      {/* ======================================================
          WHAT I DO
      ====================================================== */}

      <section
        className="
          w-full
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

        <div className="mx-auto w-full max-w-[1500px]">

          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="mb-10 text-center">

            <div
              className="
                mx-auto
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
              What I Do
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-3xl
                text-sm
                leading-6
                text-slate-500
                sm:text-base
                sm:leading-7
              "
            >
              I create complete digital solutions by combining
              software engineering, modern technologies,
              artificial intelligence, and thoughtful user
              experiences.
            </p>

          </div>

          {/* ==================================================
              SERVICES GRID
          ================================================== */}

          <div
            className="
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

                    flex
                    min-h-[250px]
                    flex-col
                    rounded-2xl
                    p-6

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:shadow-xl
                  `}
                >

                  {/* Icon */}

                  <div
                    className="
                      mb-5
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/80
                    "
                  >
                    <Icon
                      className={`
                        h-7
                        w-7
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
                    "
                  >
                    {service.title}
                  </h3>

                  {/* Description */}

                  <p
                    className="
                      mt-3
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
          TECHNOLOGIES
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

        <div className="mx-auto w-full max-w-[1500px]">

          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="mb-10 text-center">

            <div
              className="
                mx-auto
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
              Technologies I Work With
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-2xl
                text-sm
                text-slate-500
                sm:text-base
              "
            >
              A selection of technologies and tools I use to
              build modern software solutions.
            </p>

          </div>

          {/* ==================================================
              TECHNOLOGY GRID
          ================================================== */}

          <div
            className="
              grid
              grid-cols-2
              gap-4
              sm:grid-cols-3
              md:grid-cols-5
              lg:grid-cols-10
            "
          >

            {technologies.map((technology) => {

              const Icon = technology.icon;

              return (
                <div
                  key={technology.name}
                  className="
                    flex
                    min-h-[120px]
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-3
                    py-5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-blue-200
                    hover:bg-blue-50/50
                    hover:shadow-md
                  "
                >

                  <Icon
                    className={`
                      h-9
                      w-9
                      ${technology.className}
                    `}
                  />

                  <span
                    className="
                      mt-3
                      text-xs
                      font-semibold
                      text-slate-600
                    "
                  >
                    {technology.name}
                  </span>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* ======================================================
          EDUCATION / PROJECTS / PROBLEM SOLVING
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
            grid
            w-full
            max-w-[1200px]
            grid-cols-1
            gap-6
            md:grid-cols-3
          "
        >

          {/* ==================================================
              EDUCATION
          ================================================== */}

          <div
            className="
              group
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-7
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-blue-50
              "
            >
              <GraduationCap
                className="h-7 w-7 text-blue-500"
              />
            </div>

            <h3
              className="
                mt-6
                text-lg
                font-bold
                text-slate-900
              "
            >
              BEng (Hons)
            </h3>

            <p
              className="
                mt-2
                text-sm
                font-medium
                text-blue-500
              "
            >
              Computer Software Engineering
            </p>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-slate-500
              "
            >
              Academic foundation in software engineering,
              application development, databases, system
              design, and modern computing technologies.
            </p>

          </div>

          {/* ==================================================
              PROJECTS
          ================================================== */}

          <div
            className="
              group
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-7
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-emerald-50
              "
            >
              <Code2
                className="h-7 w-7 text-emerald-500"
              />
            </div>

            <h3
              className="
                mt-6
                text-lg
                font-bold
                text-slate-900
              "
            >
              15+ Projects
            </h3>

            <p
              className="
                mt-2
                text-sm
                font-medium
                text-emerald-500
              "
            >
              Software Projects Completed
            </p>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-slate-500
              "
            >
              Experience developing web, mobile, backend,
              database, AI-powered, and desktop applications
              using modern software technologies.
            </p>

          </div>

          {/* ==================================================
              PROBLEM SOLVING
          ================================================== */}

          <div
            className="
              group
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-7
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-violet-50
              "
            >
              <Brain
                className="h-7 w-7 text-violet-500"
              />
            </div>

            <h3
              className="
                mt-6
                text-lg
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
                font-medium
                text-violet-500
              "
            >
              Analytical &amp; Practical Thinking
            </p>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-slate-500
              "
            >
              Focused on understanding real-world problems,
              designing practical solutions, and transforming
              ideas into reliable and useful software systems.
            </p>

          </div>

        </div>
      </section>

    </main>
  );
}