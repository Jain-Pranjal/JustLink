import React from 'react'
import { auth } from '@/lib/auth' //server instance of auth
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import ReEmailVerificationForm from '@/modules/auth/ui/ReEmailVerificationForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Verify Email',
    description:
        'Please verify your email address to activate your JustLink account. A confirmation link has been sent to your inbox. Secure your account and get started now.',
    openGraph: {
        title: 'JustLink | Verify Email',
        description:
            'Please verify your email address to activate your JustLink account. A confirmation link has been sent to your inbox. Secure your account and get started now.',
        url: 'https://justlink.live/verify-email',
        siteName: 'JustLink',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: 'JustLink | Verify Email',
        description:
            'Please verify your email address to activate your JustLink account. A confirmation link has been sent to your inbox. Secure your account and get started now.',
        card: 'summary_large_image',
        site: 'https://justlink.live',
    },
}

async function VerifyEmail() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (session) {
        // If the user is already signed in, redirect them to the home page
        redirect('/')
    }

    return (
        <div>
            <ReEmailVerificationForm />
        </div>
    )
}

export default VerifyEmail

// This componennt will habdle ke agar link ke expiry nikal jaye to aapka yeh khulega to manually hum yeha page open karkek bhej de
// also it will allow the user to get. sedeha redirect to the verify email page
