import type { NextConfig } from 'next'

// TODO: need to change the routes further
const reservedRoutes = ['settings', 'profile', 'api', 'auth']

// Join reserved routes into regex lookahead string
const reservedRegex = reservedRoutes.join('|')

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                // Match only valid usernames, but exclude reserved routes
                source: `/:username((?!${reservedRegex})[a-zA-Z0-9_-]+)/:workspaceslug([a-zA-Z0-9_-]+)`,
                destination: '/dashboard/:username/:workspaceslug',
            },
        ]
    },
}

export default nextConfig
