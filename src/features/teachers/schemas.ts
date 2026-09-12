import { z } from "zod";

export const insertTeacherSchema = z.object({
  name: z.string().min(2, "Nama terlalu pendek").max(255),
  subject: z.string().min(2, "Mata pelajaran terlalu pendek").max(255),
  imageUrl: z.string().url("URL gambar tidak valid").or(z.literal("")),
  displayOrder: z.coerce.number().int().default(0),
});
