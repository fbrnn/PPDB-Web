import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";

export const otps = mysqlTable("otps", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  code: varchar("code", { length: 6 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Otp = typeof otps.$inferSelect;
export type NewOtp = typeof otps.$inferInsert;
