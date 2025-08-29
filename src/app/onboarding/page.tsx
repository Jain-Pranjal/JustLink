import OnboardingForm from '@/components/OnboardingForm'
import { auth } from '@/lib/auth' //server instance of auth
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import React from 'react'
import { user, workspaces } from '@/db/schema'
import { db } from '@/db'
import { eq } from 'drizzle-orm'

export const metadata: Metadata = {
    title: 'Onboarding',
    description:
        'Just one more step to complete your setup. Complete your profile to get started.',
    openGraph: {
        title: 'JustLink | Onboarding',
        description:
            'Just one more step to complete your setup. Complete your profile to get started.',
        url: 'https://justlink.live/sign-up',
        siteName: 'JustLink',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: 'JustLink | Onboarding',
        description:
            'Just one more step to complete your setup. Complete your profile to get started.',
        card: 'summary_large_image',
        site: 'https://justlink.live',
    },
}

const OnboardingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        // If the user is not signed in, redirect them to sign in page
        redirect('/sign-in')
    }

    // if session is there and flag is true
    try {
        const [dbUser] = await db
            .select({
                onboardingComplete: user.onboardingComplete,
                username: user.userName,
                workspaceSlug: workspaces.slug,
            })
            .from(user)
            .leftJoin(workspaces, eq(user.lastWorkspaceId, workspaces.id))
            .where(eq(user.id, session.user.id))

        if (session && dbUser?.onboardingComplete) {
            if (dbUser.workspaceSlug && dbUser.username) {
                redirect(
                    `/dashboard/${dbUser.username}/${dbUser.workspaceSlug}`
                )
            }
        }
    } catch (error) {
        console.error('Error fetching user data:', error)
        redirect('/sign-in')
    }

    // session is there and flag is false
    return (
        <>
            <OnboardingForm />
        </>
    )
}

export default OnboardingPage
