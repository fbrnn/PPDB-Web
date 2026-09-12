import {
  mysqlTable,
  varchar,
  mysqlEnum,
  timestamp,
  text,
  date,
} from "drizzle-orm/mysql-core";
import { users } from "./users";

export const registrations = mysqlTable("registrations", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),

  // Status
  status: mysqlEnum("status", [
    "DRAFT",
    "SUBMITTED",
    "REVISION_REQUIRED",
    "VERIFIED",
  ])
    .default("DRAFT")
    .notNull(),

  // Step 1: Personal Data
  fullName: varchar("full_name", { length: 255 }),
  nisn: varchar("nisn", { length: 20 }),
  nik: varchar("nik", { length: 20 }),
  gender: mysqlEnum("gender", ["L", "P"]), // L = Laki-laki, P = Perempuan
  birthPlace: varchar("birth_place", { length: 100 }),
  birthDate: date("birth_date", { mode: "string" }),
  religion: varchar("religion", { length: 50 }),
  phoneNumber: varchar("phone_number", { length: 25 }),

  // Step 2: Address Data
  address: text("address"),
  rtRw: varchar("rt_rw", { length: 20 }),
  village: varchar("village", { length: 100 }), // Kelurahan / Desa
  district: varchar("district", { length: 100 }), // Kecamatan
  city: varchar("city", { length: 100 }), // Kota / Kabupaten
  postalCode: varchar("postal_code", { length: 10 }),

  // Step 3: Previous School Data
  previousSchoolName: varchar("previous_school_name", { length: 255 }),
  previousSchoolNpsn: varchar("previous_school_npsn", { length: 20 }),
  graduationYear: varchar("graduation_year", { length: 4 }),
  diplomaNumber: varchar("diploma_number", { length: 100 }),

  // Step 4: Parent & Guardian Data
  fatherName: varchar("father_name", { length: 255 }),
  fatherNik: varchar("father_nik", { length: 20 }),
  fatherOccupation: varchar("father_occupation", { length: 100 }),
  fatherPhone: varchar("father_phone", { length: 25 }),

  motherName: varchar("mother_name", { length: 255 }),
  motherNik: varchar("mother_nik", { length: 20 }),
  motherOccupation: varchar("mother_occupation", { length: 100 }),
  motherPhone: varchar("mother_phone", { length: 25 }),

  guardianName: varchar("guardian_name", { length: 255 }),
  guardianNik: varchar("guardian_nik", { length: 20 }),
  guardianOccupation: varchar("guardian_occupation", { length: 100 }),
  guardianPhone: varchar("guardian_phone", { length: 25 }),
  guardianRelation: varchar("guardian_relation", { length: 50 }),

  // Admin notes / Revision feedback
  revisionNotes: text("revision_notes"),

  // Submission timestamps
  submittedAt: timestamp("submitted_at"),
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Registration = typeof registrations.$inferSelect;
export type NewRegistration = typeof registrations.$inferInsert;
