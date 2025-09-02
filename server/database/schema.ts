import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core'

export const sites = sqliteTable("sites",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),
        site: text("site").notNull(),
        year: integer("year").notNull(),
        url: text("url").notNull(),
        createdAt: integer("createdAt").default(Date.now()).notNull(),
        file: blob("file").notNull()
    }
)