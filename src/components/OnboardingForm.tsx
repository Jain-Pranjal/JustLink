'use client'

import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { generatedAvatarURI } from '@/lib/avatar'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { getHighResImage } from '@/lib/utils'

const onboardingSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    workspaceName: z.string().min(2, 'Workspace name is required'),
    slug: z.string().min(2, 'Slug is required'),
})

const OnboardingForm = () => {
    const trpc = useTRPC()
    const router = useRouter()
    const { data, isPending } = authClient.useSession()

    // --- Mutations ---
    const createUsername = useMutation(
        trpc.dashboard.createUsername.mutationOptions({
            onSuccess: async () => {
                console.log('Username set successfully')
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
                console.log('Workspace created successfully')
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
                console.log('Onboarding flag updated successfully')
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
            await updateOnboardingFlag.mutateAsync({
                onboardingComplete: true,
                workspaceId: wsRes.workspace.id, //it will set the lastWorkspaceId
            })

            toast.success('Onboarding completed!')
            router.push(`/dashboard/${values.username}/${values.slug}`) // redirect to dashboard

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.message || 'Something went wrong')
        }
    }

    // THIS SUBMIT BUTTON WILL REDIRECT THE USER TO THE ACTUAL /DASHBOARD/:USERNAME/:WORKSPACE AS WE HAVE CAPTURED THE BOTH AND READY TO REDIRECT THE USER

    if (isPending) {
        return <div>Loading...</div>
    }

    if (!data?.user) {
        return <div>Please sign in to continue</div>
    }

    // --- Pick profile image ---
    const profileImage =
        getHighResImage(data.user.image || undefined) ||
        generatedAvatarURI({
            seed: form.watch('username') || data.user.name || 'User',
            variant: 'openPeeps',
        })

    return (
        <div className="mx-auto max-w-md space-y-6 p-6">
            {/* Profile image preview */}
            <div className="flex justify-center">
                <Image
                    src={profileImage}
                    alt="Profile Preview"
                    width={180}
                    height={180}
                    quality={100}
                    className="rounded-full border"
                />
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        name="username"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Choose your username"
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
                                <FormLabel>Workspace Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your workspace name"
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
                                <FormLabel>Slug </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        readOnly
                                        className="bg-gray-100"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Continue'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default OnboardingForm
