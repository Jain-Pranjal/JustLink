import 'dotenv/config'

import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

dotenv.config({ path: '.env.local' })

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: isProd
            ? process.env.DATABASE_URL_PROD!
            : process.env.DATABASE_URL_DEV!,
    },
})
