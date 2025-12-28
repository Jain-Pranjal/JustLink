import { CiGlobe } from 'react-icons/ci'
import { FaMedium } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoLogoGithub } from 'react-icons/io'
import { IoLogoLinkedin } from 'react-icons/io5'
import { SiPeerlist } from 'react-icons/si'

export const faqData = [
    {
        question: 'Can I track clicks and performance?',
        answer: 'Yes. JustLink provides insights like click counts and performance data so you know exactly how your links are doing.',
    },
    {
        question: 'Is JustLink easy to use?',
        answer: 'Absolutely. Create short links in seconds - no technical skills required. Just paste your URL and you’re ready to share.',
    },
    {
        question: 'Where can I share JustLink links?',
        answer: 'Anywhere - social media, emails, websites, messages, ads, or bios. Your links stay clean and reliable across platforms!',
    },
    {
        question: 'Can I customize my short links?',
        answer: 'Absolutely Yes! You can create custom, branded short links that match your style and build trust with your audience.',
    },
]

export const QuoteWords =
    'Cut the clutter. Go from messy to memorable - JustLink turns long URLs into sleek, powerful links you can track and own with confidence'

export const socials = {
    website: {
        url: 'https://pranjaljain.dev',
        icon: CiGlobe,
        alt: 'Portfolio website',
    },
    twitter: {
        url: 'https://x.com/PranjalJain03',
        icon: FaXTwitter,
        alt: 'Twitter',
    },
    linkedin: {
        url: 'https://www.linkedin.com/in/pranjalll/',
        icon: IoLogoLinkedin,
        alt: 'LinkedIn',
    },
    github: {
        url: 'https://github.com/Jain-Pranjal/JustLink',
        icon: IoLogoGithub,
        alt: 'GitHub',
    },
    peerlist: {
        url: 'https://peerlist.io/pranjaljain',
        icon: SiPeerlist,
        alt: 'Peerlist',
    },
    medium: {
        url: 'https://medium.com/@pranjalll',
        icon: FaMedium,
        alt: 'Medium',
    },
}
