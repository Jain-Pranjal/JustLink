import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { TRPCReactProvider } from '@/trpc/client'
import { constructMetadata } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/next'
// import { NuqsAdapter } from 'nuqs/adapters/next/app'

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
})

export const metadata: Metadata = constructMetadata()

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        // <NuqsAdapter>
        <TRPCReactProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={`${inter.className} antialiased`}>
                    <Toaster />
                    {children}
                    <Analytics />
                </body>
            </html>
        </TRPCReactProvider>
        // </NuqsAdapter>
    )
}
