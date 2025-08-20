//making of the landing page
import RootContainer from '@/components/global/RootContainer'
import React from 'react'
import StackingCards from '../components/StackingCards'
import Quote from '../components/Quote'
import BoxSignup from '../components/BoxSignup'
import FAQ from '../components/faq/FAQ'
import Footer from '../components/Footer'

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
                <div className="relative z-10 flex h-full items-center justify-center text-white">
                    <h1 className="text-4xl font-bold"></h1>
                </div>
            </div>

            <StackingCards />
            <Quote />
            <BoxSignup />
            <FAQ />
            <Footer />
        </>
    )
}

export default Hero
