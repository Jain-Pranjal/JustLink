import * as React from 'react'
import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Heading,
    Button,
    Hr,
    Tailwind,
    Img,
} from '@react-email/components'

interface VerifyEmailProps {
    username: string
    verifyUrl: string
}

const VerifyEmail = (props: VerifyEmailProps) => {
    const { username, verifyUrl } = props
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
                                ✉️ Verify your email
                            </Heading>

                            <Text className="mb-[24px] text-[18px] leading-[28px] text-gray-200">
                                Hi {username},
                            </Text>

                            <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-300">
                                Thank you for signing up! We&apos;re excited to
                                have you join us. To complete your registration
                                and secure your account, please verify your
                                email address.
                            </Text>

                            <Text className="mb-[32px] text-[16px] leading-[24px] text-gray-300">
                                Click the button below to verify your email:
                            </Text>

                            <Section className="mb-[32px] text-center">
                                <Button
                                    href={verifyUrl}
                                    className="box-border rounded-[8px] bg-blue-600 px-[32px] py-[16px] text-[16px] font-semibold text-white no-underline"
                                >
                                    Verify Email Address
                                </Button>
                            </Section>

                            <Text className="mb-[24px] rounded-[6px] border border-yellow-700 bg-yellow-900 p-[16px] text-[14px] leading-[20px] text-yellow-200">
                                ⚠️ This link will expire in 1 hour
                            </Text>

                            <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-300">
                                If the button doesn&apos;t work, you can copy
                                and paste this link into your browser:
                            </Text>

                            <Text className="mb-[32px] rounded-[4px] border border-gray-600 bg-gray-700 p-[12px] text-[14px] leading-[20px] break-all text-blue-500">
                                {verifyUrl}
                            </Text>

                            <Text className="mb-[32px] text-[14px] leading-[20px] text-gray-400">
                                If you didn&apos;t create an account, you can
                                safely ignore this email.
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

export default VerifyEmail
