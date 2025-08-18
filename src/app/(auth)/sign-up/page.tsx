import React from 'react'
import SignupView from '@/modules/auth/ui/SignUpView'
import { auth } from '@/lib/auth' //server instance of auth
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

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
