import * as React from 'react'
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Button,
    Hr,
    Tailwind,
} from '@react-email/components'

interface PortfolioConfirmationEmailProps {
    shareUrl: string
}

const PortfolioConfirmationEmail = (props: PortfolioConfirmationEmailProps) => {
    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Preview>
                    Your link is ready! Now it&apos;s time to share it
                    everywhere
                </Preview>
                <Body className="bg-gray-100 py-[40px] font-sans">
                    <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[32px]">
                        {/* Header */}
                        <Section className="mb-[32px] text-center">
                            <Heading className="m-0 mb-[16px] text-[28px] font-bold text-gray-900">
                                🎉 Your Link is Live!
                            </Heading>
                            <Text className="m-0 text-[16px] text-gray-600">
                                Now it&apos;s time to share it with your online
                                presence
                            </Text>
                        </Section>

                        {/* Main Content */}
                        <Section className="mb-[32px]">
                            <Text className="m-0 mb-[16px] text-[16px] leading-[24px] text-gray-700">
                                Share your link in your social media bios, email
                                signature, or anywhere your audience can find
                                it.
                            </Text>
                            <Text className="m-0 mb-[24px] text-[16px] leading-[24px] text-gray-700">
                                Watch your engagement grow as all your content
                                becomes just one click away.
                            </Text>

                            {/* CTA Button */}
                            <div className="mb-[32px] text-center">
                                <Button
                                    href={props.shareUrl || '#'}
                                    className="box-border rounded-[6px] bg-blue-600 px-[24px] py-[12px] text-[16px] font-semibold text-white no-underline"
                                >
                                    Share Now
                                </Button>
                            </div>
                        </Section>

                        <Hr className="my-[24px] border-gray-200" />

                        {/* Where to Share Section */}
                        <Section className="mb-[32px]">
                            <Heading className="m-0 mb-[20px] text-[20px] font-bold text-gray-900">
                                Where to share:
                            </Heading>

                            <div className="space-y-[12px]">
                                <Text className="m-0 text-[16px] leading-[24px] text-gray-700">
                                    🎞️ Story posts and reels
                                </Text>
                                <Text className="m-0 text-[16px] leading-[24px] text-gray-700">
                                    💳 Your business card
                                </Text>
                                <Text className="m-0 text-[16px] leading-[24px] text-gray-700">
                                    🌎 Your website
                                </Text>
                                <Text className="m-0 text-[16px] leading-[24px] text-gray-700">
                                    ☕️ Coffee cups and totes
                                </Text>
                                <Text className="m-0 text-[16px] leading-[24px] text-gray-700">
                                    📢 Ads and promos
                                </Text>
                                <Text className="m-0 text-[16px] leading-[24px] text-gray-700">
                                    🏦 Signage, posters and stickers
                                </Text>
                                <Text className="m-0 text-[16px] leading-[24px] text-gray-700">
                                    🧢 Merch (t-shirts, caps etc)
                                </Text>
                            </div>
                        </Section>

                        <Hr className="my-[24px] border-gray-200" />

                        {/* Tips Section */}
                        <Section className="mb-[32px]">
                            <Heading className="m-0 mb-[16px] text-[18px] font-semibold text-gray-900">
                                💡 Pro Tips:
                            </Heading>
                            <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-600">
                                • Add it to your Instagram and TikTok bio for
                                maximum visibility
                            </Text>
                            <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-600">
                                • Include it in your email signature for
                                professional networking
                            </Text>
                            <Text className="m-0 text-[14px] leading-[20px] text-gray-600">
                                • Share it in your stories with a &quot;Link in
                                Bio&quot; call-to-action
                            </Text>
                        </Section>

                        {/* Footer */}
                        <Hr className="my-[32px] border-gray-600" />

                        <Section className="text-center">
                            <Text className="m-0 mb-[8px] text-[12px] text-gray-400">
                                Laxmi Nagar, New Delhi, India
                            </Text>
                            <Text className="m-0 text-[12px] text-gray-400">
                                © {new Date().getFullYear()} JustLink. All
                                rights reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

export default PortfolioConfirmationEmail
