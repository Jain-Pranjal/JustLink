import * as React from 'react'
import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Heading,
    Hr,
    Tailwind,
    Img,
} from '@react-email/components'

interface WaitlistThankYouEmailProps {
    email: string
}

const WaitlistThankYouEmail = (props: WaitlistThankYouEmailProps) => {
    const { email } = props
    const name = email.split('@')[0]

    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Body className="bg-gray-900 py-[40px] font-sans">
                    <Container className="mx-auto max-w-[600px] rounded-[8px] bg-gray-800 p-[40px] shadow-sm">
                        <Section>
                            {/* Logo Section */}
                            <Section className="mb-[32px] text-center">
                                <Img
                                    src={`${process.env.NEXT_PUBLIC_APP_URL}/TypoLogo/TypoCircle.png`}
                                    alt="JustLink Logo"
                                    width="120"
                                    height="40"
                                    className="mx-auto"
                                />
                            </Section>

                            <Heading className="mb-[24px] text-center text-[32px] font-bold text-gray-100">
                                📣 You&apos;re on the list!
                            </Heading>

                            <Text className="mb-[24px] text-[18px] leading-[28px] text-gray-200">
                                Hi {name},
                            </Text>

                            <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-300">
                                Thank you for joining our waitlist! We&apos;re
                                thrilled to have you as one of our early
                                supporters. Your interest means the world to us
                                as we work hard to bring you something amazing.
                            </Text>

                            <Text className="mb-[32px] text-[16px] leading-[24px] text-gray-300">
                                Here&apos;s what happens next:
                            </Text>

                            <Section className="mb-[32px] rounded-[8px] bg-gray-700 p-[24px]">
                                <Text className="mb-[16px] text-[14px] font-semibold text-gray-300">
                                    ✨ You&apos;ll be among the first to know
                                    when we launch
                                </Text>
                                <Text className="mb-[16px] text-[14px] font-semibold text-gray-300">
                                    🎁 Exclusive early access and special perks
                                </Text>
                                <Text className="mb-[0px] text-[14px] font-semibold text-gray-300">
                                    📧 Updates on our progress and
                                    behind-the-scenes content
                                </Text>
                            </Section>

                            <Text className="mb-[32px] text-[16px] leading-[24px] text-gray-300">
                                We&apos;re working around the clock to make this
                                the best experience possible. Stay tuned for
                                exciting updates coming your way soon!
                            </Text>

                            <Text className="mb-[8px] text-[16px] text-gray-200">
                                Best regards,
                                <br />
                                Team JustLink
                            </Text>
                        </Section>

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

export default WaitlistThankYouEmail

// TODO: ADD THE UNSUBSCRIBE LINK TO THE BULK MAIL ONLY, NOT ON THE TRANSACTIOANL MAIL
