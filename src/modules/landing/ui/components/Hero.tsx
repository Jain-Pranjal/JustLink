'use client'
import React from 'react'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { PointerHighlight } from '@/components/ui/pointer-highlight'

const Hero = () => {
    return (
        <>
            <div className="relative h-screen w-screen overflow-hidden">
                {/* Background Video */}

                <video
                    className="absolute top-0 left-0 h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/bgBlackMosaic.mov" type="video/mp4" />
                </video>

                {/* Content on top of video */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center">
                    <div className="mx-auto max-w-lg py-20 text-2xl font-bold tracking-tight text-white md:text-4xl">
                        All your links , Always in
                        <PointerHighlight>
                            <span>Reach</span>
                        </PointerHighlight>
                    </div>

                    <div className="m-40 flex justify-center text-center">
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
                        >
                            <AceternityLogo />
                            <span>Aceternity UI</span>
                        </HoverBorderGradient>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero

const AceternityLogo = () => {
    return (
        <svg
            width="66"
            height="65"
            viewBox="0 0 66 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-black dark:text-white"
        >
            <path
                d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
                stroke="currentColor"
                strokeWidth="15"
                strokeMiterlimit="3.86874"
                strokeLinecap="round"
            />
        </svg>
    )
}
