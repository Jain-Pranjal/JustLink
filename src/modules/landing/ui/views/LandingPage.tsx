//making of the landing page
import RootContainer from '@/components/global/RootContainer'
import React from 'react'
import StackingCards from '../components/StackingCards'
import Quote from '../components/Quote'
import BoxSignup from '../components/BoxSignup'
import FAQ from '../components/faq/FAQ'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import ScrollToTop from '@/components/global/ScrollToTop'

const LandingPage = () => {
    return (
        <>
            <div className="bg-[#090a0a]">
                <Hero />
                <StackingCards />
                <Quote />
                <BoxSignup />
                <FAQ />
                <Footer />
                <ScrollToTop />
            </div>
        </>
    )
}

export default LandingPage
