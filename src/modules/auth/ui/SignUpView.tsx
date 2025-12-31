'use client'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { FaXTwitter } from 'react-icons/fa6'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z
    .object({
        name: z.string().min(1, { message: 'Name is required' }),
        email: z
            .string()
            .email({ message: 'Please enter a valid email address' }),
        password: z.string().min(1, { message: 'Password is required' }),
        confirmPassword: z.string().min(1, { message: 'Password is required' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'], //this field will show the error
    })

const SignupView = () => {
    const router = useRouter()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | null>(null)
    const [pending, setPending] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    // defining the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    // this is taken from better-auth library
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null)

        authClient.signUp.email(
            {
                name: data.name,
                email: data.email,
                password: data.password,
                callbackURL: '/',
            },
            {
                onRequest: () => {
                    setPending(true)
                    toast.loading('Signing up...', {
                        id: 'signup',
                        duration: Infinity,
                    })
                    form.reset() // Clear the form inputs
                },
                onSuccess: () => {
                    localStorage.setItem('pendingEmail', data.email) // Storing email so that can send email for verification again if expire
                    setPending(false)
                    toast.success(
                        'Please check your email to verify your account',
                        {
                            id: 'signup',
                            duration: 5000,
                        }
                    )
                    router.push('/sign-in') // Redirect to sign-in page after successful sign-up
                },
                onError: ({ error }) => {
                    setPending(false)
                    const errorMessage =
                        error?.message ||
                        error?.error?.message ||
                        'An error occurred during sign-up'
                    setError(errorMessage)
                    toast.error(errorMessage, {
                        id: 'signup',
                        duration: 5000,
                    })
                },
            }
        )
    }

    const onSocial = (provider: 'github' | 'google' | 'twitter') => {
        setError(null)

        authClient.signIn.social(
            {
                provider: provider,
                callbackURL: '/?social_signin=true', //TODO: neeed to reforect to app.justlink.live (dashboard)
            },
            {
                onRequest: () => {
                    setPending(true)
                    toast.loading('Signing up...', {
                        id: 'signup',
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
                        'An error occurred during sign-up'
                    setError(errorMessage)
                    toast.error(errorMessage, {
                        id: 'signup',
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="John Doe"
                                    {...field}
                                    type="text"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                                    type="email"
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
                                        placeholder="******"
                                        {...field}
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
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="******"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-center">
                    <Button type="submit" className="w-full" disabled={pending}>
                        Sign Up
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
                    Already have an account?{' '}
                    <Link
                        href="/sign-in"
                        className="text-primary hover:underline"
                    >
                        Sign in here
                    </Link>
                </p>
            </div>

            <div className="text-muted-foreground mt-4 text-center text-xs">
                <p>
                    By signing up, you agree to our{' '}
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

export default SignupView
