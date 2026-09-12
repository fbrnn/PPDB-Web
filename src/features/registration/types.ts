import { Registration } from "@/db/schema";
import { RegistrationStatus } from "@/lib/constants";

export type RegistrationFormData = Partial<
  Omit<Registration, "id" | "userId" | "createdAt" | "updatedAt">
>;

export interface RegistrationActionResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export type FormStep = 0 | 1 | 2 | 3 | 4;
