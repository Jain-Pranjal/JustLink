'use client'
import Link from 'next/link'
import React from 'react'
import Animate from './global/Animate'
import { Button } from './ui/button'

const NotFoundClient = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-200 px-4">
            <div className="text-center">
                <div className="mx-auto mb-8 aspect-square w-full max-w-md">
                    <Animate
                        url="/lottieFiles/404.lottie"
                        className="h-full w-full"
                        isLoop={true}
                        isPlayOnHover={false}
                    />
                </div>

                <div className="mb-8">
                    <h1 className="mb-4 text-4xl font-bold text-gray-800">
                        Oops! You&apos;ve Entered Unknown Territory
                    </h1>
                    <p className="mb-2 text-lg text-gray-600">
                        Looks like you&apos;ve wandered off the beaten path.
                    </p>
                </div>

                <Button asChild className="border-border/10">
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </div>
    )
}

export default NotFoundClient
