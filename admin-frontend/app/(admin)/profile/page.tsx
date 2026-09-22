"use client";

import { useEffect, useState } from "react";

import {
  Plus,
  Search,
  RefreshCw,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import { api } from "@/lib/api";

import { Admin } from "@/types/admin";

import AdminOverview from "@/components/profile/AdminOverview";
import AdminTable from "@/components/profile/AdminTable";
import AdminForm from "@/components/profile/AdminForm";

export default function ProfilePage() {
  const [admins, setAdmins] =
    useState<Admin[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [formLoading, setFormLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [editingAdmin, setEditingAdmin] =
    useState<Admin | null>(null);

  const [
    currentAdminId,
    setCurrentAdminId,
  ] = useState<number | null>(null);

  // =========================================================
  // LOAD ADMINS
  // =========================================================

  const loadAdmins = async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/admins");

      setAdmins(
        response.data.admins,
      );
    } catch (error) {
      console.error(
        "Failed to load admins:",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // GET CURRENT ADMIN
  // =========================================================

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAdmin =
        localStorage.getItem(
          "admin_user",
        );

      if (storedAdmin) {
        try {
          const admin =
            JSON.parse(storedAdmin);

          if (admin?.id) {
            setCurrentAdminId(
              Number(admin.id),
            );
          }
        } catch (error) {
          console.error(
            "Failed to parse admin user:",
            error,
          );
        }
      }
    }

    loadAdmins();
  }, []);

  // =========================================================
  // OPEN ADD
  // =========================================================

  const openAddForm = () => {
    setEditingAdmin(null);
    setShowForm(true);
  };

  // =========================================================
  // OPEN EDIT
  // =========================================================

  const openEditForm = (
    admin: Admin,
  ) => {
    setEditingAdmin(admin);
    setShowForm(true);
  };

  // =========================================================
  // CLOSE FORM
  // =========================================================

  const closeForm = () => {
    setShowForm(false);
    setEditingAdmin(null);
  };

  // =========================================================
  // SAVE ADMIN
  // =========================================================

  const saveAdmin = async (data: {
    name: string;
    email: string;
    password?: string;
  }) => {
    try {
      setFormLoading(true);

      if (editingAdmin) {
        await api.patch(
          `/admins/${editingAdmin.id}`,
          data,
        );
      } else {
        await api.post(
          "/admins",
          data,
        );
      }

      closeForm();

      await loadAdmins();

      // Update local logged-in admin
      // information if editing yourself.

      if (
        editingAdmin &&
        editingAdmin.id === currentAdminId
      ) {
        const storedAdmin =
          localStorage.getItem(
            "admin_user",
          );

        if (storedAdmin) {
          try {
            const current =
              JSON.parse(storedAdmin);

            localStorage.setItem(
              "admin_user",
              JSON.stringify({
                ...current,
                name: data.name,
                email: data.email,
              }),
            );
          } catch {
            // Ignore local storage parsing error
          }
        }
      }
    } catch (error: any) {
      console.error(
        "Failed to save admin:",
        error,
      );

      const message =
        error.response?.data?.message;

      if (Array.isArray(message)) {
        alert(message.join("\n"));
      } else {
        alert(
          message ||
            "Failed to save administrator",
        );
      }
    } finally {
      setFormLoading(false);
    }
  };

  // =========================================================
  // DELETE ADMIN
  // =========================================================

  const deleteAdmin = async (
    admin: Admin,
  ) => {
    if (
      admin.id === currentAdminId
    ) {
      alert(
        "You cannot delete your own administrator account.",
      );

      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${admin.name}"?\n\nThis action cannot be undone.`,
      );

    if (!confirmed) return;

    try {
      await api.delete(
        `/admins/${admin.id}`,
      );

      await loadAdmins();
    } catch (error: any) {
      console.error(
        "Failed to delete admin:",
        error,
      );

      const message =
        error.response?.data?.message;

      if (Array.isArray(message)) {
        alert(message.join("\n"));
      } else {
        alert(
          message ||
            "Failed to delete administrator",
        );
      }
    }
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredAdmins =
    admins.filter((admin) => {
      const query =
        search.toLowerCase().trim();

      if (!query) {
        return true;
      }

      return (
        admin.name
          .toLowerCase()
          .includes(query) ||
        admin.email
          .toLowerCase()
          .includes(query)
      );
    });

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="flex h-[calc(90vh-5rem)] min-h-0 flex-col gap-5 overflow-hidden">
      {/* PAGE HEADER */}

      <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
            <ShieldCheck className="h-5 w-5 text-blue-400" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Profile
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Manage administrator accounts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Refresh */}

          <button
            onClick={loadAdmins}
            disabled={loading}
            className="rounded-xl border border-slate-700 p-3 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                loading
                  ? "animate-spin"
                  : ""
              }`}
            />
          </button>

          {/* Add */}

          <button
            onClick={openAddForm}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
          >
            <Plus className="h-4 w-4" />

            Add Admin
          </button>
        </div>
      </div>

      {/* OVERVIEW */}

      <div className="shrink-0">
        <AdminOverview
          admins={admins}
        />
      </div>

      {/* SEARCH */}

      <div className="flex shrink-0">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search administrators..."
            className="w-full rounded-xl border border-slate-800 bg-[#111827] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </div>
      </div>

      {/* TABLE */}

      {loading ? (
        <div className="flex min-h-0 flex-1 items-center justify-center rounded-2xl border border-slate-800 bg-[#111827]">
          <Loader2 className="h-7 w-7 animate-spin text-blue-400" />
        </div>
      ) : (
        <AdminTable
          admins={filteredAdmins}
          currentAdminId={
            currentAdminId
          }
          onEdit={openEditForm}
          onDelete={deleteAdmin}
        />
      )}

      {/* FORM */}

      {showForm && (
        <AdminForm
          admin={editingAdmin}
          loading={formLoading}
          onSubmit={saveAdmin}
          onClose={closeForm}
        />
      )}
    </div>
  );
}