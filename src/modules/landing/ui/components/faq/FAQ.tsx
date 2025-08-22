'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import Container from '@/components/global/Container'
import RootContainer from '@/components/global/RootContainer'
// import GradiantText from '@/components/global/GradiantText'

import ContactUsPopup from './ContactUsPopup'
import QNA from './QNA'
import { faqData } from '@/constants'
import { MdArrowOutward } from 'react-icons/md'

const FAQ = () => {
    const [contactUsPopupVisible, setContactUsPopupVisible] = useState(false)
    const [open, setOpen] = useState(-1)

    return (
        <RootContainer className="my-16 px-6 lg:px-8">
            <div className="flex flex-col justify-between lg:flex-row">
                <div>
                    <div className="font-syne text-4xl font-medium text-[#e5e3df]">
                        <h1>
                            {/* Got Any <GradiantText>Questions</GradiantText>? */}
                        </h1>
                        <h1>We Got You Covered.</h1>
                    </div>
                    <Link
                        href="#"
                        target="_blank"
                        className="my-5 mt-8 flex w-fit cursor-pointer items-center gap-1 text-[#e5e3df] hover:underline"
                    >
                        <span className="text-[#e5e3df]">
                            Explore More FAQs
                        </span>
                        <MdArrowOutward />
                    </Link>

                    <div
                        onClick={() => setContactUsPopupVisible(true)}
                        className="flex w-fit cursor-pointer items-center gap-1 text-[#e5e3df] hover:underline"
                    >
                        <p className="text-[#e5e3df]">Need Help? Contact Us</p>
                        <MdArrowOutward />
                    </div>
                </div>

                <div className="flex flex-col gap-3 max-lg:mt-7">
                    {faqData.map((c, i) => (
                        <QNA
                            isOpen={i == open}
                            setOpen={setOpen}
                            index={i}
                            key={i}
                            question={c.question}
                            answer={<div>{c.answer}</div>}
                        />
                    ))}
                </div>
            </div>
            <ContactUsPopup
                open={contactUsPopupVisible}
                setOpen={setContactUsPopupVisible}
            />
        </RootContainer>
    )
}

export default FAQ
