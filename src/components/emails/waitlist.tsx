import * as React from 'react';
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
} from '@react-email/components';

interface WaitlistThankYouEmailProps {
  email: string;
}

const WaitlistThankYouEmail = (props: WaitlistThankYouEmailProps) => {
  const { email } = props;
  const name = email.split('@')[0];

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            <Section>
              <Heading className="text-[32px] font-bold text-gray-900 mb-[24px] text-center">
                🎉 You&apos;re on the list!
              </Heading>
              
              <Text className="text-[18px] text-gray-700 mb-[24px] leading-[28px]">
                Hi {name},
              </Text>
              
              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                Thank you for joining our waitlist! We&apos;re thrilled to have you as one of our early supporters. Your interest means the world to us as we work hard to bring you something amazing.
              </Text>
              
              <Text className="text-[16px] text-gray-700 mb-[32px] leading-[24px]">
                Here&apos;s what happens next:
              </Text>
              
              <Section className="bg-gray-50 rounded-[8px] p-[24px] mb-[32px]">
                <Text className="text-[14px] text-gray-600 mb-[16px] font-semibold">
                  ✨ You&apos;ll be among the first to know when we launch
                </Text>
                <Text className="text-[14px] text-gray-600 mb-[16px] font-semibold">
                  🎁 Exclusive early access and special perks
                </Text>
                <Text className="text-[14px] text-gray-600 mb-[0px] font-semibold">
                  📧 Updates on our progress and behind-the-scenes content
                </Text>
              </Section>
              
              <Text className="text-[16px] text-gray-700 mb-[32px] leading-[24px]">
                We&apos;re working around the clock to make this the best experience possible. Stay tuned for exciting updates coming your way soon!
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
              
              <Hr className="border-gray-200 my-[32px]" />
              
            
              
              <Text className="text-[16px] text-gray-700 mb-[8px]">
                Best regards,<br />
                Team Pagr
              </Text>
            </Section>
            
            <Hr className="border-gray-200 my-[32px]" />
            
            <Section className="text-center">
              <Text className="text-[12px] text-gray-500 mb-[8px] m-0">
                Laxmi Nagar, New Delhi, India
              </Text>
              <Text className="text-[12px] text-gray-500 mb-[8px]">
                {/* TODO: ADD THE LINKS FOR UNSUB AND PREF */}
                <a href="#" className="text-gray-500 no-underline">Unsubscribe</a> | 
                <a href="#" className="text-gray-500 no-underline ml-[8px]">Update Preferences</a>
              </Text>
              <Text className="text-[12px] text-gray-500 m-0">
                © 2025 Pagr. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};


export default WaitlistThankYouEmail;