"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UserRound,
  FolderKanban,
  Layers3,
  Code2,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  Wrench,
  Share2,
  MessageSquare,
  Settings,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const navigation = [
  {
    title: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Portfolio",
    items: [
      {
        name: "Profile",
        href: "/profile",
        icon: UserRound,
      },
      {
        name: "Categories",
        href: "/categories",
        icon: Layers3,
      },
      {
        name: "Projects",
        href: "/projects",
        icon: FolderKanban,
      },
      
      {
        name: "Skills",
        href: "/skills",
        icon: Code2,
      },
      {
        name: "Experience",
        href: "/experience",
        icon: BriefcaseBusiness,
      },
      {
        name: "Education",
        href: "/education",
        icon: GraduationCap,
      },
      {
        name: "Certifications",
        href: "/certifications",
        icon: Award,
      },
      {
        name: "Services",
        href: "/services",
        icon: Wrench,
      },
      {
        name: "Social Links",
        href: "/social-links",
        icon: Share2,
      },
    ],
  },
  {
    title: "Communication",
    items: [
      {
        name: "Messages",
        href: "/messages",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        name: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");

    router.replace("/login");
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen flex-col
          border-r border-slate-800 bg-[#0F172A]
          transition-all duration-300
          ${collapsed ? "w-[82px]" : "w-[260px]"}
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div
          className={`flex h-20 items-center border-b border-slate-800 ${
            collapsed ? "justify-center px-3" : "px-5"
          }`}
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <Code2 size={21} className="text-white" />
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <h1 className="truncate text-sm font-bold text-white">
                  DevPortfolio
                </h1>

                <p className="truncate text-[11px] text-slate-500">
                  Admin Panel
                </p>
              </div>
            )}
          </Link>

          {/* Mobile Close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-5 scrollbar-thin">
          <nav className="space-y-6">
            {navigation.map((section) => (
              <div key={section.title}>
                {!collapsed && (
                  <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
                    {section.title}
                  </p>
                )}

                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        title={collapsed ? item.name : undefined}
                        className={`
                          group relative flex items-center gap-3 rounded-xl
                          px-3 py-2.5 text-sm transition-all duration-200
                          ${
                            active
                              ? "bg-blue-600/10 text-blue-400"
                              : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                          }
                          ${
                            collapsed
                              ? "justify-center"
                              : ""
                          }
                        `}
                      >
                        {active && (
                          <span className="absolute left-0 h-6 w-0.5 rounded-full bg-blue-500" />
                        )}

                        <Icon
                          size={18}
                          strokeWidth={active ? 2.2 : 1.8}
                          className={
                            active
                              ? "text-blue-400"
                              : "text-slate-500 group-hover:text-slate-300"
                          }
                        />

                        {!collapsed && (
                          <span className="truncate">
                            {item.name}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 p-3">
          {/* Collapse */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mb-2 hidden w-full items-center justify-center rounded-xl py-2.5 text-slate-500 transition hover:bg-slate-800 hover:text-white lg:flex"
            title={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}

            {!collapsed && (
              <span className="ml-2 text-xs">
                Collapse sidebar
              </span>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`
              group flex w-full items-center gap-3 rounded-xl
              px-3 py-2.5 text-sm text-slate-400
              transition hover:bg-red-500/10 hover:text-red-400
              ${collapsed ? "justify-center" : ""}
            `}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut size={18} />

            {!collapsed && (
              <span>Logout</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}