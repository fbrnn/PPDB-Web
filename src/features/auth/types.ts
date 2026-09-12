import { UserRole } from "@/lib/constants";

export interface CurrentUser {
  userId: string;
  email: string;
  role: UserRole;
  name?: string | null;
}

export interface AuthActionResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
