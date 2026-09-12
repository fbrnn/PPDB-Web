import { z } from "zod";
import { insertTeacherSchema } from "./schemas";
import { Teacher } from "@/db/schema";

export type { Teacher };
export type InsertTeacherInput = z.infer<typeof insertTeacherSchema>;

export type ActionResponse<T = void> = {
  success: boolean;
  message: string;
  data?: T;
};
