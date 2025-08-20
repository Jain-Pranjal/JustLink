'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { socials } from '@/constants'

const Footer = () => {
    return (
        <section id="made-by-humans" className="w-full py-0">
            <div className="relative w-full overflow-hidden">
                <div className="relative flex min-h-[250px] w-full flex-col justify-between bg-[url('/footer-background.png')] bg-cover bg-center bg-no-repeat sm:min-h-[450px]">
                    {/* Blur overlay */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Logo top-left */}
                    <div className="relative z-10 flex items-center p-4 text-white sm:p-5">
                        <Image
                            src="/TypoLogo/TypoCircle.svg"
                            alt="JustLink app logo"
                            className="mr-3 h-5 w-auto sm:h-6"
                            width={24}
                            height={24}
                            draggable={false}
                        />
                    </div>

                    {/* Social bar */}
                    <div className="relative z-10 flex w-full justify-center gap-6 bg-black/70 py-3 backdrop-blur-sm">
                        {Object.entries(socials).map(
                            ([key, { url, icon: IconComponent }], index) => (
                                <Link
                                    key={index}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white transition-colors hover:text-blue-400"
                                >
                                    <IconComponent />
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer
