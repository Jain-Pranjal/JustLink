'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { generatedAvatarURI } from '@/lib/avatar'
import logger from '@/lib/logger'
import { getHighResImage } from '@/lib/utils'
import { useTRPC } from '@/trpc/client'

const onboardingSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    workspaceName: z.string().min(2, 'Workspace name is required'),
    slug: z.string().min(2, 'Workspace Slug is required'),
})

const OnboardingForm = () => {
    const trpc = useTRPC()
    const router = useRouter()
    const { data, isPending } = authClient.useSession()

    // --- Mutations ---
    const createUsername = useMutation(
        trpc.dashboard.createUsername.mutationOptions({
            onSuccess: async () => {
                logger.info('Username created successfully')
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                toast.error(error.message || 'Failed to set username')
            },
        })
    )

    const createWorkspace = useMutation(
        trpc.workspace.createWorkspace.mutationOptions({
            onSuccess: async () => {
                logger.info('Workspace created successfully')
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                toast.error(error.message || 'Failed to create workspace')
            },
        })
    )

    const updateOnboardingFlag = useMutation(
        trpc.dashboard.updateOnboardingFlag.mutationOptions({
            onSuccess: async () => {
                logger.info('Onboarding flag updated successfully')
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                toast.error(error.message || 'Failed to update onboarding flag')
            },
        })
    )

    // --- React Hook Form setup ---
    const form = useForm<z.infer<typeof onboardingSchema>>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            username: '',
            workspaceName: '',
            slug: '',
        },
    })

    // Auto-generate slug when workspace changes
    const workspaceValue = form.watch('workspaceName')
    useEffect(() => {
        if (workspaceValue) {
            const slug = workspaceValue
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9\-]/g, '') // clean slug
            form.setValue('slug', slug, { shouldValidate: true })
        }
    }, [workspaceValue, form])

    if (isPending || !data?.user) return null

    const isLoading =
        createUsername.isPending ||
        createWorkspace.isPending ||
        updateOnboardingFlag.isPending

    const onSubmit = async (values: z.infer<typeof onboardingSchema>) => {
        try {
            // Call all mutations (createUsername, createWorkspace, updateOnboardingFlag)
            await createUsername.mutateAsync({ username: values.username })
            const wsRes = await createWorkspace.mutateAsync({
                workspaceName: values.workspaceName,
            })
            // passing the new workspace id that is made above to set lastWorkspaceId
            await updateOnboardingFlag.mutateAsync({
                onboardingComplete: true,
                workspaceId: wsRes.workspace.id, //it will set the lastWorkspaceId
            })

            toast.success('Onboarding completed!')
            router.push(`/dashboard/${values.username}/${values.slug}`) // redirect to dashboard

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(
                err.message || 'Something went wrong, please try again.'
            )
        }
    }

    // THIS SUBMIT BUTTON WILL REDIRECT THE USER TO THE ACTUAL /DASHBOARD/:USERNAME/:WORKSPACE AS WE HAVE CAPTURED THE BOTH AND READY TO REDIRECT THE USER

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-muted-foreground text-lg">Loading...</div>
            </div>
        )
    }

    if (!data?.user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-muted-foreground text-lg">
                    Please sign in to continue
                </div>
            </div>
        )
    }

    // --- Pick profile image ---
    const profileImage =
        getHighResImage(data.user.image || undefined) ||
        generatedAvatarURI({
            seed: form.watch('username') || data.user.name || 'User',
            variant: 'openPeeps',
        })

    return (
        <div className="from-background to-muted/20 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
            <div className="bg-card w-full max-w-md space-y-8 rounded-2xl border p-8 shadow-lg">
                {/* Header */}
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome to JustLink
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Let&apos;s set up your profile and workspace
                    </p>
                </div>

                {/* Profile image preview */}
                <div className="flex justify-center">
                    <div className="relative">
                        <Image
                            src={profileImage}
                            alt="Profile Preview"
                            width={120}
                            height={120}
                            quality={100}
                            className="border-primary/10 rounded-full border-4 shadow-md"
                        />
                    </div>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Username
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Choose your username"
                                            className="h-11"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="workspaceName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Workspace Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your workspace name"
                                            className="h-11"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="slug"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Workspace Slug
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            readOnly
                                            className="bg-muted/50 h-11 cursor-not-allowed"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="mt-6 h-11 w-full text-base font-medium"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? 'Setting up...'
                                : 'Complete Onboarding'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default OnboardingForm
