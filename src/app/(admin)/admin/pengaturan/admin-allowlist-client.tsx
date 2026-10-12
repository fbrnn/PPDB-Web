"use client";

import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { AdminAllowlist } from "@/db/schema/admin-allowlist";
import {
  addAdminToAllowlist,
  updateAdminRole,
  removeAdminFromAllowlist,
} from "@/features/auth/admin-actions";

interface AdminAllowlistClientProps {
  initialData: AdminAllowlist[];
  currentUserEmail: string;
}

const roleOptions = [
  { label: "Admin", value: "ADMIN" },
  { label: "Super Admin", value: "SUPER_ADMIN" },
];

export function AdminAllowlistClient({
  initialData,
  currentUserEmail,
}: AdminAllowlistClientProps) {
  const [admins, setAdmins] = useState<AdminAllowlist[]>(initialData);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<"ADMIN" | "SUPER_ADMIN">("ADMIN");

  const toastRef = useRef<Toast>(null);

  const showToast = (
    severity: "success" | "error" | "warn" | "info",
    summary: string,
    detail: string
  ) => {
    toastRef.current?.show({ severity, summary, detail, life: 4000 });
  };

  // --- Tambah Admin ---
  const handleAdd = async () => {
    if (!newEmail.trim()) {
      showToast("warn", "Peringatan", "Email wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await addAdminToAllowlist({
        email: newEmail,
        role: newRole,
      });

      if (result.success) {
        showToast("success", "Berhasil", result.message);
        setShowAddDialog(false);
        setNewEmail("");
        setNewRole("ADMIN");
        // Reload to get fresh data with new IDs
        window.location.reload();
      } else {
        showToast("error", "Gagal", result.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Ubah Role ---
  const handleRoleChange = async (
    admin: AdminAllowlist,
    newRoleValue: "ADMIN" | "SUPER_ADMIN"
  ) => {
    if (admin.role === newRoleValue) return;

    setIsSubmitting(true);
    try {
      const result = await updateAdminRole(admin.id, newRoleValue);

      if (result.success) {
        showToast("success", "Berhasil", result.message);
        setAdmins((prev) =>
          prev.map((a) =>
            a.id === admin.id ? { ...a, role: newRoleValue } : a
          )
        );
      } else {
        showToast("error", "Gagal", result.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Hapus Admin ---
  const handleDelete = (admin: AdminAllowlist) => {
    confirmDialog({
      message: (
        <span>
          Apakah Anda yakin ingin menghapus{" "}
          <strong>{admin.email}</strong> dari daftar administrator?
          <br />
          <span className="text-xs text-slate-500 mt-1 block">
            Jika user ini sudah pernah login, role-nya akan dikembalikan menjadi
            Siswa.
          </span>
        </span>
      ),
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Ya, Hapus",
      rejectLabel: "Batal",
      acceptClassName:
        "!bg-red-600 hover:!bg-red-700 !text-white !border-none !text-xs !py-2 !px-4 !rounded-lg",
      rejectClassName:
        "!text-xs !py-2 !px-4 !border-slate-300 !text-slate-700 hover:!bg-slate-100 !rounded-lg",
      accept: async () => {
        setIsSubmitting(true);
        try {
          const result = await removeAdminFromAllowlist(admin.id);

          if (result.success) {
            showToast("success", "Berhasil", result.message);
            setAdmins((prev) => prev.filter((a) => a.id !== admin.id));
          } else {
            showToast("error", "Gagal", result.message);
          }
        } finally {
          setIsSubmitting(false);
        }
      },
    });
  };

  // --- Column Templates ---
  const emailBodyTemplate = (rowData: AdminAllowlist) => {
    const isSelf = rowData.email === currentUserEmail;
    return (
      <div className="flex items-center gap-2">
        <span className="font-medium text-slate-800">{rowData.email}</span>
        {isSelf && (
          <Tag
            value="Anda"
            severity="info"
            className="!text-[10px] !px-1.5 !py-0"
          />
        )}
      </div>
    );
  };

  const roleBodyTemplate = (rowData: AdminAllowlist) => {
    const isSuperAdmin = rowData.role === "SUPER_ADMIN";
    return (
      <Tag
        value={isSuperAdmin ? "Super Admin" : "Admin"}
        severity={isSuperAdmin ? "danger" : "info"}
        className="!text-[10px] !px-2 !py-0.5"
      />
    );
  };

  const roleEditorTemplate = (rowData: AdminAllowlist) => {
    const isSelf = rowData.email === currentUserEmail;

    // Jangan izinkan Super Admin mengubah role diri sendiri
    if (isSelf) {
      return roleBodyTemplate(rowData);
    }

    return (
      <Dropdown
        value={rowData.role}
        options={roleOptions}
        onChange={(e) =>
          handleRoleChange(rowData, e.value as "ADMIN" | "SUPER_ADMIN")
        }
        disabled={isSubmitting}
        className="!text-xs"
        panelClassName="!text-xs"
      />
    );
  };

  const dateBodyTemplate = (rowData: AdminAllowlist) => {
    return (
      <span className="text-slate-500">
        {new Date(rowData.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </span>
    );
  };

  const actionBodyTemplate = (rowData: AdminAllowlist) => {
    const isSelf = rowData.email === currentUserEmail;

    if (isSelf) {
      return (
        <span className="text-xs text-slate-400 italic">Tidak dapat dihapus</span>
      );
    }

    return (
      <Button
        icon="pi pi-trash"
        rounded
        outlined
        severity="danger"
        size="small"
        onClick={() => handleDelete(rowData)}
        disabled={isSubmitting}
        tooltip="Hapus dari daftar admin"
        tooltipOptions={{ position: "left" }}
      />
    );
  };

  return (
    <div className="space-y-6">
      <Toast ref={toastRef} />
      <ConfirmDialog />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manajemen Administrator
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola siapa saja yang memiliki akses administrator ke panel SPMB.
            Hanya Super Admin yang dapat mengakses halaman ini.
          </p>
        </div>
        <Button
          label="Tambah Admin"
          icon="pi pi-plus"
          onClick={() => setShowAddDialog(true)}
          className="!bg-red-600 hover:!bg-red-700 !border-none !text-xs !py-2.5 !px-5 !rounded-xl !shadow-sm"
        />
      </div>

      {/* Info Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <i className="pi pi-info-circle text-amber-600 mt-0.5" />
        <div className="text-xs text-amber-800 leading-relaxed">
          <strong>Cara kerja:</strong> Email yang terdaftar di sini akan otomatis
          mendapatkan akses admin saat login menggunakan OTP. Email yang tidak
          terdaftar akan masuk sebagai Siswa. Jika email dihapus dari daftar ini,
          user tersebut akan menjadi Siswa saat login berikutnya.
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <DataTable
          value={admins}
          paginator
          rows={10}
          dataKey="id"
          emptyMessage="Belum ada administrator terdaftar."
          className="text-sm"
        >
          <Column
            header="Email"
            body={emailBodyTemplate}
            sortable
            sortField="email"
          />
          <Column
            header="Role"
            body={roleEditorTemplate}
            sortable
            sortField="role"
            style={{ width: "200px" }}
          />
          <Column
            header="Ditambahkan"
            body={dateBodyTemplate}
            sortable
            sortField="createdAt"
            style={{ width: "150px" }}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ width: "120px" }}
          />
        </DataTable>
      </div>

      {/* Dialog Tambah Admin */}
      <Dialog
        visible={showAddDialog}
        style={{ width: "90vw", maxWidth: "450px" }}
        header="Tambah Administrator Baru"
        modal
        onHide={() => {
          setShowAddDialog(false);
          setNewEmail("");
          setNewRole("ADMIN");
        }}
        footer={
          <div className="flex items-center justify-end gap-2.5">
            <Button
              type="button"
              label="Batal"
              icon="pi pi-times"
              outlined
              onClick={() => {
                setShowAddDialog(false);
                setNewEmail("");
                setNewRole("ADMIN");
              }}
              disabled={isSubmitting}
              className="!text-xs !py-2 !px-4 !border-slate-300 !text-slate-700 hover:!bg-slate-100 !rounded-lg"
            />
            <Button
              type="button"
              label="Tambahkan"
              icon={isSubmitting ? "pi pi-spin pi-spinner" : "pi pi-check"}
              onClick={handleAdd}
              disabled={isSubmitting}
              className="!bg-red-600 hover:!bg-red-700 !text-white !border-none !text-xs !py-2 !px-5 !rounded-lg !shadow-xs"
            />
          </div>
        }
      >
        <div className="flex flex-col gap-4 pt-1">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="admin-email"
              className="text-xs font-semibold text-slate-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <InputText
              id="admin-email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="contoh: guru@sekolah.sch.id"
              autoFocus
              className="w-full !text-xs !py-2 !px-3 !rounded-lg !border-slate-300"
            />
            <small className="text-[11px] text-slate-500">
              Email ini akan mendapat akses admin saat login dengan OTP.
            </small>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="admin-role"
              className="text-xs font-semibold text-slate-700"
            >
              Role <span className="text-red-500">*</span>
            </label>
            <Dropdown
              id="admin-role"
              value={newRole}
              options={roleOptions}
              onChange={(e) => setNewRole(e.value)}
              className="w-full !text-xs"
              panelClassName="!text-xs"
            />
            <small className="text-[11px] text-slate-500">
              <strong>Admin</strong> — Dapat mengelola data pendaftar dan
              konten.
              <br />
              <strong>Super Admin</strong> — Semua hak Admin + mengelola
              daftar administrator.
            </small>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
