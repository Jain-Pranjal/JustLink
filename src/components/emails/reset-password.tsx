import * as React from 'react'
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
    Hr,
    Img,
} from '@react-email/components'

interface ForgotPasswordEmailProps {
    username: string
    resetUrl: string
    userEmail: string
}

const ForgotPasswordEmail = (props: ForgotPasswordEmailProps) => {
    const { username, resetUrl, userEmail } = props

    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Preview>Reset your password - Action required</Preview>
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
                                🔒 Reset Your Password
                            </Heading>

                            <Text className="mb-[24px] text-[18px] leading-[28px] text-gray-200">
                                Hi {username},
                            </Text>

                            <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-300">
                                We received a password reset request for your
                                account associated with{' '}
                                <strong className="text-gray-100">
                                    {userEmail}
                                </strong>
                                .
                            </Text>

                            <Text className="mb-[32px] text-[16px] leading-[24px] text-gray-300">
                                Click the button below to create a new password:
                            </Text>

                            <Section className="mb-[32px] text-center">
                                <Button
                                    href={resetUrl}
                                    className="box-border rounded-[8px] bg-blue-600 px-[32px] py-[16px] text-[16px] font-semibold text-white no-underline"
                                >
                                    Reset Password
                                </Button>
                            </Section>

                            <Text className="mb-[24px] rounded-[6px] border border-yellow-700 bg-yellow-900 p-[16px] text-[14px] leading-[20px] text-yellow-200">
                                ⚠️ This link will expire in 1 hour for security
                                reasons
                            </Text>

                            <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-300">
                                If the button doesn&apos;t work, you can copy
                                and paste this link into your browser:
                            </Text>

                            <Text className="mb-[32px] rounded-[4px] border border-gray-600 bg-gray-700 p-[12px] text-[14px] leading-[20px] break-all text-blue-500">
                                {resetUrl}
                            </Text>

                            {/* Security Notice */}
                            <Section className="mb-[32px] rounded-[8px] border border-gray-600 bg-gray-700 p-[20px]">
                                <Text className="m-0 mb-[8px] text-[14px] leading-[20px] font-semibold text-gray-100">
                                    🔐 Security Notice:
                                </Text>
                                <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-300">
                                    • If you didn&apos;t request this password
                                    reset, please ignore this email
                                </Text>
                                <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-300">
                                    • This link will expire in 1 hour
                                </Text>
                                <Text className="m-0 text-[14px] leading-[20px] text-gray-300">
                                    • For security, never share this link with
                                    anyone
                                </Text>
                            </Section>

                            {/* Help Section */}
                            <Text className="mb-[32px] text-[14px] leading-[20px] text-gray-400">
                                Need help? Contact our support team at{' '}
                                <Link
                                    href="mailto:support@justlink.live"
                                    className="text-blue-500"
                                >
                                    support@justlink.live
                                </Link>
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

export default ForgotPasswordEmail
