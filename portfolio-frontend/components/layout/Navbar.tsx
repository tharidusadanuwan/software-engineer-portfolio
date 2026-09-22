"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Download,
  Menu,
  X,
} from "lucide-react";

/* ============================================================
   NAVIGATION ITEMS
============================================================ */

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Skills",
    href: "/skills",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

/* ============================================================
   NAVBAR
============================================================ */

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  /* ==========================================================
     ACTIVE PAGE
  ========================================================== */

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  /* ==========================================================
     ABOUT / INNER PAGES
     
     Home has dark background.
     About and other pages have light backgrounds.
  ========================================================== */

  const isHomePage = pathname === "/";

  const textMain = isHomePage
    ? "text-white"
    : "text-slate-900";

  const textSecondary = isHomePage
    ? "text-slate-400"
    : "text-slate-500";

  const navText = isHomePage
    ? "text-slate-200"
    : "text-slate-600";

  return (
    <header
      className={`
        absolute
        left-0
        right-0
        top-0
        z-50
        ${
          isHomePage
            ? "bg-transparent"
            : "bg-white/80 backdrop-blur-xl"
        }
      `}
    >
      <nav className="w-full px-6 sm:px-8 lg:px-14 xl:px-16">

        {/* ====================================================
            NAVBAR MAIN ROW
        ==================================================== */}

        <div className="flex h-[72px] items-center justify-between">

          {/* ==================================================
              LOGO + NAME
          ================================================== */}

          <Link
            href="/"
            className="group flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            {/* TS LOGO */}

            <div className="flex h-10 w-10 items-center justify-center">
              <span
                className="
                  text-[30px]
                  font-black
                  leading-none
                  tracking-[-5px]
                  text-blue-500
                "
              >
                TS
              </span>
            </div>

            {/* NAME */}

            <div className="hidden sm:block">

              <p
                className={`
                  text-[15px]
                  font-bold
                  leading-tight
                  transition-colors
                  duration-300
                  group-hover:text-blue-500
                  ${textMain}
                `}
              >
                Tharidu Sasaruwan
              </p>

              <p
                className={`
                  mt-0.5
                  text-[11px]
                  font-medium
                  ${textSecondary}
                `}
              >
                Software Engineer
              </p>

            </div>
          </Link>

          {/* ==================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <div className="hidden items-center gap-8 lg:flex">

            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    relative
                    py-2
                    text-[13px]
                    font-medium
                    transition-colors
                    duration-300

                    ${
                      active
                        ? "text-blue-500"
                        : `${navText} hover:text-blue-500`
                    }
                  `}
                >
                  {item.name}

                  {/* ACTIVE UNDERLINE */}

                  {active && (
                    <span
                      className="
                        absolute
                        -bottom-1
                        left-0
                        h-[2px]
                        w-full
                        rounded-full
                        bg-blue-500
                      "
                    />
                  )}
                </Link>
              );
            })}

          </div>

          {/* ==================================================
              DOWNLOAD CV
          ================================================== */}

          <a
            href="/assets/Tharidu_Cv_SE.pdf"
            download="Tharidu_Sasaruwan_CV.pdf"
            className={`
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-blue-400/70
              px-5
              py-2.5
              text-[12px]
              font-semibold
              transition-all
              duration-300
              hover:border-blue-500
              hover:bg-blue-500/10
              hover:text-blue-500
              lg:flex

              ${
                isHomePage
                  ? "text-slate-100"
                  : "text-slate-700"
              }
            `}
          >
            <Download className="h-3.5 w-3.5" />

            Download CV
          </a>

          {/* ==================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              setIsOpen((value) => !value)
            }
            aria-label="Toggle navigation menu"
            className={`
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              border
              transition
              lg:hidden

              ${
                isHomePage
                  ? "border-slate-700 text-slate-200 hover:border-blue-500 hover:text-blue-400"
                  : "border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-500"
              }
            `}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* ====================================================
            MOBILE NAVIGATION
        ==================================================== */}

        {isOpen && (
          <div
            className={`
              border-t
              py-4
              backdrop-blur-xl
              lg:hidden

              ${
                isHomePage
                  ? "border-slate-800/80 bg-[#070b14]/95"
                  : "border-slate-200 bg-white/95"
              }
            `}
          >
            <div className="flex flex-col gap-1">

              {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      rounded-lg
                      px-4
                      py-3
                      text-sm
                      font-medium
                      transition

                      ${
                        active
                          ? "bg-blue-500/10 text-blue-500"
                          : isHomePage
                            ? "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                            : "text-slate-600 hover:bg-blue-50 hover:text-blue-500"
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* MOBILE CV */}

              <a
                href="/assets/Tharidu_Cv_SE.pdf"
                download="Tharidu_Sasaruwan_CV.pdf"
                onClick={() => setIsOpen(false)}
                className="
                  mt-2
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-blue-600
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-500
                "
              >
                <Download className="h-4 w-4" />

                Download CV
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}