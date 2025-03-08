// export const userTable = pgTable("user", {
//     id: text("id").primaryKey(),
//     name: text("name").notNull(),
//     email: text("email").notNull().unique(),
//     emailVerified: boolean("email_verified").notNull(),
//     image: text("image"),
//     createdAt: timestamp("created_at").notNull(),
//     updatedAt: timestamp("updated_at").notNull(),
//     twoFactorEnabled: boolean("two_factor_enabled"),
//     age: integer("age"),
//     firstName: text("first_name"),
//     lastName: text("last_name"),
//   });