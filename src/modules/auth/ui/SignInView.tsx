'use client'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string().min(1, { message: 'Please enter a password' }),
})

const SigninView = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | null>(null)
    const [pending, setPending] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const session = authClient.useSession().data //client side session data

    // defining the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    // One Tap Auto-trigger
    useEffect(() => {
        if (session) {
            router.replace('/') // already signed in
            return
        }

        authClient
            .oneTap(
                {
                    context: 'signin',
                    onPromptNotification: (info) => {
                        console.warn('One Tap prompt skipped:', info) //can display the render an alternative UI
                    },
                },
                {
                    onRequest: () => {
                        setPending(true)
                        toast.loading('Signing in Google...', {
                            id: 'onetap',
                            duration: Infinity,
                        })
                    },
                    onSuccess: () => {
                        setPending(false)
                        toast.success('Signed in with Google', {
                            id: 'onetap',
                            duration: 5000,
                        })
                        router.push('/')
                    },
                    onError: ({ error }) => {
                        setPending(false)
                        const errorMessage =
                            error?.message ||
                            error?.error?.message ||
                            'One Tap sign-in failed'
                        setError(errorMessage)
                        toast.error(errorMessage, {
                            id: 'onetap',
                            duration: 5000,
                        })
                    },
                }
            )
            .catch((err) => {
                console.error('One Tap init failed:', err)
            })
    }, [session, router])

    // this is taken from better-auth library
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null)

        authClient.signIn.email(
            {
                email: data.email,
                password: data.password,
                callbackURL: '/',
            },
            {
                onRequest: () => {
                    // this req is handling the whole loading state so add any component in this that u want to show when it is loading
                    setPending(true)
                    toast.loading('Signing in...', {
                        id: 'signin',
                        duration: Infinity,
                    })
                },
                onSuccess: () => {
                    setPending(false)
                    toast.success('Signed in successfully', {
                        id: 'signin',
                        duration: 5000,
                    })
                    router.push('/')
                },

                onError: ({ error }) => {
                    setPending(false)

                    const errorMessage =
                        error?.message ||
                        error?.error?.message ||
                        'An error occurred during sign-in'

                    // sending the not verified email users for reverification
                    if (
                        errorMessage
                            .toLowerCase()
                            .includes('email not verified')
                    ) {
                        const email = data.email
                        setError(errorMessage)

                        toast.error(
                            <span>
                                Your email is not verified yet.{' '}
                                <span className="block sm:inline">
                                    Please check your inbox for the verification
                                    email, or{' '}
                                    <Link
                                        href={`/verify-email?email=${encodeURIComponent(email)}`}
                                        className="text-blue-500 underline"
                                    >
                                        click here to send a new one
                                    </Link>
                                    .
                                </span>
                            </span>,
                            {
                                id: 'signin',
                                duration: 7000,
                            }
                        )
                    } else {
                        setError(errorMessage)
                        toast.error(errorMessage, {
                            id: 'signin',
                            duration: 5000,
                        })
                    }
                },
            }
        )
    }

    const onSocial = (provider: 'github' | 'google' | 'twitter') => {
        setError(null)

        authClient.signIn.social(
            {
                provider: provider,
                callbackURL: '/?social_signin=true',
                // callbackURL: "http://localhost:3000/api/auth/callback/twitter", //TODO cahnge the callback url of all the social providers
            },
            {
                onRequest: () => {
                    setPending(true)
                    toast.loading('Signing in...', {
                        id: 'signin',
                        duration: Infinity,
                    })
                },
                onSuccess: () => {
                    setPending(false)
                },
                onError: ({ error }) => {
                    setPending(false)
                    const errorMessage =
                        error?.message ||
                        error?.error?.message ||
                        'An error occurred during sign-in'
                    setError(errorMessage)
                    toast.error(errorMessage, {
                        id: 'signin',
                        duration: 5000,
                    })
                },
            }
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="Enter your password"
                                        {...field}
                                        className="pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="h-4 w-4" />
                                        ) : (
                                            <EyeOffIcon className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </FormControl>
                            <div className="flex justify-end">
                                <Link
                                    href="/forgotPassword?"
                                    className="text-primary text-sm hover:underline"
                                >
                                    {/* cannot be able to use the ?email in URL as we dont have the access to the form data here , so we will prefill via the local storage */}
                                    Forgot your password?
                                </Link>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-center">
                    <Button type="submit" className="w-full" disabled={pending}>
                        Sign In
                    </Button>
                </div>

                <div className="mt-4 flex flex-col space-y-4">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background text-muted-foreground px-2">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Button
                            type="button"
                            disabled={pending}
                            variant="outline"
                            className="flex w-full items-center justify-center gap-2 sm:w-40"
                            onClick={() => onSocial('google')}
                        >
                            <FcGoogle className="h-4 w-4" />
                            Google
                        </Button>

                        <Button
                            disabled={pending}
                            type="button"
                            variant="outline"
                            className="flex w-full items-center justify-center gap-2 sm:w-40"
                            onClick={() => onSocial('github')}
                        >
                            <FaGithub className="h-4 w-4" />
                            GitHub
                        </Button>

                        <Button
                            disabled={pending}
                            type="button"
                            variant="outline"
                            className="flex w-full items-center justify-center gap-2 sm:w-40"
                            onClick={() => onSocial('twitter')}
                        >
                            <FaXTwitter className="h-4 w-4" />
                            Twitter
                        </Button>
                    </div>
                </div>
            </form>

            <div className="mt-4 text-center">
                <p className="text-muted-foreground text-sm">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/sign-up"
                        className="text-primary hover:underline"
                    >
                        Sign up here
                    </Link>
                </p>
            </div>

            <div className="text-muted-foreground mt-4 text-center text-xs">
                <p>
                    By signing in, you agree to our{' '}
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
        </Form>
    )
}

export default SigninView
