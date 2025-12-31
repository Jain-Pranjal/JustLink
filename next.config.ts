import type { NextConfig } from 'next'

// TODO: need to change the routes further
const reservedRoutes = ['settings', 'profile', 'api', 'auth']

// Join reserved routes into regex lookahead string
const reservedRegex = reservedRoutes.join('|')

const nextConfig: NextConfig = {
    images: {
        domains: [
            'lh3.googleusercontent.com', // Google profile pics
            'avatars.githubusercontent.com', // GitHub avatars
            'pbs.twimg.com', // Twitter/X profile pics
            'abs.twimg.com', // Default X avatars
        ],
    },

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
