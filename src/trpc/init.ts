import { initTRPC } from '@trpc/server'
import { cache } from 'react'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { TRPCError } from '@trpc/server'

export const createTRPCContext = cache(async () => {
    /**
     * @see: https://trpc.io/docs/server/context
     */
    return { userId: 'user_123' }
})
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
    /**
     * @see https://trpc.io/docs/server/data-transformers
     */
    // transformer: superjson,
})

// Base router and procedure helpers
export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure

// extending top of baseProcedure
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if (!session) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to access this resource.',
        })
    }

    return next({ ctx: { ...ctx, auth: session } })
})

// here in the context we are returing the auth which hold the user session

// base procedure is used for public procedures which do not require authentication
// protectedProcedure is used for procedures which require authentication

// TODO: need to complete this procedure

// export const protectedProcedureWithExistingChecking=protectedProcedure.use(async ({ ctx, next }) => {
//   const { auth } = ctx;

//   if (!auth) {
//     throw new TRPCError({ code: 'UNAUTHORIZED', message: 'You must be logged in to access this resource.' });
//   }

//   // Check if the user has the necessary permissions
//   const hasPermission = await checkUserPermissions(auth.userId);
//   if (!hasPermission) {
//     throw new TRPCError({ code: 'FORBIDDEN', message: 'You do not have permission to access this resource.' });
//   }

//   return next({ ctx: { ...ctx, auth } });
// });
