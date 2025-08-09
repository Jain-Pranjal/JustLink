// Server Comp
import { getContentBySlug } from '@/lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'

export const revalidate = 86400 // Revalidate every day automatically

export default async function PrivacyPolicyPage() {
    const page = await getContentBySlug('privacy-policy')

    if (!page) return <div>Not found</div>

    return (
        <main>
            {/* <h1>{String(page.fields.title)}</h1> */}

            <div>
                {page.fields.content &&
                typeof page.fields.content === 'object' &&
                page.fields.content !== null &&
                'nodeType' in page.fields.content
                    ? documentToReactComponents(page.fields.content as Document)
                    : String(page.fields.content || '')}
            </div>
        </main>
    )
}
