import { Metadata } from "next";
import { getTeachers } from "@/features/teachers/queries";
import { GuruClient } from "./guru-client";

export const metadata: Metadata = {
  title: "Kelola Katalog Guru",
};

export default async function GuruAdminPage() {
  const teachers = await getTeachers();

  return (
    <div className="space-y-6">
      <GuruClient initialTeachers={teachers} />
    </div>
  );
}
