import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*', // all bots
                allow: '/', // allow entire site
            },
        ],
        sitemap: 'https://justlink.live/sitemap.xml',
        host: 'https://justlink.live',
    }
}
