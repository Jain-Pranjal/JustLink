'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const ScrollToTop = () => {
    const [isTop, setIsTop] = useState(true)
    const [right, setRight] = useState(28)

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window === 'undefined') return

            if (window.innerWidth > 1400) {
                const right = (window.innerWidth - 1400) / 2 + 40
                setRight(right)
            }

            if (window.scrollY > 100) {
                setIsTop(false)
            } else {
                setIsTop(true)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div
            style={{
                right: `${right}px`,
            }}
            className={`fixed bottom-28 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-[#5B76FF] to-[#3455FF]/0 p-[1px] hover:from-[#3455FF] hover:to-[#5B76FF] ${isTop ? 'hidden' : 'block'}`}
        >
            <button
                onClick={() => {
                    if (typeof window === 'undefined') return
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className={`from-atlas-700 to-black-850 flex h-full w-full transform items-center justify-center rounded-full bg-gradient-to-l bg-[size:_200%] bg-[position:_0%_0%] transition-all duration-400 ease-in-out hover:bg-[position:_100%_100%]`}
            >
                <Image
                    src="/scrolltotop.svg"
                    alt="Scroll to top"
                    width={30}
                    height={30}
                />
            </button>
        </div>
    )
}

export default ScrollToTop
