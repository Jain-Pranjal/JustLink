'use server'
import { auth } from '@/lib/auth' //server instance of auth
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { user, workspaces } from '@/db/schema'
import { db } from '@/db'
import { eq } from 'drizzle-orm'

export const checkOnboardingFlag = async () => {
    try {
        const freshSession = await auth.api.getSession({
            headers: await headers(),
        })

        if (!freshSession) {
            redirect('/sign-in')
        }
        const [dbUser] = await db
            .select({
                onboardingComplete: user.onboardingComplete,
                username: user.userName,
                workspaceSlug: workspaces.slug,
            })
            .from(user)
            .leftJoin(workspaces, eq(user.lastWorkspaceId, workspaces.id))
            .where(eq(user.id, freshSession.user.id))

        if (!dbUser) {
            redirect('/sign-in')
        }

        // if onboarding is not complete, redirect to onboarding
        if (!dbUser.onboardingComplete) {
            redirect('/onboarding')
        }

        // if onboarding is complete, redirect to dashboard/:username/:workspace
        if (dbUser.onboardingComplete && dbUser.workspaceSlug) {
            redirect(`/dashboard/${dbUser.username}/${dbUser.workspaceSlug}`)
        } else {
            // TODO: need to handle what happens if the workspace gets deleted
            redirect('/onboarding')
        }
    } catch (error) {
        console.error('Error checking onboarding flag:', error)
        redirect('/sign-in')
    }
}
