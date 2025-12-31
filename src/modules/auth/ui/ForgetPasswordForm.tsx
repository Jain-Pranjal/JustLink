// the forget password will first check if the user exists with the provided email and it will only accept the email and send the email to reset the password

'use client'
import { useTRPC } from '@/trpc/client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { useMutation } from '@tanstack/react-query'

const formSchema = z.object({
    email: z.string().email(),
})

export default function ForgotPasswordForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [isLoading, setIsLoading] = useState(false)
    const trpc = useTRPC()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    })

    // Prefill from localStorage , not via URL as dont have access to data in URL
    useEffect(() => {
        const emailFromStorage = localStorage.getItem('pendingEmail')

        if (emailFromStorage) {
            form.setValue('email', emailFromStorage)
        }
    }, [form])

    // using the useMutation as we need to trigger this function to check the user
    const checkUser = useMutation(trpc.auth.checkUserByEmail.mutationOptions())

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        try {
            // Check if user exists using mutation
            await checkUser.mutateAsync({ email: values.email })

            const { error } = await authClient.forgetPassword({
                email: values.email,
                redirectTo: '/resetPassword', // Redirect page after reset
            })

            if (error) {
                toast.error(
                    error.message || 'Failed to send password reset email.'
                )
            } else {
                toast.success('Password reset email sent successfully')
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

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Forgot Password</CardTitle>
                    <CardDescription>
                        Enter your email to reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent>
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
                                        'Reset Password'
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
