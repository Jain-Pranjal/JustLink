import React from 'react'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import LandingPage from '@/modules/landing/ui/views/LandingPage'

const page = async () => {
    // fetching initial data for the waitlist count
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
        trpc.waitlist.getTotalWaitlistEntries.queryOptions()
    )

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LandingPage />
        </HydrationBoundary>
    )
}

export default page

// TODO: after waitlist need to add the logic to open via proper session checking and email verification
