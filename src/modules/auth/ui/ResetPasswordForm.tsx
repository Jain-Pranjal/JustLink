// here we will be collecting the both new password and confirm password

'use client'

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
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { useRouter, useSearchParams } from 'next/navigation'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

const formSchema = z.object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
})

export function ResetPasswordForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    })

    const token = searchParams.get('token') as string //getting the token from the URL
    if (!token) {
        toast.error('Invalid or missing token')
        router.push('/sign-in')
        return null
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        // Check if passwords match
        if (values.password !== values.confirmPassword) {
            toast.error('Passwords do not match')
            setIsLoading(false)
            return
        }

        // Actual logic to reset the password
        const { error } = await authClient.resetPassword({
            newPassword: values.password,
            token,
        })

        if (error) {
            toast.error(error.message)
        } else {
            toast.success('Password reset successfully')
            router.push('/sign-in')
        }

        setIsLoading(false)
    }

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Reset Password</CardTitle>
                    <CardDescription>Enter your new password</CardDescription>
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
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            {...field}
                                                            type={
                                                                showPassword
                                                                    ? 'text'
                                                                    : 'password'
                                                            }
                                                            className="pr-10"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                                            onClick={() =>
                                                                setShowPassword(
                                                                    !showPassword
                                                                )
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
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Confirm Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="password"
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
