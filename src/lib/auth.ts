import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; 
import { FullSchema } from "@/db/schema";
import { haveIBeenPwned } from "better-auth/plugins"
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: FullSchema, 

    }),
    emailAndPassword: {
    enabled: true, 
  }, 

     socialProviders: { 
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string,  
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        } ,
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
            prompt: "select_account", 
        }, 

    }, 

    plugins: [haveIBeenPwned({customPasswordCompromisedMessage: "Your password has been compromised in a data breach. Please choose a different password."})],

});