import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { db } from '@/db'
import { waitlist } from '@/db/schema'
import { z } from 'zod'
import { eq, count } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { resend } from '@/lib/resend'
import WaitlistThankYouEmail from '@/components/emails/waitlist'

export const waitlistRouter = createTRPCRouter({
    create: baseProcedure
        .input(z.object({ email: z.string().email().toLowerCase() }))
        .mutation(async ({ input }) => {
            // Check if email already exists
            const existingEntry = await db
                .select()
                .from(waitlist)
                .where(eq(waitlist.email, input.email))

            if (existingEntry.length > 0) {
                throw new TRPCError({
                    code: 'CONFLICT',
                    message: 'Email already exists in waitlist',
                })
            }

            const [createdWaitlistEntry] = await db
                .insert(waitlist)
                .values({
                    email: input.email,
                })
                .returning()

            //   Send confirmation email
            try {
                await resend.emails.send({
                    from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_WAITLIST_SENDER_ADDRESS}>`, //TODO: change the email to waitlist@yourdomain.com
                    to: input.email,
                    subject: '🎉 Welcome to the JustLink Waitlist!',
                    react: WaitlistThankYouEmail({ email: input.email }),
                })
            } catch (err) {
                console.error('Failed to send waitlist email:', err)
            }

            return createdWaitlistEntry
        }),

    getTotalWaitlistEntries: baseProcedure
        .input(
            z
                .object({
                    refetchOnWindowFocus: z.boolean().optional(),
                    refetchInterval: z.number().optional(),
                })
                .optional()
        )
        .query(async () => {
            const [totalCount] = await db
                .select({ count: count() })
                .from(waitlist)
            return totalCount.count
        }),
})

// we need to pass array as drizzle expects an array of objects to insert
