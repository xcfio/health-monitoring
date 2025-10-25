import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/database",
    dbCredentials: { url: process.env.DATABASE_URI }
})
