import React from 'react'
import SignupView from '@/modules/auth/ui/SignUpView'
import { auth } from '@/lib/auth' //server instance of auth
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign Up',
    description:
        'Join JustLink to showcase everything you do and manage all your links in one place. Quick, easy, and completely free to start.',
    openGraph: {
        title: 'JustLink | Sign Up',
        description:
            'Join JustLink to showcase everything you do and manage all your links in one place. Quick, easy, and completely free to start.',
        url: 'https://justlink.live/sign-up',
        siteName: 'JustLink',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: 'JustLink | Sign Up',
        description:
            'Join JustLink to showcase everything you do and manage all your links in one place. Quick, easy, and completely free to start.',
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
            <SignupView />
        </div>
    )
}

export default SignIn
