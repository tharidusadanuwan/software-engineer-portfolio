
"use client";

import {
  ArrowRight,
  Code2,
  Download,
  GraduationCap,
  Heart,
  Mail,
  UsersRound,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contact" className="w-full">
      {/* DETAILS / ACHIEVEMENT STRIP */}
      <section
        className="
          w-full
          bg-white
          px-5
          py-5
          text-slate-900
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-[1500px]
            grid-cols-1
            divide-y
            divide-slate-200
            sm:grid-cols-2
            sm:divide-y-0
            sm:divide-x
            lg:grid-cols-4
          "
        >
          {/* ITEM 1 - EDUCATION */}
          <div
            className="
              flex
              items-center
              justify-center
              gap-4
              px-4
              py-4
              sm:py-2
              lg:justify-start
              lg:px-7
              xl:px-9
            "
          >
            <div className="shrink-0">
              <GraduationCap
                className="
                  h-8
                  w-8
                  stroke-[1.8]
                  text-blue-500
                  sm:h-9
                  sm:w-9
                "
              />
            </div>

            <div>
              <h3
                className="
                  text-sm
                  font-bold
                  leading-5
                  text-slate-900
                  sm:text-[15px]
                "
              >
                BEng (Hons)
              </h3>

              <p className="text-[10px] leading-4 text-slate-500 sm:text-[11px]">
                Computer Software Engineering
              </p>
            </div>
          </div>

          {/* ITEM 2 - PROJECTS */}
          <div
            className="
              flex
              items-center
              justify-center
              gap-4
              px-4
              py-4
              sm:py-2
              lg:justify-start
              lg:px-7
              xl:px-9
            "
          >
            <div className="shrink-0">
              <Code2
                className="
                  h-8
                  w-8
                  stroke-[1.8]
                  text-blue-500
                  sm:h-9
                  sm:w-9
                "
              />
            </div>

            <div>
              <h3 className="text-sm font-bold leading-5 text-slate-900 sm:text-[15px]">
                15+
              </h3>

              <p className="text-[10px] leading-4 text-slate-500 sm:text-[11px]">
                Projects Completed
              </p>
            </div>
          </div>

          {/* ITEM 3 - PROBLEM SOLVER */}
          <div
            className="
              flex
              items-center
              justify-center
              gap-4
              px-4
              py-4
              sm:py-2
              lg:justify-start
              lg:px-7
              xl:px-9
            "
          >
            <div className="shrink-0">
              <UsersRound
                className="
                  h-8
                  w-8
                  stroke-[1.8]
                  text-blue-500
                  sm:h-9
                  sm:w-9
                "
              />
            </div>

            <div>
              <h3 className="text-sm font-bold leading-5 text-slate-900 sm:text-[15px]">
                Problem Solver
              </h3>

              <p className="text-[10px] leading-4 text-slate-500 sm:text-[11px]">
                Always eager to learn
              </p>
            </div>
          </div>

          {/* ITEM 4 - PASSIONATE */}
          <div
            className="
              flex
              items-center
              justify-center
              gap-4
              px-4
              py-4
              sm:py-2
              lg:justify-start
              lg:px-7
              xl:px-9
            "
          >
            <div className="shrink-0">
              <Heart
                className="
                  h-8
                  w-8
                  stroke-[1.8]
                  text-blue-500
                  sm:h-9
                  sm:w-9
                "
              />
            </div>

            <div>
              <h3 className="text-sm font-bold leading-5 text-slate-900 sm:text-[15px]">
                Passionate
              </h3>

              <p className="text-[10px] leading-4 text-slate-500 sm:text-[11px]">
                About creating impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN FOOTER - MOUNTAIN BACKGROUND */}
      <section
        className="
          relative
          min-h-[400px]
          w-full
          overflow-hidden
          bg-[#07101c]
          text-white
          md:min-h-[285px]
        "
      >
        {/* MOUNTAIN IMAGE */}
        <div
          className="
            absolute
            inset-0
            bg-cover
            bg-center
            bg-no-repeat
          "
          style={{
            backgroundImage: "url('/assets/mountain.jpg')",
          }}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-[#06101c]/65" />

        {/* BOTTOM DARKNESS */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#07101c]/20
            via-[#07101c]/25
            to-[#050b14]/80
          "
        />

        {/* FOOTER CONTENT */}
        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[400px]
            w-full
            max-w-[1500px]
            flex-col
            items-center
            gap-5
            px-4
            py-8
            sm:px-10
            md:block
            md:min-h-[285px]
            md:px-10
            md:py-8
            lg:px-14
            xl:px-16
          "
        >
          {/* LEFT HANDWRITTEN TEXT */}
          <div
            className="
              absolute
              left-6
              top-1/2
              hidden
              -translate-y-1/2
              rotate-[-7deg]
              md:block
              lg:left-14
              xl:left-16
            "
          >
            <p
              className="
                font-mono
                text-sm
                leading-6
                text-blue-300/85
                sm:text-base
                sm:leading-7
              "
            >
              Good
              <br />
              Software
              <br />
              Better
              <br />
              Tomorrow
            </p>

            <svg
              width="58"
              height="50"
              viewBox="0 0 60 55"
              fill="none"
              className="ml-8 mt-[-4px]"
            >
              <path
                d="M4 49C15 35 22 23 36 16C43 12 51 9 56 8"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-blue-400"
              />

              <path
                d="M48 7L56 8L52 15"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-blue-400"
              />
            </svg>
          </div>

          {/* CENTER CONTENT */}
          <div
            className="
              relative
              mx-auto
              flex
              w-full
              max-w-[650px]
              flex-col
              items-center
              justify-center
              text-center
              md:min-h-[235px]
            "
          >
            {/* SMALL HEADING */}
            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-blue-400
                sm:text-[10px]
              "
            >
              LET&apos;S CONNECT
            </p>

            {/* MAIN HEADING */}
            <h2
              className="
                mt-1.5
                text-2xl
                font-bold
                leading-tight
                tracking-tight
                text-white
                sm:text-3xl
              "
            >
              Have a Project in Mind?
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mx-auto
                mt-2.5
                max-w-[570px]
                text-[11px]
                leading-5
                text-slate-300
                sm:text-xs
                sm:leading-5
                md:text-sm
              "
            >
              I&apos;m always open to discussing new opportunities,
              interesting ideas, or collaborations. Let&apos;s
              build something amazing together!
            </p>

            {/* GET IN TOUCH BUTTON */}
            <a
              href="/contact"
              className="
                group
                mt-5
                inline-flex
                shrink-0
                items-center
                gap-2
                rounded-full
                bg-blue-600
                px-6
                py-2.5
                text-xs
                font-semibold
                text-white
                shadow-lg
                shadow-blue-600/20
                transition-all
                duration-300
                hover:bg-blue-500
                hover:shadow-blue-500/30
                sm:px-7
                sm:py-3
                sm:text-sm
              "
            >
              <Mail className="h-4 w-4" />

              Get In Touch

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

          {/* RIGHT SOCIAL AREA */}
          <div
            className="
              relative
              z-10
              flex
              w-full
              shrink-0
              flex-col
              items-center
              justify-center
              gap-0
              md:absolute
              md:right-10
              md:top-1/2
              md:w-auto
              md:-translate-y-1/2
              lg:right-14
              xl:right-16
            "
          >
            {/* SOCIAL ICONS */}
            <div className="flex items-center justify-center gap-3">
              {/* GITHUB */}
              <a
                href="https://github.com/tharidusadanuwan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-slate-200
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-400/40
                  hover:bg-blue-500/10
                  hover:text-blue-400
                "
              >
                <FaGithub className="h-[17px] w-[17px]" />
              </a>

              {/* LINKEDIN */}
              <a
                href="https://www.linkedin.com/in/tharidu-sadanuwan-78b5a9299/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-slate-200
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-400/40
                  hover:bg-blue-500/10
                  hover:text-blue-400
                "
              >
                <FaLinkedin className="h-[17px] w-[17px]" />
              </a>

              {/* EMAIL */}
              <a
                href="mailto:tharidusadanuwan100@gmail.com"
                aria-label="Email"
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-slate-200
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-400/40
                  hover:bg-blue-500/10
                  hover:text-blue-400
                "
              >
                <Mail className="h-[17px] w-[17px]" />
              </a>

              {/* DOWNLOAD CV */}
              <a
                href="/assets/Tharidu_Cv_SE.pdf"
                download="Tharidu_Sasaruwan_CV.pdf"
                aria-label="Download CV"
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-slate-200
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-400/40
                  hover:bg-blue-500/10
                  hover:text-blue-400
                "
              >
                <Download className="h-4 w-4" />
              </a>
            </div>

            {/* AVAILABILITY */}
            <p
              className="
                mt-2.5
                whitespace-nowrap
                text-[10px]
                font-medium
                text-slate-200
                sm:text-[11px]
              "
            >
              Available for opportunities
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
