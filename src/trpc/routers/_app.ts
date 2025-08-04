// here we will define our main app router that contains all the other routers
import {  createTRPCRouter } from '../init';
import { waitlistRouter } from '@/modules/waitlist/server/procedure';


export const appRouter = createTRPCRouter({
  waitlist: waitlistRouter,

});
// export type definition of API
export type AppRouter = typeof appRouter;



