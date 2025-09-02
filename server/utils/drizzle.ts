import { drizzle } from 'drizzle-orm/better-sqlite3'
export { sql, eq, and, or } from 'drizzle-orm'

import * as schema from '../database/schema'
import Database from 'better-sqlite3'

export const tables = schema

export function useDrizzle() {
  if (process.env.DB_FILE_NAME === undefined) {
    throw new Error("DB_FILE_NAME is not defined")
  }
  return drizzle(process.env.DB_FILE_NAME)
}

export type User = typeof schema.sites.$inferSelect
