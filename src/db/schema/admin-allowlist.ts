import { mysqlTable, varchar, mysqlEnum, timestamp } from "drizzle-orm/mysql-core";

export const adminAllowlist = mysqlTable("admin_allowlist", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: mysqlEnum("role", ["ADMIN", "SUPER_ADMIN"]).default("ADMIN").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type AdminAllowlist = typeof adminAllowlist.$inferSelect;
export type NewAdminAllowlist = typeof adminAllowlist.$inferInsert;
