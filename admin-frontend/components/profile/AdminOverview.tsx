"use client";

import {
  ShieldCheck,
  Users,
  UserRoundCheck,
} from "lucide-react";

import { Admin } from "@/types/admin";

interface AdminOverviewProps {
  admins: Admin[];
}

export default function AdminOverview({
  admins,
}: AdminOverviewProps) {
  const totalAdmins = admins.length;

  const activeAdmins = admins.length;

  const latestAdmin =
    admins.length > 0
      ? admins[admins.length - 1]
      : null;

  const cards = [
    {
      title: "Total Admins",
      value: totalAdmins,
      description: "Registered administrators",
      icon: Users,
    },
    {
      title: "Active Admins",
      value: activeAdmins,
      description: "Accounts with dashboard access",
      icon: UserRoundCheck,
    },
    {
      title: "Admin Security",
      value: "Protected",
      description: "JWT authentication enabled",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  {card.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  {card.value}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {card.description}
                </p>
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