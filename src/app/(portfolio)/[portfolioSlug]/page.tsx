// so here we will have the individual portfolio item page that we will capture the slug from the url
'use client'
import { useParams } from 'next/navigation'
import { OneLinkCard } from '@/modules/dashboard/ui/components/OneLinkCard'

// Mock data - in a real app, this would come from an API
const mockPortfolioData = {
    pranjaljain: {
        profile: {
            name: 'Pranjal Jain',
            bio: 'Just a Tech student :)',
            avatar: '/placeholder.svg',
        },
        links: [
            {
                id: '1',
                type: 'social' as const,
                title: 'Follow me on Twitter',
                url: 'https://twitter.com/pranjaljain03',
                icon: 'twitter',
                color: '#1DA1F2',
            },
            {
                id: '2',
                type: 'social' as const,
                title: 'GitHub',
                url: 'https://github.com/pranjaljain03',
                icon: 'github',
                color: '#333333',
            },
            {
                id: '3',
                type: 'link' as const,
                title: 'My Website',
                url: 'https://pranjaljain.dev',
                description: 'Check out my personal website and portfolio',
            },
            {
                id: '4',
                type: 'text' as const,
                title: 'About Me',
                description:
                    'I am a passionate developer who loves creating amazing web experiences. Currently studying Computer Science and building cool projects.',
            },
            {
                id: '5',
                type: 'social' as const,
                title: 'LinkedIn',
                url: 'https://linkedin.com/in/pranjaljain03',
                icon: 'linkedin',
                color: '#0077B5',
            },
            {
                id: '6',
                type: 'link' as const,
                title: 'Blog',
                url: 'https://blog.pranjaljain.dev',
                description: 'Read my thoughts on technology and development',
            },
        ],
        layout: [
            { i: '1', x: 0, y: 0, w: 2, h: 1 },
            { i: '2', x: 2, y: 0, w: 2, h: 1 },
            { i: '3', x: 0, y: 1, w: 2, h: 1 },
            { i: '4', x: 0, y: 2, w: 4, h: 2 },
            { i: '5', x: 2, y: 1, w: 2, h: 1 },
            { i: '6', x: 0, y: 4, w: 4, h: 1 },
        ],
    },
}

const PublicPortfolio = () => {
    const { portfolioSlug } = useParams()

    if (!portfolioSlug) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="mb-2 text-2xl font-bold">Invalid URL</h1>
                    <p className="text-muted-foreground">
                        Portfolio not found in URL
                    </p>
                </div>
            </div>
        )
    }

    const portfolioData =
        mockPortfolioData[portfolioSlug as keyof typeof mockPortfolioData]

    if (!portfolioData) {
        return (
            <div className="from-background via-background to-muted/30 flex min-h-screen items-center justify-center bg-gradient-to-br">
                <div className="text-center">
                    <div className="bg-muted mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                        <span className="text-2xl">🔍</span>
                    </div>
                    <h1 className="mb-2 text-2xl font-bold">
                        Profile Not Found
                    </h1>
                    <p className="text-muted-foreground">
                        The user @{portfolioSlug} doesn&apos;t exist or
                        hasn&apos;t created their profile yet.
                    </p>
                </div>
            </div>
        )
    }

    const { profile, links, layout } = portfolioData

    return (
        <div className="from-background via-background to-muted/30 min-h-screen bg-gradient-to-br">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                {/* Profile Header */}
                <div className="mb-12 text-center">
                    <div className="from-primary/20 to-primary/5 border-background mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full border-4 bg-gradient-to-br shadow-lg">
                        <span className="text-primary text-4xl font-bold">
                            {profile.name.charAt(0)}
                        </span>
                    </div>
                    <h1 className="from-foreground to-foreground/70 mb-3 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
                        {profile.name}
                    </h1>
                    <p className="text-muted-foreground mx-auto max-w-md text-lg">
                        {profile.bio}
                    </p>
                </div>

                {/* Links Grid */}
                <div className="grid auto-rows-[100px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {links.map((link) => {
                        const layoutItem = layout.find(
                            (item) => item.i === link.id
                        )
                        // const gridColumn = layoutItem ? `span ${Math.min(layoutItem.w, 4)}` : 'span 2'
                        // const gridRow = layoutItem && layoutItem.h > 1 ? `span ${layoutItem.h}` : 'span 1'

                        return (
                            <div
                                key={link.id}
                                className={`col-span-1 lg:col-span-${Math.min(layoutItem?.w || 2, 4)} row-span-${layoutItem?.h || 1}`}
                                style={{
                                    gridColumn: `span ${Math.min(layoutItem?.w || 2, window.innerWidth < 1024 ? 1 : 4)}`,
                                    gridRow: `span ${layoutItem?.h || 1}`,
                                }}
                            >
                                <OneLinkCard
                                    link={link}
                                    onUpdate={() => {}}
                                    onRemove={() => {}}
                                    isEditing={false}
                                />
                            </div>
                        )
                    })}
                </div>

                {/* Footer */}
                <div className="border-border/50 mt-16 border-t pt-8 text-center">
                    <p className="text-muted-foreground text-sm">
                        Powered by OneLink
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PublicPortfolio
// yaha par aapko uska akela page deikhega showcase ka

/**
 * Profiles: Always /@username

Redirects: Always /slug (without @)

Validation rule:

Profile usernames → unique (alphanumeric + underscore, no spaces).

Redirect slugs → unique, no @ allowed.
 */
