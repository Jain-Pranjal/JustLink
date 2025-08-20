import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/db'
import { FullSchema } from '@/db/schema'
import { haveIBeenPwned } from 'better-auth/plugins'
import { oneTap } from 'better-auth/plugins'
import { resend } from '@/lib/resend'
import VerifyEmail from '@/components/emails/verify-email'
import ForgotPasswordEmail from '@/components/emails/reset-password'
import PasswordResetConfirmation from '@/components/emails/reset-password-confirmation'

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: FullSchema,
    }),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,

        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_NO_REPLY}>`,
                to: user.email,
                subject: 'Reset your password',
                react: ForgotPasswordEmail({
                    username: user.name,
                    resetUrl: url,
                    userEmail: user.email,
                }),
            })
        },
        resetPasswordTokenExpiresIn: 3600, // Set expiry to 1 hour

        // Send the confirmation mail after the passwd reset
        onPasswordReset: async ({ user }) => {
            await resend.emails.send({
                from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_NO_REPLY}>`,
                to: user.email,
                subject: 'Your password has been reset',
                react: PasswordResetConfirmation({
                    userEmail: user.email,
                    resetTime: new Date().toLocaleString(),
                }),
            })
        },
    },

    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            await resend.emails.send({
                from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_NO_REPLY}>`,
                to: user.email,
                subject: 'Verify your email',
                react: VerifyEmail({ username: user.name, verifyUrl: url }),
            })
        },
        sendOnSignUp: true,
        expiresIn: 3600, // 1 hour in seconds
    },

    //   TODO : CHANGE THE CALLBACK URL ON ALL PLATFORM

    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            prompt: 'select_account',
        },
        twitter: {
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
        },
    },

    plugins: [
        haveIBeenPwned({
            customPasswordCompromisedMessage:
                'This password has been exposed in a data breach. Please choose a stronger, unique password.',
        }),
        oneTap(),
    ],
})
