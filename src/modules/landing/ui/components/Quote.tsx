'use client'

import React from 'react'
import RootContainer from '@/components/global/RootContainer'
import { QuoteWords } from '@/constants'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'

const Quote = () => {
    return (
        <RootContainer className="px-6 lg:px-8">
            <div className="container mb-12 max-w-[1370px] pb-12 text-center text-4xl font-medium md:pt-28 md:pb-32 md:text-6xl md:leading-[85px]">
                <div>
                    <TextGenerateEffect
                        words={QuoteWords}
                        className="text-2xl font-bold text-[#e5e3df] sm:text-3xl md:text-5xl lg:text-6xl"
                    />
                </div>
            </div>
        </RootContainer>
    )
}

export default Quote
