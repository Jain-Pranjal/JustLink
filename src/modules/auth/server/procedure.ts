import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { db } from '@/db'
import { user } from '@/db/schema'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { headers } from 'next/headers'
import { UAParser } from 'ua-parser-js'

export const authRouter = createTRPCRouter({
    checkUserByEmail: baseProcedure
        .input(
            z.object({
                email: z.string().email('Invalid email address'),
            })
        )
        .mutation(async ({ input }) => {
            const email = input.email.toLowerCase()
            const [userByEmail] = await db
                .select()
                .from(user)
                .where(eq(user.email, email))
                .limit(1)

            if (!userByEmail) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'User not found',
                })
            }

            return { exists: true }
        }),

    getUserRequestInfo: baseProcedure.query(async () => {
        const hdrs = await headers()

        // IP extraction for proxies & edge environments
        const ip =
            hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            hdrs.get('x-real-ip') ||
            'Unknown'

        // Device & browser info
        const userAgent = hdrs.get('user-agent') || ''
        const parser = new UAParser(userAgent)
        const deviceInfo = parser.getResult()

        return {
            ipAddress: ip,
            os: deviceInfo.os.name || 'Unknown OS',
            browser: deviceInfo.browser.name || 'Unknown Browser',
            device: deviceInfo.device.model || 'Unknown Device',
        }
    }),
})
