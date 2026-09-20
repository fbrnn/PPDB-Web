"use client";

import React, { useState, useRef, useTransition } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";

import {
  REGISTRATION_STATUS_LABELS,
  REGISTRATION_STATUS_SEVERITY,
  RegistrationStatus,
} from "@/lib/constants";
import { RegistrationListItem } from "../queries";
import { updateRegistrationStatus } from "../actions";

interface AdminRegistrationsTableProps {
  initialData: RegistrationListItem[];
}

export function AdminRegistrationsTable({
  initialData,
}: AdminRegistrationsTableProps) {
  const toastRef = useRef<Toast>(null);
  const [isPending, startTransition] = useTransition();

  const [dataList, setDataList] = useState<RegistrationListItem[]>(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Modal Detail & Verifikasi
  const [selectedItem, setSelectedItem] = useState<RegistrationListItem | null>(
    null
  );
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState("");

  const statusOptions = [
    { label: "Semua Status", value: null },
    { label: "Draf", value: "DRAFT" },
    { label: "Terkirim (Menunggu)", value: "SUBMITTED" },
    { label: "Perlu Perbaikan", value: "REVISION_REQUIRED" },
    { label: "Terverifikasi", value: "VERIFIED" },
  ];

  // Filtered data based on status dropdown & global filter
  const filteredData = dataList.filter((item) => {
    if (statusFilter && item.status !== statusFilter) {
      return false;
    }
    if (!globalFilter) return true;
    const q = globalFilter.toLowerCase();
    return (
      (item.fullName && item.fullName.toLowerCase().includes(q)) ||
      (item.nisn && item.nisn.toLowerCase().includes(q)) ||
      (item.userEmail && item.userEmail.toLowerCase().includes(q)) ||
      (item.previousSchoolName &&
        item.previousSchoolName.toLowerCase().includes(q))
    );
  });

  const handleOpenDetail = (item: RegistrationListItem) => {
    setSelectedItem(item);
    setRevisionNotes(item.revisionNotes || "");
    setIsDialogVisible(true);
  };

  const handleUpdateStatus = (
    newStatus: RegistrationStatus,
    notesToSend?: string
  ) => {
    if (!selectedItem) return;

    startTransition(async () => {
      const res = await updateRegistrationStatus(
        selectedItem.id,
        newStatus,
        notesToSend
      );

      if (res.success) {
        toastRef.current?.show({
          severity: "success",
          summary: "Status Diperbarui",
          detail: res.message,
          life: 3000,
        });

        // Update local table data
        setDataList((prev) =>
          prev.map((it) =>
            it.id === selectedItem.id
              ? {
                  ...it,
                  status: newStatus,
                  revisionNotes: notesToSend ?? it.revisionNotes,
                  updatedAt: new Date(),
                }
              : it
          )
        );

        setIsDialogVisible(false);
        setSelectedItem(null);
      } else {
        toastRef.current?.show({
          severity: "error",
          summary: "Gagal Memperbarui",
          detail: res.message,
          life: 4000,
        });
      }
    });
  };

  const statusBodyTemplate = (rowData: RegistrationListItem) => {
    return (
      <Tag
        value={REGISTRATION_STATUS_LABELS[rowData.status]}
        severity={REGISTRATION_STATUS_SEVERITY[rowData.status]}
        className="!text-[11px] !font-semibold !px-2.5 !py-1 !rounded-md"
      />
    );
  };

  const actionBodyTemplate = (rowData: RegistrationListItem) => {
    return (
      <Button
        label="Kelola"
        icon="pi pi-user-edit"
        size="small"
        outlined
        onClick={() => handleOpenDetail(rowData)}
        className="!text-xs !py-1 !px-2.5 !border-slate-300 !text-slate-700 hover:!bg-slate-100 hover:!text-slate-900 !rounded-lg"
      />
    );
  };

  return (
    <div className="space-y-6">
      <Toast ref={toastRef} />

      {/* Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex items-center w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <i className="pi pi-search text-xs leading-none" />
            </div>
            <InputText
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Cari nama, NISN, email..."
              className="w-full !pl-9 !pr-3 !py-2 !text-xs !bg-white !rounded-lg !border-slate-300"
            />
          </div>

          <Dropdown
            value={statusFilter}
            options={statusOptions}
            onChange={(e) => setStatusFilter(e.value)}
            placeholder="Pilih Status"
            className="w-full sm:w-52 !text-xs !rounded-lg !border-slate-300"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 shrink-0">
          Menampilkan <span className="font-bold text-slate-800">{filteredData.length}</span> dari{" "}
          <span className="font-bold text-slate-800">{dataList.length}</span> pendaftar
        </div>
      </div>

      {/* PrimeReact DataTable */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <DataTable
          value={filteredData}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Menampilkan {first} - {last} dari {totalRecords} data"
          emptyMessage="Tidak ada data pendaftar yang cocok dengan filter."
          className="text-xs"
          rowHover
        >
          <Column
            field="fullName"
            header="Nama Lengkap"
            body={(row: RegistrationListItem) => (
              <div className="py-0.5">
                <div className="font-semibold text-slate-900 text-xs">
                  {row.fullName || (
                    <span className="text-slate-400 italic font-normal">
                      (Belum mengisi nama)
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                  {row.userEmail}
                </div>
              </div>
            )}
            sortable
          />
          <Column
            field="nisn"
            header="NISN"
            body={(row: RegistrationListItem) =>
              row.nisn ? (
                <span className="font-mono text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/80">
                  {row.nisn}
                </span>
              ) : (
                <span className="text-slate-300">-</span>
              )
            }
            sortable
          />
          <Column
            field="previousSchoolName"
            header="Sekolah Asal"
            body={(row: RegistrationListItem) => (
              <span className="text-slate-700">
                {row.previousSchoolName || <span className="text-slate-300">-</span>}
              </span>
            )}
            sortable
          />
          <Column
            field="city"
            header="Kota Domisili"
            body={(row: RegistrationListItem) => (
              <span className="text-slate-700 capitalize">
                {row.city || <span className="text-slate-300">-</span>}
              </span>
            )}
            sortable
          />
          <Column
            field="status"
            header="Status Pendaftaran"
            body={statusBodyTemplate}
            sortable
          />
          <Column
            field="updatedAt"
            header="Terakhir Diperbarui"
            body={(row: RegistrationListItem) => (
              <span className="text-slate-600 font-mono text-[11px]">
                {new Date(row.updatedAt).toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
            sortable
          />
          <Column
            header="Aksi"
            body={actionBodyTemplate}
            style={{ width: "100px", textAlign: "center" }}
          />
        </DataTable>
      </div>

      {/* Dialog Detail & Verifikasi */}
      <Dialog
        header={`Detail & Verifikasi: ${
          selectedItem?.fullName || selectedItem?.userEmail || "Pendaftar"
        }`}
        visible={isDialogVisible}
        onHide={() => setIsDialogVisible(false)}
        className="w-full max-w-3xl"
        footer={
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <Button
              label="Tutup"
              icon="pi pi-times"
              outlined
              size="small"
              onClick={() => setIsDialogVisible(false)}
              disabled={isPending}
            />

            <div className="flex flex-wrap items-center gap-2">
              <Button
                label="Minta Perbaikan"
                icon="pi pi-exclamation-triangle"
                severity="danger"
                size="small"
                onClick={() =>
                  handleUpdateStatus("REVISION_REQUIRED", revisionNotes)
                }
                loading={isPending}
              />
              <Button
                label="Verifikasi Sah"
                icon="pi pi-check-circle"
                severity="success"
                size="small"
                onClick={() => handleUpdateStatus("VERIFIED")}
                loading={isPending}
              />
            </div>
          </div>
        }
      >
        {selectedItem && (
          <div className="space-y-6 pt-2 text-xs">
            {/* Status Saat Ini */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500">Status Saat Ini: </span>
                <span className="font-bold text-slate-800">
                  {REGISTRATION_STATUS_LABELS[selectedItem.status]}
                </span>
              </div>
              <Tag
                value={REGISTRATION_STATUS_LABELS[selectedItem.status]}
                severity={REGISTRATION_STATUS_SEVERITY[selectedItem.status]}
              />
            </div>

            {/* Grid Informasi Lengkap */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Data Pribadi */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-red-800 uppercase tracking-wider text-[11px] mb-2">
                  1. Data Pribadi Siswa
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">NIK Siswa:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.nik || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">NISN:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.nisn || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Jenis Kelamin:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.gender === "L"
                      ? "Laki-laki"
                      : selectedItem.gender === "P"
                      ? "Perempuan"
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">TTL:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.birthPlace || "-"},{" "}
                    {selectedItem.birthDate || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Agama:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.religion || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">No. WhatsApp:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.phoneNumber || "-"}
                  </span>
                </div>
              </div>

              {/* Data Alamat */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-red-800 uppercase tracking-wider text-[11px] mb-2">
                  2. Alamat Domisili
                </div>
                <div>
                  <span className="text-slate-500">Alamat: </span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.address || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">RT / RW:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.rtRw || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kelurahan:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.village || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kecamatan:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.district || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kota / Kode Pos:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.city || "-"} ({selectedItem.postalCode || "-"})
                  </span>
                </div>
              </div>

              {/* Sekolah Asal */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-red-800 uppercase tracking-wider text-[11px] mb-2">
                  3. Sekolah Asal
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama Sekolah:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.previousSchoolName || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">NPSN:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.previousSchoolNpsn || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tahun Lulus:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.graduationYear || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">No. Ijazah / SKL:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.diplomaNumber || "-"}
                  </span>
                </div>
              </div>

              {/* Data Orang Tua */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-red-800 uppercase tracking-wider text-[11px] mb-2">
                  4. Orang Tua & Wali
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama Ayah:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.fatherName || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">No. HP Ayah:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.fatherPhone || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama Ibu:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.motherName || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">No. HP Ibu:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.motherPhone || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Wali:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedItem.guardianName || "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Input Catatan Perbaikan / Revisi */}
            <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-2">
              <label
                htmlFor="revisionNotes"
                className="font-bold text-slate-800 block text-xs"
              >
                Catatan Revisi / Instruksi Perbaikan untuk Siswa (Jika meminta revisi):
              </label>
              <InputTextarea
                id="revisionNotes"
                rows={3}
                value={revisionNotes}
                onChange={(e) => setRevisionNotes(e.target.value)}
                placeholder="Contoh: Lampirkan nomor NIK yang sesuai dengan kartu keluarga dan perjelas foto dokumen raport."
                className="w-full text-xs"
                disabled={isPending}
              />
              <span className="text-[11px] text-slate-500 block">
                Catatan ini akan langsung terlihat di dashboard akun siswa terkait.
              </span>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
