import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { TRPCReactProvider } from '@/trpc/client'
// import { NuqsAdapter } from 'nuqs/adapters/next/app'

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
})

const appURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// TODO: add the open graph image and other metadata with real domain
export const metadata: Metadata = {
    metadataBase: new URL(appURL),
    title: 'JustLink',
    description: 'All Your Links, Always in Reach',
    openGraph: {
        title: 'JustLink',
        description: 'All Your Links, Always in Reach',
        url: appURL,
        siteName: 'JustLink',
        images: [
            {
                url: '/opengraph-image.png',
                width: 1200,
                height: 630,
                alt: 'OpenGraph Image',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'JustLink',
        description: 'All Your Links, Always in Reach',
        images: ['/twitter-image.png'],
        creator: '@PranjalJain03',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        // <NuqsAdapter>
        <TRPCReactProvider>
            <html lang="en">
                <body className={`${inter.className} antialiased`}>
                    <Toaster />
                    {children}
                </body>
            </html>
        </TRPCReactProvider>
        // </NuqsAdapter>
    )
}
