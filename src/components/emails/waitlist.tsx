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
                <Body className="bg-gray-100 py-[40px] font-sans">
                    <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[40px] shadow-sm">
                        <Section>
                            <Heading className="mb-[24px] text-center text-[32px] font-bold text-gray-900">
                                🎉 You&apos;re on the list!
                            </Heading>

                            <Text className="mb-[24px] text-[18px] leading-[28px] text-gray-700">
                                Hi {name},
                            </Text>

                            <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-700">
                                Thank you for joining our waitlist! We&apos;re
                                thrilled to have you as one of our early
                                supporters. Your interest means the world to us
                                as we work hard to bring you something amazing.
                            </Text>

                            <Text className="mb-[32px] text-[16px] leading-[24px] text-gray-700">
                                Here&apos;s what happens next:
                            </Text>

                            <Section className="mb-[32px] rounded-[8px] bg-gray-50 p-[24px]">
                                <Text className="mb-[16px] text-[14px] font-semibold text-gray-600">
                                    ✨ You&apos;ll be among the first to know
                                    when we launch
                                </Text>
                                <Text className="mb-[16px] text-[14px] font-semibold text-gray-600">
                                    🎁 Exclusive early access and special perks
                                </Text>
                                <Text className="mb-[0px] text-[14px] font-semibold text-gray-600">
                                    📧 Updates on our progress and
                                    behind-the-scenes content
                                </Text>
                            </Section>

                            <Text className="mb-[32px] text-[16px] leading-[24px] text-gray-700">
                                We&apos;re working around the clock to make this
                                the best experience possible. Stay tuned for
                                exciting updates coming your way soon!
                            </Text>

                            {/* TODO: add some button to track the interaction */}

                            {/* <Section className="text-center mb-[32px]">
                <Button
                  href="https://example.com/updates"
                  className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border"
                >
                  Follow Our Progress
                </Button>
              </Section> */}

                            <Hr className="my-[32px] border-gray-200" />

                            <Text className="mb-[8px] text-[16px] text-gray-700">
                                Best regards,
                                <br />
                                Team JustLink
                            </Text>
                        </Section>

                        <Hr className="my-[32px] border-gray-200" />

                        <Section className="text-center">
                            <Text className="m-0 mb-[8px] text-[12px] text-gray-500">
                                Laxmi Nagar, New Delhi, India
                            </Text>
                            {/* TODO: ADD THE LINKS FOR UNSUB AND PREF */}
                            {/* <Text className="text-[12px] text-gray-500 mb-[8px]">
                <a href="#" className="text-gray-500 no-underline">Unsubscribe</a> | 
                <a href="#" className="text-gray-500 no-underline ml-[8px]">Update Preferences</a>
              </Text> */}
                            <Text className="m-0 text-[12px] text-gray-500">
                                © 2025 JustLink. All rights reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

export default WaitlistThankYouEmail
