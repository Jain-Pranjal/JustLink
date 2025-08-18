// This component ko hum re verifcaiton ke lieb ke agar user ka email vetifyv nhi kia hai as hum bina verify ke bina usko access kanr nhi denge usko es page me redirect karenge and also for the token expiry case

// so agar apaka user ka lonk expire ho jata hai jo ke 1 hr ka he hai so hum usko again yeha page show karge ke vo email ko verify kar le phelek

// hn so basicallyhum yaha sign up me jo apaki mail hai usko local storageme save kar rhe the and remail verric par load kar rhe the jo ke

// yaha par apako vo jop email hai usko params me se get krn pagae anndthen fill innto th einput box not bu locsl storgae se

'use client'

import { useTRPC } from '@/trpc/client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
    email: z.string().email(),
})

export default function ReEmailVerificationForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [isLoading, setIsLoading] = useState(false)
    const trpc = useTRPC()
    const searchParams = useSearchParams()
    const tokenExpired = searchParams?.get?.('error') === 'token_expired' //covering the expiration of token

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '' },
    })

    // Prefill from localStorage(in case of expired) or via URL(in case of ?email)
    useEffect(() => {
        const emailFromParams = searchParams?.get?.('email')
        const emailFromStorage = localStorage.getItem('pendingEmail')

        if (emailFromParams) {
            form.setValue('email', emailFromParams)
        } else if (emailFromStorage) {
            form.setValue('email', emailFromStorage)
        }
    }, [form, searchParams])

    // using the useMutation as we need to trigger this function to check the user
    const checkUser = useMutation(trpc.auth.checkUserByEmail.mutationOptions())

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        try {
            // Check if user exists using mutation
            await checkUser.mutateAsync({ email: values.email })

             
            const { error } = await authClient.sendVerificationEmail({
                email: values.email,
            })

            if (error) {
                toast.error(
                    error.message || 'Failed to send verification email.'
                )
            } else {
                toast.success('Verification email sent successfully')
                form.reset()
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            // Handle TRPCError NOT_FOUND user
            if (err?.data?.code === 'NOT_FOUND' || err?.code === 'NOT_FOUND') {
                toast.error(
                    'No account found for this email. Please sign up first.'
                )
            } else {
                toast.error(
                    err?.message || 'Something went wrong. Please try again.'
                )
            }
        } finally {
            setIsLoading(false)
        }
    }

    async function resendFromPending() {
        try {
            const pending = localStorage.getItem('pendingEmail')
            if (!pending) {
                toast.error(
                    'No saved email found. Please enter your email manually.'
                )
                return
            }
            form.setValue('email', pending)
            await onSubmit({ email: pending })
        } catch {
            toast.error('Unable to resend. Please try again.')
        }
    }

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        Email Verification
                    </CardTitle>
                    <CardDescription>
                        Enter your email to receive a verification link
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {tokenExpired && (
                        <div className="mb-4 rounded-md border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
                            Your verification link has expired.{' '}
                            <button
                                onClick={resendFromPending}
                                className="ml-2 underline"
                                type="button"
                            >
                                Resend using saved email
                            </button>{' '}
                            or enter a different email below.
                        </div>
                    )}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="you@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className="size-4 animate-spin" />
                                    ) : (
                                        'Send Verification Email'
                                    )}
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{' '}
                                <Link
                                    href="/sign-up"
                                    className="underline-offset-4 hover:underline"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div className="text-muted-foreground mt-4 text-center text-xs">
                <p>
                    By clicking continue, you agree to our{' '}
                    <Link
                        href="/t&c"
                        className="text-muted-foreground hover:underline"
                    >
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                        href="/privacy-policy"
                        className="text-muted-foreground hover:underline"
                    >
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    )
}

// Here we are getting the email from the URL parameters if user comes from toast error
// also we are storing the email in storage if user comes from expired link
// priority of the URL parameters over the local storage
