// Better Auth client instance
import { createAuthClient } from 'better-auth/react'
import { oneTapClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
    plugins: [
        oneTapClient({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ONE_TAP_CLIENT_ID!, //expose this env variable in the client side by public
            // Optional client configuration:
            autoSelect: false,
            cancelOnTapOutside: true,
            context: 'signin',
            additionalOptions: {
                // Any extra options for the Google initialize method
            },
            // Configure prompt behavior and exponential backoff:
            promptOptions: {
                baseDelay: 1000, // Base delay in ms (default: 1000)
                maxAttempts: 5, // Maximum number of attempts before triggering onPromptNotification (default: 5)
            },
        }),
    ],
})
