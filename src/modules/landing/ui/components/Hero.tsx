'use client'
import React from 'react'
import { PointerHighlight } from '@/components/ui/pointer-highlight'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'motion/react'

const Hero = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background Video */}
            <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/bgBlackMosaic.mov" type="video/mp4" />
            </video>

            {/* Overlay for contrast */}
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 text-center sm:px-6 md:px-8 lg:px-12">
                <motion.div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                    <Link
                        href="https://github.com/Jain-Pranjal/JustLink"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <motion.div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.15] bg-gradient-to-r from-teal-500/10 to-purple-500/10 px-2.5 py-1 shadow-[0_0_15px_rgba(20,240,231,0.1)] backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-1.5">
                            <motion.div
                                className="h-2 w-2 rounded-full bg-gradient-to-r from-teal-400 to-green-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] sm:h-2.5 sm:w-2.5"
                                animate={{
                                    opacity: [1, 0.4, 1],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                            <span className="bg-clip-text text-xs font-medium tracking-wide text-white sm:text-sm">
                                Open Source
                            </span>
                        </motion.div>
                    </Link>
                </motion.div>

                <div className="mb-4 sm:mb-6">
                    <h1 className="bg-gradient-to-r from-[#9C9487] to-[#E5E3DF] bg-clip-text text-center leading-tight font-bold tracking-tight text-transparent">
                        <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                            All your links
                        </span>

                        <span className="mt-1 block text-3xl sm:mt-2 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                            <span className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                                <span className="whitespace-nowrap">
                                    Always in
                                </span>
                                <PointerHighlight rectangleClassName="border-white">
                                    <span className="bg-gradient-to-r from-[#D6D2C4] via-[#E5E3DF] to-[#F1EEE7] bg-clip-text whitespace-nowrap text-transparent">
                                        Reach
                                    </span>
                                </PointerHighlight>
                            </span>
                        </span>
                    </h1>
                </div>

                <p className="mx-auto mb-8 max-w-xs text-sm text-[#e5e3df] sm:mb-10 sm:max-w-md sm:text-base md:max-w-lg md:text-lg lg:max-w-xl lg:text-xl xl:max-w-2xl xl:text-2xl">
                    Manage, share, and track your links in one place with style.
                </p>

                <div className="sm:w-auto">
                    <Button
                        asChild
                        aria-label="Get Started"
                        className="group relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none sm:h-11 md:h-12"
                    >
                        <Link href="/sign-in">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="relative inline-flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-slate-950 px-4 py-1 text-xs font-medium text-white backdrop-blur-3xl sm:px-5 sm:text-sm md:px-6 md:text-base lg:text-lg">
                                <span className="relative inline-flex overflow-hidden">
                                    <div className="translate-y-0 transition duration-500 group-hover:-translate-y-[110%]">
                                        Get Started
                                    </div>
                                    <div className="absolute translate-y-[110%] transition duration-500 group-hover:translate-y-0">
                                        Get Started
                                    </div>
                                </span>
                            </span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Hero
