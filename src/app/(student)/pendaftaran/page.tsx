import { Metadata } from "next";
import { getMyRegistration } from "@/features/registration/queries";
import { RegistrationForm } from "@/features/registration/components/registration-form";

export const metadata: Metadata = {
  title: "Formulir Pendaftaran",
  description: "Pengisian formulir pendaftaran calon murid baru online.",
};

export default async function PendaftaranPage() {
  const registration = await getMyRegistration();

  return (
    <div className="space-y-6">
      <RegistrationForm initialData={registration} />
    </div>
  );
}
