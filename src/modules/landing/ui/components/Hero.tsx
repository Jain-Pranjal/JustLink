'use client'
import React from 'react'
import { PointerHighlight } from '@/components/ui/pointer-highlight'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'motion/react'

const Hero = () => {
    return (
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

            {/* Overlay for contrast */}
            {/* TODO: need to ask for this to apply  */}
            {/* <div className="absolute inset-0 bg-black/50" /> */}

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                <motion.div className="mb-8 md:mb-12">
                    <Link
                        href="https://github.com/Jain-Pranjal/JustLink"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <motion.div className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-gradient-to-r from-teal-500/10 to-purple-500/10 px-3 py-1 shadow-[0_0_15px_rgba(20,240,231,0.1)] backdrop-blur-sm">
                            <motion.div
                                className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-teal-400 to-green-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
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
                            <span className="bg-gradient-to-r from-teal-200 to-purple-200 bg-clip-text text-sm font-medium tracking-wide text-transparent">
                                Open Source
                            </span>
                        </motion.div>
                    </Link>
                </motion.div>

                <h1 className="font-bold tracking-tight text-white">
                    <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                        All your links, Always in
                    </span>
                    <div className="flex justify-center">
                        <PointerHighlight rectangleClassName="border-white">
                            <span className="text-primary block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                                Reach
                            </span>
                        </PointerHighlight>
                    </div>
                </h1>

                <p className="mt-6 max-w-xl text-base text-gray-200 sm:text-lg md:text-xl lg:text-2xl">
                    Manage, share, and track your links in one place with style.
                </p>

                <div className="mt-10">
                    <Button
                        asChild
                        aria-label="Get Started"
                        className="group relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none"
                    >
                        <Link href="/sign-in">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="relative inline-flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl sm:text-base md:text-lg">
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
