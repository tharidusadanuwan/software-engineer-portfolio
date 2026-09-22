"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  UserRound,
} from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  setMobileOpen: (open: boolean) => void;
  collapsed: boolean;
}

interface Admin {
  id: number;
  name: string;
  email: string;
}

export default function Navbar({
  setMobileOpen,
  collapsed,
}: NavbarProps) {
  const [admin, setAdmin] = useState<Admin | null>(null);

  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user");

    if (storedUser) {
      try {
        setAdmin(JSON.parse(storedUser));
      } catch {
        setAdmin(null);
      }
    }
  }, []);

  const firstLetter =
    admin?.name?.charAt(0).toUpperCase() || "A";

  return (
    <header
      className={`
        fixed
        right-0
        top-0
        z-30
        h-20
        border-b
        border-slate-800
        bg-[#0B1220]/95
        backdrop-blur-xl
        transition-all
        duration-300
        left-0
        ${
          collapsed
            ? "lg:left-[82px]"
            : "lg:left-[260px]"
        }
      `}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6">

        {/* =====================================================
            LEFT SECTION
        ====================================================== */}
        <div className="flex min-w-0 items-center gap-3">

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-slate-800
              bg-slate-900
              text-slate-400
              transition
              hover:border-slate-700
              hover:bg-slate-800
              hover:text-white
              lg:hidden
            "
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Search */}
          <div className="relative hidden md:block">
            <Search
              size={17}
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-slate-600
              "
            />

            <input
              type="text"
              placeholder="Search..."
              className="
                h-10
                w-56
                rounded-xl
                border
                border-slate-800
                bg-slate-900/60
                pl-10
                pr-4
                text-sm
                text-white
                outline-none
                transition
                placeholder:text-slate-600
                focus:border-blue-500/50
                focus:bg-slate-900
                focus:ring-2
                focus:ring-blue-500/10
                lg:w-64
              "
            />
          </div>

          {/* Mobile Title */}
          <div className="md:hidden">
            <p className="text-sm font-semibold text-white">
              Admin Panel
            </p>
          </div>
        </div>

        {/* =====================================================
            RIGHT SECTION
        ====================================================== */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Notification Button */}
          <button
            type="button"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-800
              bg-slate-900/60
              text-slate-400
              transition
              hover:border-slate-700
              hover:bg-slate-800
              hover:text-white
            "
            title="Notifications"
          >
            <Bell size={18} />

            {/* Notification Indicator */}
            <span
              className="
                absolute
                right-2.5
                top-2
                h-1.5
                w-1.5
                rounded-full
                bg-blue-500
                ring-2
                ring-[#0B1220]
              "
            />
          </button>

          {/* Divider */}
          <div
            className="
              mx-1
              hidden
              h-8
              w-px
              bg-slate-800
              sm:block
            "
          />

          {/* =================================================
              ADMIN PROFILE
          ================================================== */}
          <div className="relative">

            {/* Profile Button */}
            <button
              type="button"
              onClick={() =>
                setProfileOpen(!profileOpen)
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                px-2
                py-1.5
                transition
                hover:bg-slate-800/60
              "
              aria-label="Admin profile"
            >
              {/* Avatar */}
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-600/15
                  text-sm
                  font-bold
                  text-blue-400
                  ring-1
                  ring-blue-500/20
                "
              >
                {firstLetter}
              </div>

              {/* Admin Details */}
              <div className="hidden text-left sm:block">
                <p
                  className="
                    max-w-[130px]
                    truncate
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  {admin?.name || "Admin"}
                </p>

                <p
                  className="
                    max-w-[130px]
                    truncate
                    text-[11px]
                    text-slate-500
                  "
                >
                  Administrator
                </p>
              </div>

              {/* Arrow */}
              <ChevronDown
                size={15}
                className={`
                  hidden
                  text-slate-500
                  transition-transform
                  duration-200
                  sm:block
                  ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            {/* =================================================
                PROFILE DROPDOWN
            ================================================== */}
            {profileOpen && (
              <>
                {/* Background Click Layer */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                />

                {/* Dropdown */}
                <div
                  className="
                    absolute
                    right-0
                    top-14
                    z-50
                    w-64
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-800
                    bg-[#111827]
                    shadow-2xl
                    shadow-black/40
                  "
                >
                  {/* Profile Information */}
                  <div
                    className="
                      border-b
                      border-slate-800
                      p-4
                    "
                  >
                    <div className="flex items-center gap-3">

                      {/* Avatar */}
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-blue-600/15
                          font-bold
                          text-blue-400
                        "
                      >
                        {firstLetter}
                      </div>

                      {/* Details */}
                      <div className="min-w-0">
                        <p
                          className="
                            truncate
                            text-sm
                            font-semibold
                            text-white
                          "
                        >
                          {admin?.name || "Admin"}
                        </p>

                        <p
                          className="
                            truncate
                            text-xs
                            text-slate-500
                          "
                        >
                          {admin?.email ||
                            "admin@example.com"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Links */}
                  <div className="p-2">

                    {/* Profile */}
                    <Link
                      href="/profile"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        text-slate-400
                        transition
                        hover:bg-slate-800
                        hover:text-white
                      "
                    >
                      <UserRound size={17} />

                      <span>
                        Profile
                      </span>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}