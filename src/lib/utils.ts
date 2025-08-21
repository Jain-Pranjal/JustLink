import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Metadata } from 'next'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const appURL = process.env.NEXT_PUBLIC_APP_URL!

// Metadata
export function constructMetadata(): Metadata {
    return {
        metadataBase: new URL(appURL),
        manifest: '/manifest.json',
        title: {
            default: 'JustLink',
            template: 'JustLink | %s',
        },
        description:
            'One link, endless possibilities. The easiest way to collect and organize links into one page for creators, professionals, and businesses.',
        applicationName: 'JustLink',
        keywords: [
            'justlink',
            'link sharing',
            'url shortener',
            'short links',
            'link management',
            'custom links',
            'link in bio',
            'one link',
        ],
        openGraph: {
            title: 'JustLink',
            description:
                'One link, endless possibilities. The easiest way to collect and organize links into one page for creators, professionals, and businesses.',
            url: appURL,
            siteName: 'JustLink',
            locale: 'en_US',
            type: 'website',
            images: [
                {
                    url: '/opengraph-image.png',
                    width: 1200,
                    height: 630,
                    alt: 'OpenGraph Image',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'JustLink',
            description:
                'One link, endless possibilities. The easiest way to collect and organize links into one page for creators, professionals, and businesses.',
            images: [
                {
                    url: '/twitter-image.png',
                    width: 1200,
                    height: 630,
                    alt: 'Twitter Image',
                },
            ],
            creator: '@PranjalJain03',
        },
    }
}
