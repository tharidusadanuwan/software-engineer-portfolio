import Image from "next/image";

import {
  ArrowDown,
  ArrowRight,
  Download,
  Mail,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
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

import Navbar from "@/components/layout/Navbar";
import HomeSections from "@/components/home/HomeSections";
import Footer from "@/components/layout/Footer";

/* ============================================================
   TECHNOLOGIES
============================================================ */

const technologies = [
  {
    name: "React",
    icon: FaReact,
    className: "text-cyan-400",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    className: "text-white",
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
    className: "text-green-500",
  },
  {
    name: "Python",
    icon: FaPython,
    className: "text-yellow-400",
  },
  {
    name: "Flutter",
    icon: SiFlutter,
    className: "text-sky-400",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    className: "text-green-500",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    className: "text-blue-300",
  },
  {
    name: "Firebase",
    icon: SiFirebase,
    className: "text-yellow-400",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    className: "text-cyan-400",
  },
  {
    name: "Git",
    icon: FaGitAlt,
    className: "text-orange-500",
  },
];

/* ============================================================
   HOME PAGE
============================================================ */

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white">

      {/* ======================================================
          NAVBAR
      ====================================================== */}

      <Navbar />

      {/* ======================================================
          HERO
      ====================================================== */}

      <section
        id="home"
        className="
          relative
          flex
          h-screen
          min-h-[600px]
          max-h-[900px]
          flex-col
          overflow-hidden
          bg-[#070b14]
        "
      >

        {/* ====================================================
            BACKGROUND GLOW
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-[52%]
            top-[28%]
            h-[480px]
            w-[480px]
            -translate-x-1/2
            rounded-full
            bg-blue-600/10
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[-80px]
            top-[30%]
            h-[350px]
            w-[350px]
            rounded-full
            bg-indigo-600/10
            blur-[110px]
          "
        />

        {/* Small decorative dot */}
        <div
          className="
            pointer-events-none
            absolute
            left-[48%]
            top-[53%]
            h-1.5
            w-1.5
            rounded-full
            bg-blue-500
          "
        />

        {/* ====================================================
            MAIN HERO CONTENT
        ==================================================== */}

        <div
          className="
            relative
            flex
            flex-1
            items-center
            px-5
            pt-[72px]
            sm:px-8
            lg:px-10
            xl:px-14
          "
        >

          <div
            className="
              mx-auto
              grid
              w-full
              max-w-[1500px]
              grid-cols-1
              items-center
              lg:grid-cols-[1fr_0.95fr]
            "
          >

            {/* ==================================================
                LEFT CONTENT
            ================================================== */}

            <div
              className="
                relative
                z-20
                max-w-[700px]
              "
            >

              {/* Welcome badge */}

              <div
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-slate-700
                  bg-slate-800/50
                  px-4
                  py-2
                  backdrop-blur-sm
                "
              >
                <span className="text-sm">
                  👋
                </span>

                <span className="text-xs font-medium text-slate-200 sm:text-sm">
                  Welcome to my portfolio
                </span>
              </div>

              {/* Hello */}

              <p
                className="
                  mb-3
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-blue-400
                  sm:text-sm
                "
              >
                Hello, I&apos;m
              </p>

              {/* ==================================================
                  TITLE
              ================================================== */}

              <h1
                className="
                  text-[2.6rem]
                  font-bold
                  leading-[1.05]
                  tracking-[-0.04em]
                  text-white
                  sm:text-5xl
                  md:text-[3.5rem]
                  lg:text-[3.6rem]
                  xl:text-[4rem]
                "
              >
                Hi, I&apos;m Tharidu

                <span className="block">
                  Software{" "}
                  <span className="text-blue-500">
                    Engineer
                  </span>
                  <span className="text-blue-500">
                    |
                  </span>
                </span>
              </h1>

              {/* Description */}

              <p
                className="
                  mt-5
                  max-w-[600px]
                  text-sm
                  leading-6
                  text-slate-300
                  sm:text-base
                  sm:leading-7
                "
              >
                I build modern, scalable, and user-friendly
                applications that solve real-world problems.
                Passionate about creating meaningful impact
                through technology.
              </p>

              {/* ==================================================
    BUTTONS
================================================== */}

<div className="mt-7 flex flex-col gap-3 sm:flex-row">

  {/* View My Work */}
  <a
    href="/projects"
    className="
      group
      inline-flex
      items-center
      justify-center
      gap-2
      rounded-full
      bg-blue-600
      px-6
      py-3
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
    View My Work

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

                {/* Let's Connect */}


<a
  href="/contact"
  className="
    inline-flex
    items-center
    justify-center
    rounded-full
    border
    border-slate-500
    px-6
    py-3
    text-sm
    font-semibold
    text-slate-100
    transition-all
    duration-300
    hover:border-blue-400
    hover:bg-blue-500/5
    hover:text-white
  "
>
  Let&apos;s Connect
</a>
              </div>

              {/* ==================================================
                  SOCIAL
              ================================================== */}

              <div className="mt-6 flex items-center gap-3">

                {/* GitHub */}

                <a
    href="https://github.com/tharidusadanuwan"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub"
    className="
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-lg
      border
      border-slate-800
      bg-slate-900/30
      text-slate-300
      transition-all
      duration-300
      hover:border-blue-500/50
      hover:bg-blue-500/10
      hover:text-white
    "
  >
    <FaGithub className="h-[17px] w-[17px]" />
  </a>

                {/* LinkedIn */}

                <a
    href="https://www.linkedin.com/in/tharidu-sadanuwan-78b5a9299/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-lg
      border
      border-slate-800
      bg-slate-900/30
      text-slate-300
      transition-all
      duration-300
      hover:border-blue-500/50
      hover:bg-blue-500/10
      hover:text-white
    "
  >
    <FaLinkedin className="h-[17px] w-[17px]" />
  </a>

                {/* Email */}

                <a
                  href="mailto:"
                  aria-label="Email"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-800
                    bg-slate-900/30
                    text-slate-300
                    transition-all
                    duration-300
                    hover:border-blue-500/50
                    hover:bg-blue-500/10
                    hover:text-white
                  "
                >
                  <Mail className="h-[17px] w-[17px]" />
                </a>

                {/* Download CV */}

                <a
                  href="/assets/Tharidu_Cv_SE.pdf"
                  download="Tharidu_Sasaruwan_CV.pdf"
                  aria-label="Download CV"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-800
                    bg-slate-900/30
                    text-slate-300
                    transition-all
                    duration-300
                    hover:border-blue-500/50
                    hover:bg-blue-500/10
                    hover:text-white
                  "
                >
                  <Download className="h-[16px] w-[16px]" />
                </a>
              </div>
            </div>

            {/* ==================================================
                RIGHT IMAGE AREA
            ================================================== */}

            <div
              className="
                relative
                hidden
                h-[520px]
                items-center
                lg:flex
              "
            >

              {/* =================================================
                  BLUE CIRCLE
              ================================================= */}

              <div
                className="
                  absolute
                  left-[17%]
                  top-1/2
                  h-[330px]
                  w-[330px]
                  -translate-y-1/2
                  rounded-full
                  bg-blue-600/20
                  blur-3xl
                  xl:h-[380px]
                  xl:w-[380px]
                "
              />

              <div
                className="
                  absolute
                  left-[18%]
                  top-1/2
                  h-[290px]
                  w-[290px]
                  -translate-y-1/2
                  rounded-full
                  bg-gradient-to-br
                  from-blue-500
                  via-blue-600
                  to-indigo-600
                  xl:h-[350px]
                  xl:w-[350px]
                "
              />

              {/* =================================================
                  PROFILE IMAGE
              ================================================= */}

              <div
                className="
                  absolute
                  bottom-[-5px]
                  right-[2%]
                  z-10
                  h-[470px]
                  w-[380px]
                  xl:left-[10%]
                  xl:h-[520px]
                  xl:w-[420px]
                "
              >
                <Image
                  src="/assets/myimage_new.png"
                  alt="Tharidu Sasaruwan - Software Engineer"
                  fill
                  priority
                  sizes="420px"
                  className="
                    object-contain
                    object-bottom
                    drop-shadow-[0_20px_45px_rgba(0,0,0,0.5)]
                  "
                />
              </div>

              {/* =================================================
                  TURN IDEAS INTO REALITY
              ================================================= */}

              <div
                className="
                  absolute
                  left-[0%]
                  top-[17%]
                  z-20
                  rotate-[-8deg]
                "
              >
                <p
                  className="
                    font-mono
                    text-xs
                    leading-5
                    text-blue-300/90
                    xl:text-sm
                  "
                >
                  Turn
                  <br />
                  Ideas
                  <br />
                  into
                  <br />
                  Reality
                </p>

                <svg
                  width="52"
                  height="42"
                  viewBox="0 0 55 45"
                  fill="none"
                  className="ml-1 mt-1"
                >
                  <path
                    d="M3 4C8 18 16 27 31 31C39 33 45 31 51 27"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-blue-400"
                  />

                  <path
                    d="M44 25L51 27L47 34"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-blue-400"
                  />
                </svg>
              </div>

              {/* =================================================
                  CODE CARD
              ================================================= */}

              <div
                className="
                  absolute
                  right-[1%]
                  top-[18%]
                  z-20
                  w-[190px]
                  rounded-xl
                  border
                  border-slate-700
                  bg-[#0b1220]/90
                  p-3.5
                  shadow-2xl
                  backdrop-blur-xl
                "
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-blue-400">
                    &lt;/&gt;
                  </span>

                  <span className="text-[9px] text-slate-600">
                    ··
                  </span>
                </div>

                <div className="font-mono text-[8px] leading-[1.6] text-blue-300/80">
                  <p>
                    <span className="text-purple-400">
                      const
                    </span>{" "}
                    developer = {"{"}
                  </p>

                  <p className="pl-2">
                    passion:{" "}
                    <span className="text-slate-300">
                      &quot;Building&quot;
                    </span>
                    ,
                  </p>

                  <p className="pl-2">
                    focus:{" "}
                    <span className="text-slate-300">
                      &quot;Problem Solving&quot;
                    </span>
                    ,
                  </p>

                  <p className="pl-2">
                    goal:{" "}
                    <span className="text-slate-300">
                      &quot;Make an Impact&quot;
                    </span>
                  </p>

                  <p>
                    {"};"}
                  </p>
                </div>
              </div>

              {/* =================================================
                  ALWAYS LEARNING
              ================================================= */}

              <div
                className="
                  absolute
                  bottom-[17%]
                  right-[0%]
                  z-20
                  rotate-[-4deg]
                "
              >
                <p
                  className="
                    font-mono
                    text-xs
                    leading-5
                    text-blue-300/80
                    xl:text-sm
                  "
                >
                  Always
                  <br />
                  Learning
                  <br />
                  Always
                  <br />
                  Improving
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            TECHNOLOGY STRIP
        ======================================================= */}

        <div
          className="
            relative
            z-30
            w-full
            border-t
            border-slate-800/80
            bg-[#070b14]/90
          "
        >
          <div
            className="
              grid
              w-full
              grid-cols-5
              gap-y-4
              px-5
              py-3
              sm:grid-cols-10
              sm:gap-y-0
              sm:px-8
              lg:px-10
              xl:px-14
            "
          >
            {technologies.map((technology) => {
              const Icon = technology.icon;

              return (
                <div
                  key={technology.name}
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-1
                  "
                >
                  <Icon
                    className={`h-7 w-7 ${technology.className}`}
                  />

                  <span
                    className="
                      whitespace-nowrap
                      text-[9px]
                      font-medium
                      text-slate-300
                      sm:text-[10px]
                    "
                  >
                    {technology.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* =======================================================
            SCROLL INDICATOR
        ======================================================= */}

        <a
          href="#about"
          aria-label="Scroll to About"
          className="
            absolute
            bottom-[80px]
            left-1/2
            z-40
            hidden
            -translate-x-1/2
            animate-bounce
            text-slate-600
            transition
            hover:text-blue-400
            xl:block
          "
        >
          <ArrowDown className="h-4 w-4" />
        </a>

      </section>

      {/* File 2 */}
      <HomeSections />

      {/* File 3 */}
      <Footer />
      
    </main>
  );
}