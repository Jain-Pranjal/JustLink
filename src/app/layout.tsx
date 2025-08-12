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

// TODO: add the open graph image and other metadata
export const metadata: Metadata = {
    title: 'JustLink',
    description: 'This is an awesome website built with Next.js!',
    openGraph: {
        title: 'JustLink',
        description: 'This is an awesome website built with Next.js!',
        url: 'https://mywebsite.com',
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
        card: 'summary_large_image', // or 'summary'
        title: 'JustLink',
        description: 'This is an awesome website built with Next.js!',
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
