'use client'
import RootContainer from '@/components/global/RootContainer'
import React from 'react'

const BoxSignup = () => {
    return (
        <RootContainer className="px-6 py-16 lg:px-8">
            <div className="border-border flex flex-col items-center rounded-2xl border bg-[#F2F1EF] px-10 py-14 text-center md:container md:mx-auto md:mb-32 md:px-24 md:py-20 dark:bg-[#121212]">
                <span className="text-primary text-6xl font-medium md:text-8xl dark:text-white">
                    Link by JustLink
                </span>

                <p className="mt-6 text-[#878787]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Similique, ad?
                </p>

                <div className="mx-auto mt-10 w-full max-w-md md:mb-8">
                    <div className="flex flex-col items-center justify-center sm:flex-row">
                        <div className="flex w-full flex-col items-stretch overflow-hidden rounded-lg border border-black bg-white sm:flex-row sm:items-center dark:border-white dark:bg-black">
                            <div className="flex min-w-0 flex-1 items-center">
                                <span className="px-4 text-sm whitespace-nowrap text-gray-500">
                                    justlink.live/@
                                    <input
                                        type="text"
                                        placeholder="yourname"
                                        className="w-full min-w-0 border-none bg-transparent px-0 py-3 text-sm text-black placeholder-gray-500 outline-none dark:text-white"
                                    />
                                </span>
                            </div>
                            <button className="bg-black px-6 py-3 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-black/80 sm:border-l sm:border-black dark:bg-white dark:text-black dark:hover:bg-white/80 dark:sm:border-white">
                                Claim your page
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </RootContainer>
    )
}
export default BoxSignup
