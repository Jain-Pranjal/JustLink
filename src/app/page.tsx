import React from 'react'
import WaitlistForm from '@/modules/waitlist/ui/WaitlistForm';
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'




// fetching initial data for the waitlist count
const queryClient=getQueryClient()
void queryClient.prefetchQuery(trpc.waitlist.getTotalWaitlistEntries.queryOptions())




const page = () => {
  return (

 <HydrationBoundary state={dehydrate(queryClient)}>
       <WaitlistForm />
    </HydrationBoundary>

  )
}

export default page

