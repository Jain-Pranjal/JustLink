import * as React from 'react'
import {
    Body,
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

interface SuccessResetPassword {
    userEmail: string
    resetTime: string
    // ipAddress: string,
    // deviceInfo: string
}

const PasswordResetConfirmation = (props: SuccessResetPassword) => {
    const { userEmail, resetTime } = props

    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Preview>Your password has been successfully changed</Preview>
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

                            <Heading className="mb-[24px] text-center text-[28px] font-bold text-gray-100">
                                ✅ Password Changed Successfully
                            </Heading>

                            <Text className="mb-[24px] text-[18px] leading-[28px] text-gray-200">
                                Hi there,
                            </Text>

                            <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-300">
                                We&apos;re writing to confirm that your password
                                for{' '}
                                <strong className="text-gray-100">
                                    {userEmail}
                                </strong>{' '}
                                has been successfully changed on {resetTime}.
                            </Text>

                            <Text className="mb-[32px] text-[16px] leading-[24px] text-gray-300">
                                If you made this change, no further action is
                                required. Your account is secure and you can
                                continue using our services with your new
                                password.
                            </Text>

                            {/* Security Details */}
                            <Section className="mb-[32px] rounded-[8px] border border-gray-600 bg-gray-700 p-[20px]">
                                <Heading className="m-0 mb-[16px] text-[18px] font-bold text-gray-100">
                                    🔐 Security Details
                                </Heading>
                                <Text className="m-0 mb-[8px] text-[14px] text-gray-300">
                                    <strong className="text-gray-100">
                                        Time:
                                    </strong>{' '}
                                    {resetTime}
                                </Text>
                                {/* <Text className="text-[14px] text-gray-300 mb-[8px] m-0">
                  <strong className="text-gray-100">IP Address:</strong> {ipAddress}
                </Text>
                <Text className="text-[14px] text-gray-300 m-0">
                  <strong className="text-gray-100">Device:</strong> {deviceInfo}
                </Text> */}
                            </Section>

                            {/* Security Alert */}
                            <Section className="mb-[32px] rounded-[8px] border border-red-700 bg-red-900 p-[24px]">
                                <Heading className="m-0 mb-[12px] text-[16px] font-bold text-red-200">
                                    🚨 Didn&apos;t make this change?
                                </Heading>
                                <Text className="m-0 mb-[24px] text-[14px] leading-[20px] text-red-300">
                                    If you didn&apos;t change your password,
                                    your account may have been compromised.
                                    Please contact our support team immediately.
                                </Text>
                                <div className="mt-2 text-center">
                                    <Link
                                        href="mailto:support@justlink.live"
                                        className="box-border inline-block rounded-[6px] bg-red-600 px-[24px] py-[12px] text-[14px] font-medium text-white no-underline"
                                    >
                                        Contact Support
                                    </Link>
                                </div>
                            </Section>

                            {/* Security Tips */}
                            <Section className="mb-[32px] rounded-[8px] border border-gray-600 bg-gray-700 p-[20px]">
                                <Heading className="m-0 mb-[16px] text-[18px] font-bold text-gray-100">
                                    🛡️ Keep Your Account Secure
                                </Heading>
                                <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-300">
                                    • Use a strong, unique password for your
                                    account
                                </Text>
                                <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-300">
                                    • Enable two-factor authentication if
                                    available
                                </Text>
                                <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-300">
                                    • Never share your password with anyone
                                </Text>
                                <Text className="m-0 text-[14px] leading-[20px] text-gray-300">
                                    • Log out from shared or public devices
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

                        {/* Footer */}
                        <Section className="text-center">
                            <Text className="m-0 mb-[8px] text-[12px] text-gray-400">
                                This email was sent to {userEmail}
                            </Text>
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

export default PasswordResetConfirmation

// TODO: add the method to get the ip address and device info as headers cannot be access in the server side
