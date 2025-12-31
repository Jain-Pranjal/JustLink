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
import { Metadata } from 'next'

const exo2 = Exo_2({
    subsets: ['latin'],
    weight: ['400', '700'],
})

export const revalidate = 86400 // Revalidate every day automatically

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description:
        'JustLink is committed to protecting your privacy. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your information.',
    openGraph: {
        title: 'JustLink | Privacy Policy',
        description:
            'JustLink is committed to protecting your privacy. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your information.',
        url: 'https://justlink.live/privacy-policy',
        siteName: 'JustLink',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: 'JustLink | Privacy Policy',
        description:
            'JustLink is committed to protecting your privacy. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your information.',
        card: 'summary_large_image',
        site: 'https://justlink.live',
    },
}

export default async function PrivacyPolicyPage() {
    const page = await getContentBySlug('privacy-policy')
    if (!page) return <div>Not found</div>

    const options: Options = {
        renderNode: {
            [BLOCKS.HEADING_1]: ((node, children) => (
                <h1
                    className={`${exo2.className} relative mb-12 text-center text-3xl font-bold text-gray-300`}
                >
                    {children}
                    <span className="absolute bottom-[-16px] left-1/2 h-[0.35rem] w-12 -translate-x-1/2 rounded-full bg-blue-600"></span>
                </h1>
            )) as NodeRenderer,

            [BLOCKS.HEADING_2]: ((node, children) => (
                <h2 className="mt-12 mb-4 text-2xl text-gray-300">
                    {children}
                </h2>
            )) as NodeRenderer,

            [BLOCKS.HEADING_3]: ((node, children) => (
                <h3 className="mt-6 mb-2 text-lg text-gray-300">{children}</h3>
            )) as NodeRenderer,

            [BLOCKS.PARAGRAPH]: ((node, children) => (
                <p className="mb-4 text-justify text-base leading-snug text-gray-200">
                    {children}
                </p>
            )) as NodeRenderer,

            [BLOCKS.UL_LIST]: ((node, children) => (
                <ul className="list-disc pl-6 leading-snug text-gray-200 xl:pl-12">
                    {children}
                </ul>
            )) as NodeRenderer,

            [BLOCKS.OL_LIST]: ((node, children) => (
                <ol className="list-decimal space-y-1 text-gray-200">
                    {children}
                </ol>
            )) as NodeRenderer,

            [BLOCKS.HR]: (() => (
                <hr className="my-6 border-gray-300 text-gray-200" />
            )) as NodeRenderer,

            [INLINES.HYPERLINK]: ((node, children) => {
                const hyperlinkNode = node as Hyperlink
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
        <RootContainer className="w-screen max-w-none bg-[#090A0A] text-[#E5E3DF]">
            <main className="mt-16">
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
