import { createClient } from 'contentful'

if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    throw new Error(
        'Contentful space ID and access token must be provided in environment variables.'
    )
}

export const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
})

// Function to fetch a page static content by slug
export const getContentBySlug = async (slug: string) => {
    try {
        const content = await client.getEntries({
            content_type: 'justLinkStaticContent',
            'fields.slug': slug,
            limit: 1,
        })

        return content.items[0] || null
    } catch (error) {
        console.error(error)
        return null
    }
}
