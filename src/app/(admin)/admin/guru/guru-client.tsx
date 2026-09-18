"use client";

import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { Teacher } from "@/features/teachers/types";
import { createTeacher, updateTeacher, deleteTeacher } from "@/features/teachers/actions";

interface GuruClientProps {
  initialTeachers: Teacher[];
}

export function GuruClient({ initialTeachers }: GuruClientProps) {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [showDialog, setShowDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Teacher>>({
    name: "",
    subject: "",
    imageUrl: "",
    displayOrder: 0,
  });

  const toastRef = useRef<Toast>(null);

  const openNew = () => {
    setFormData({ name: "", subject: "", imageUrl: "", displayOrder: 0 });
    setIsEdit(false);
    setShowDialog(true);
  };

  const openEdit = (teacher: Teacher) => {
    setFormData({ ...teacher });
    setIsEdit(true);
    setShowDialog(true);
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const saveTeacher = async () => {
    if (!formData.name || !formData.subject) {
      toastRef.current?.show({ severity: "warn", summary: "Peringatan", detail: "Nama dan Mata Pelajaran wajib diisi." });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        subject: formData.subject,
        imageUrl: formData.imageUrl || "",
        displayOrder: formData.displayOrder || 0,
      };

      if (isEdit && formData.id) {
        const res = await updateTeacher(formData.id, payload);
        if (res.success) {
          toastRef.current?.show({ severity: "success", summary: "Sukses", detail: res.message });
          // Optimistic update
          setTeachers(teachers.map(t => t.id === formData.id ? { ...t, ...payload, updatedAt: new Date() } : t));
          setShowDialog(false);
        } else {
          toastRef.current?.show({ severity: "error", summary: "Gagal", detail: res.message });
        }
      } else {
        const res = await createTeacher(payload);
        if (res.success) {
          toastRef.current?.show({ severity: "success", summary: "Sukses", detail: res.message });
          // Force reload to get the new ID from DB
          window.location.reload();
        } else {
          toastRef.current?.show({ severity: "error", summary: "Gagal", detail: res.message });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus guru ini?")) {
      const res = await deleteTeacher(id);
      if (res.success) {
        toastRef.current?.show({ severity: "success", summary: "Sukses", detail: res.message });
        setTeachers(teachers.filter(t => t.id !== id));
      } else {
        toastRef.current?.show({ severity: "error", summary: "Gagal", detail: res.message });
      }
    }
  };

  const actionBodyTemplate = (rowData: Teacher) => {
    return (
      <div className="flex gap-2">
        <Button icon="pi pi-pencil" rounded outlined size="small" onClick={() => openEdit(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" size="small" onClick={() => confirmDelete(rowData.id)} />
      </div>
    );
  };

  const imageBodyTemplate = (rowData: Teacher) => {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={rowData.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(rowData.name)}&background=0ea5e9&color=fff&size=100`} alt={rowData.name} className="w-12 h-12 rounded-full object-cover shadow-sm border border-slate-200" />
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <Toast ref={toastRef} />
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Katalog Guru</h1>
          <p className="text-sm text-slate-500">Kelola daftar tenaga pendidik yang tampil di halaman utama.</p>
        </div>
        <Button label="Tambah Guru" icon="pi pi-plus" onClick={openNew} className="bg-red-600 hover:bg-red-700 border-none" />
      </div>

      <DataTable value={teachers} paginator rows={10} dataKey="id" emptyMessage="Belum ada data guru." className="text-sm">
        <Column body={imageBodyTemplate} header="Foto" />
        <Column field="name" header="Nama Lengkap" sortable />
        <Column field="subject" header="Mata Pelajaran" sortable />
        <Column field="displayOrder" header="Urutan" sortable />
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }} />
      </DataTable>

      <Dialog visible={showDialog} style={{ width: '450px' }} header={isEdit ? "Edit Guru" : "Tambah Guru"} modal className="p-fluid" onHide={hideDialog}>
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold">Nama Lengkap & Gelar *</label>
            <InputText id="name" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required autoFocus />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-sm font-semibold">Mata Pelajaran *</label>
            <InputText id="subject" value={formData.subject || ''} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="imageUrl" className="text-sm font-semibold">URL Foto (Opsional)</label>
            <InputText id="imageUrl" value={formData.imageUrl || ''} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="Kosongkan untuk avatar default" />
            <small className="text-slate-500">Gunakan link gambar eksternal (JPG/PNG). Jika kosong, akan menggunakan inisial nama.</small>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="displayOrder" className="text-sm font-semibold">Urutan Tampil</label>
            <InputNumber id="displayOrder" value={formData.displayOrder} onValueChange={(e) => setFormData({ ...formData, displayOrder: e.value || 0 })} showButtons min={0} />
            <small className="text-slate-500">Angka lebih kecil akan tampil lebih dulu.</small>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button label="Batal" icon="pi pi-times" outlined onClick={hideDialog} disabled={isSubmitting} />
          <Button label="Simpan" icon={isSubmitting ? "pi pi-spin pi-spinner" : "pi pi-check"} onClick={saveTeacher} disabled={isSubmitting} />
        </div>
      </Dialog>
    </div>
  );
}
