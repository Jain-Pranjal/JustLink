import React from 'react'
import { auth } from '@/lib/auth' //server instance of auth
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import ReEmailVerificationForm from '@/modules/auth/ui/ReEmailVerificationForm'

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
