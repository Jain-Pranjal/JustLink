import React from 'react'
import { auth } from '@/lib/auth' //server instance of auth
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import ForgotPasswordForm from '@/modules/auth/ui/ForgetPasswordForm'

async function ForgotPassword() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (session) {
        // 2️⃣ If email not verified → force to verify page
        if (!session.user.emailVerified) {
            redirect('/verify-email')
        }
        // email verified → no need to see auth page → go home
        redirect('/')
    }

    // only when session and email not present
    return (
        <div>
            <ForgotPasswordForm />
        </div>
    )
}

export default ForgotPassword

// chekcing the user email and if found tabhi reset pasdswd ke mail jayege
