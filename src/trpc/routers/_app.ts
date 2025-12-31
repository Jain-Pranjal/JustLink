// here we will define our main app router that contains all the other routers
import { createTRPCRouter } from '../init'
import { waitlistRouter } from '@/modules/waitlist/server/procedure'
import { authRouter } from '@/modules/auth/server/procedure'
import { dashboardRouter } from '@/modules/dashboard/server/procedure'
import { workspaceRouter } from '@/modules/dashboard/server/procedure'
import { shortLinkRouter } from '@/modules/dashboard/server/procedure'
import { tagRouter } from '@/modules/dashboard/server/procedure'

export const appRouter = createTRPCRouter({
    waitlist: waitlistRouter,
    auth: authRouter,
    dashboard: dashboardRouter,
    workspace: workspaceRouter,
    shortLink: shortLinkRouter,
    tag: tagRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
