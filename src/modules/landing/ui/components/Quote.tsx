'use client'

import React from 'react'
import RootContainer from '@/components/global/RootContainer'
import { QuoteWords } from '@/constants'

const Quote = () => {
    // TODO: need to make a aninmated word play for this

    return (
        <RootContainer className="pb-12 text-center text-4xl font-medium md:pt-28 md:pb-32 md:text-6xl md:leading-[85px]">
            <div className="container mb-12 max-w-[1370px] pb-12 text-center text-4xl font-medium md:pt-28 md:pb-32 md:text-6xl md:leading-[85px]">
                <div>
                    {QuoteWords.map((word, idx) => (
                        <span
                            key={idx}
                            className="text-primary opacity-0"
                            style={{ opacity: 1 }}
                        >
                            {word + ' '}
                        </span>
                    ))}
                </div>
            </div>
        </RootContainer>
    )
}

export default Quote
