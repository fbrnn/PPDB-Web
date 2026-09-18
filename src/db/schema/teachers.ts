import { mysqlTable, varchar, int, timestamp, mediumtext } from "drizzle-orm/mysql-core";

export const teachers = mysqlTable("teachers", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  imageUrl: mediumtext("image_url"),
  displayOrder: int("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Teacher = typeof teachers.$inferSelect;
export type NewTeacher = typeof teachers.$inferInsert;
