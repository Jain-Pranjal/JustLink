import { getContentBySlug } from '@/lib/contentful'
import {
    documentToReactComponents,
    Options,
    NodeRenderer,
} from '@contentful/rich-text-react-renderer'
import RootContainer from '@/components/global/RootContainer'
import {
    BLOCKS,
    INLINES,
    Document,
    Hyperlink,
} from '@contentful/rich-text-types'
import { Exo_2 } from 'next/font/google'

const exo2 = Exo_2({
    subsets: ['latin'],
    weight: ['400', '700'],
})

export const revalidate = 86400 // Revalidate every day automatically

export default async function PrivacyPolicyPage() {
    const page = await getContentBySlug('terms-and-conditions')
    if (!page) return <div>Not found</div>

    // Instead of forcing Block/Inline types here, use NodeRenderer which matches what Options expects
    const options: Options = {
        renderNode: {
            [BLOCKS.HEADING_1]: ((node, children) => (
                <h1
                    className={`${exo2.className} relative mb-12 text-center text-3xl font-bold text-gray-800`}
                >
                    {children}
                    <span className="absolute bottom-[-16px] left-1/2 h-[0.35rem] w-12 -translate-x-1/2 rounded-full bg-blue-600"></span>
                </h1>
            )) as NodeRenderer,

            [BLOCKS.HEADING_2]: ((node, children) => (
                <h2 className="mt-12 mb-4 text-2xl text-gray-800">
                    {children}
                </h2>
            )) as NodeRenderer,

            [BLOCKS.HEADING_3]: ((node, children) => (
                <h3 className="mt-6 mb-2 text-lg text-gray-800">{children}</h3>
            )) as NodeRenderer,

            [BLOCKS.PARAGRAPH]: ((node, children) => (
                <p className="mb-4 text-justify text-base leading-snug text-gray-700">
                    {children}
                </p>
            )) as NodeRenderer,

            [BLOCKS.UL_LIST]: ((node, children) => (
                <ul className="list-disc pl-6 leading-snug xl:pl-12">
                    {children}
                </ul>
            )) as NodeRenderer,

            [BLOCKS.OL_LIST]: ((node, children) => (
                <ol className="list-decimal space-y-1">{children}</ol>
            )) as NodeRenderer,

            [BLOCKS.HR]: (() => (
                <hr className="my-6 border-gray-300" />
            )) as NodeRenderer,

            [INLINES.HYPERLINK]: ((node, children) => {
                const hyperlinkNode = node as Hyperlink // Narrowing for uri
                return (
                    <a
                        href={hyperlinkNode.data.uri}
                        className="text-blue-600 underline hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {children}
                    </a>
                )
            }) as NodeRenderer,
        },
    }

    return (
        <RootContainer>
            <main>
                <div className="xl:m-12 xl:px-4">
                    {page.fields.content &&
                    typeof page.fields.content === 'object' &&
                    page.fields.content !== null &&
                    'nodeType' in page.fields.content
                        ? documentToReactComponents(
                              page.fields.content as Document,
                              options
                          )
                        : String(page.fields.content || '')}
                </div>
            </main>
        </RootContainer>
    )
}
