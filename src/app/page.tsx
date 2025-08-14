import React from 'react'
import WaitlistForm from '@/modules/waitlist/ui/WaitlistForm'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

const page = async () => {
    // fetching initial data for the waitlist count
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
        trpc.waitlist.getTotalWaitlistEntries.queryOptions({
            refetchOnWindowFocus: true,
            refetchInterval: 1000,
        })
    )

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <WaitlistForm />
        </HydrationBoundary>
    )
}

export default page

// This is the / page of the application.

// TODO: after waitlist need to add the logic to open via proper session checking and email verification
