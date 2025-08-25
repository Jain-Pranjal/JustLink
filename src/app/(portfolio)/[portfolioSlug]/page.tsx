// so here we will have the individual portfolio item page that we will capture the slug from the url
import React from 'react'

const page = () => {
    return (
        <div>
            Here we will show the user profile by using the @name so that it
            become separatable by the slug of refirect ones{' '}
        </div>
    )
}

export default page

// yaha par aapko uska akela page deikhega showcase ka

/**
 * Profiles: Always /@username

Redirects: Always /slug (without @)

Validation rule:

Profile usernames → unique (alphanumeric + underscore, no spaces).

Redirect slugs → unique, no @ allowed.
 */
