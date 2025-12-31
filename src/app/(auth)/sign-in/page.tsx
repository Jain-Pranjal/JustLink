import React from 'react'
import SigninView from '@/modules/auth/ui/SignInView'
import { auth } from '@/lib/auth' //server instance of auth
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign In',
    description:
        'Access your JustLink dashboard and manage your links with ease. Log in to continue where you left off.',
    openGraph: {
        title: 'JustLink | Sign In',
        description:
            'Access your JustLink dashboard and manage your links with ease. Log in to continue where you left off.',
        url: 'https://justlink.live/sign-in',
        siteName: 'JustLink',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: 'JustLink | Sign In',
        description:
            'Access your JustLink dashboard and manage your links with ease. Log in to continue where you left off.',
        card: 'summary_large_image',
        site: 'https://justlink.live',
    },
}

async function SignIn() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (session) {
        // If the user is already signed in, redirect them to the home page
        redirect('/')
    }

    return (
        <div>
            <SigninView />
        </div>
    )
}

export default SignIn
