'use client'
import React, { useEffect, useRef, useState } from 'react'
import RootContainer from '@/components/global/RootContainer'

const StackingCards = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const cardsContainerRef = useRef<HTMLDivElement>(null)
    const [activeCardIndex, setActiveCardIndex] = useState(0)
    const [isIntersecting, setIsIntersecting] = useState(false)
    const ticking = useRef(false)
    const lastScrollY = useRef(0)

    // More responsive timing function with shorter duration
    const cardStyle = {
        height: '60vh',
        maxHeight: '600px',
        borderRadius: '20px',
        transition:
            'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
        willChange: 'transform, opacity',
    }

    useEffect(() => {
        // Create intersection observer to detect when section is in view
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                setIsIntersecting(entry.isIntersecting)
            },
            { threshold: 0.1 } // Start observing when 10% of element is visible
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        // Optimized scroll handler using requestAnimationFrame
        const handleScroll = () => {
            if (!ticking.current) {
                lastScrollY.current = window.scrollY

                window.requestAnimationFrame(() => {
                    if (!sectionRef.current) return

                    const sectionRect =
                        sectionRef.current.getBoundingClientRect()
                    const viewportHeight = window.innerHeight
                    const totalScrollDistance = viewportHeight * 2

                    // Calculate the scroll progress
                    let progress = 0
                    if (sectionRect.top <= 0) {
                        progress = Math.min(
                            1,
                            Math.max(
                                0,
                                Math.abs(sectionRect.top) / totalScrollDistance
                            )
                        )
                    }

                    // Determine which card should be visible based on progress
                    if (progress >= 0.66) {
                        setActiveCardIndex(2)
                    } else if (progress >= 0.33) {
                        setActiveCardIndex(1)
                    } else {
                        setActiveCardIndex(0)
                    }

                    ticking.current = false
                })

                ticking.current = true
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial calculation

        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    // Card visibility based on active index instead of direct scroll progress
    const isFirstCardVisible = isIntersecting
    const isSecondCardVisible = activeCardIndex >= 1
    const isThirdCardVisible = activeCardIndex >= 2

    return (
        <div ref={sectionRef} className="relative" style={{ height: '300vh' }}>
            <section
                className="sticky top-0 h-screen w-full overflow-hidden bg-[#090A0A] py-10 md:py-16"
                id="why-justlink"
            >
                <div className="container mx-auto flex h-full flex-col px-6 lg:px-8">
                    <div className="mb-2 md:mb-3">
                        <div className="mb-2 flex items-center gap-4 pt-8 sm:pt-6 md:mb-2 md:pt-4">
                            <div
                                className="bg-pulse-100 text-pulse-600 border-pulse-200 animate-fade-in inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium opacity-0"
                                style={{
                                    animationDelay: '0.1s',
                                }}
                            >
                                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-white">
                                    02
                                </span>
                                <span className="text-white">JustLink</span>
                            </div>
                        </div>

                        <h2 className="section-title font-display mb-1 text-3xl font-bold text-white sm:text-4xl md:mb-2 md:text-5xl">
                            Why JustLink
                        </h2>
                    </div>

                    <div
                        ref={cardsContainerRef}
                        className="perspective-1000 relative flex-1"
                    >
                        {/* First Card */}
                        <div
                            className={`absolute inset-0 overflow-hidden border border-gray-700 bg-gray-900 shadow-xl ${isFirstCardVisible ? 'animate-card-enter' : ''}`}
                            style={{
                                ...cardStyle,
                                zIndex: 10,
                                transform: `translateY(${isFirstCardVisible ? '90px' : '200px'}) scale(0.9)`,
                                opacity: isFirstCardVisible ? 0.9 : 0,
                                backgroundImage: 'url("/gradients/grad1.svg")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="absolute top-4 right-4 z-20">
                                <div className="inline-flex items-center justify-center rounded-full border border-gray-600 bg-gray-800/80 px-4 py-2 text-white backdrop-blur-sm">
                                    <span className="text-sm font-medium">
                                        The Problem
                                    </span>
                                </div>
                            </div>

                            <div className="relative z-10 flex h-full items-center p-5 sm:p-6 md:p-8">
                                <div className="max-w-lg">
                                    <h3 className="font-display mb-4 text-2xl leading-tight font-bold text-white sm:text-3xl md:text-4xl">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Ad, error?
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Second Card */}
                        <div
                            className={`absolute inset-0 overflow-hidden border border-gray-700 bg-gray-900 shadow-xl ${isSecondCardVisible ? 'animate-card-enter' : ''}`}
                            style={{
                                ...cardStyle,
                                zIndex: 20,
                                transform: `translateY(${isSecondCardVisible ? (activeCardIndex === 1 ? '55px' : '45px') : '200px'}) scale(0.95)`,
                                opacity: isSecondCardVisible ? 1 : 0,
                                pointerEvents: isSecondCardVisible
                                    ? 'auto'
                                    : 'none',
                                backgroundImage: 'url("/gradients/grad2.svg")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="absolute top-4 right-4 z-20">
                                <div className="inline-flex items-center justify-center rounded-full border border-gray-600 bg-gray-800/80 px-4 py-2 text-white backdrop-blur-sm">
                                    <span className="text-sm font-medium">
                                        The vision
                                    </span>
                                </div>
                            </div>

                            <div className="relative z-10 flex h-full items-center p-5 sm:p-6 md:p-8">
                                <div className="max-w-lg">
                                    <h3 className="font-display mb-4 text-2xl leading-tight font-bold text-white sm:text-3xl md:text-4xl">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Ad, error?
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Third Card */}
                        <div
                            className={`absolute inset-0 overflow-hidden border border-gray-700 bg-gray-900 shadow-xl ${isThirdCardVisible ? 'animate-card-enter' : ''}`}
                            style={{
                                ...cardStyle,
                                zIndex: 30,
                                transform: `translateY(${isThirdCardVisible ? (activeCardIndex === 2 ? '15px' : '0') : '200px'}) scale(1)`,
                                opacity: isThirdCardVisible ? 1 : 0,
                                pointerEvents: isThirdCardVisible
                                    ? 'auto'
                                    : 'none',
                                backgroundImage: 'url("/gradients/grad3.svg")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="absolute top-4 right-4 z-20">
                                <div className="inline-flex items-center justify-center rounded-full border border-gray-600 bg-gray-800/80 px-4 py-2 text-white backdrop-blur-sm">
                                    <span className="text-sm font-medium">
                                        The Solution
                                    </span>
                                </div>
                            </div>

                            <div className="relative z-10 flex h-full items-center p-5 sm:p-6 md:p-8">
                                <div className="max-w-lg">
                                    <h3 className="font-display mb-4 text-2xl leading-tight font-bold text-white sm:text-3xl md:text-4xl">
                                        Lorem, ipsum.,{' '}
                                        <span className="text-[#FC4D0A]">
                                            Lorem, ipsum.
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default StackingCards
