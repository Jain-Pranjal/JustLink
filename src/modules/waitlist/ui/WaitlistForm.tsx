'use client'
import { DynamicGradient } from '@/modules/waitlist/ui/components/DynamicGradient'
import { useTRPC } from '@/trpc/client'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import clsx from 'clsx'
import Link from 'next/link'
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input'
import Image from 'next/image'

const waitlistSchema = z.object({
    email: z.string().email('Please enter a valid email address').toLowerCase(),
})

export default function WaitlistForm() {
    const trpc = useTRPC()

    const waitlistCount = useSuspenseQuery(
        trpc.waitlist.getTotalWaitlistEntries.queryOptions(undefined, {
            refetchOnWindowFocus: true, // re-run your query whenever the browser tab becomes active again.
            refetchInterval: 30000, //30 sec
            staleTime: 25000, // Data is fresh for 25 seconds
            gcTime: 60000, // cache for 1 minute
        })
    )

    const createWaitlistEntry = useMutation(
        trpc.waitlist.create.mutationOptions({
            onSuccess: () => {
                toast.success('Successfully joined the waitlist!')
                form.reset()
            },
            onError: (error) => {
                toast.error(error.message || 'Failed to join waitlist')
            },
        })
    )

    const form = useForm<z.infer<typeof waitlistSchema>>({
        resolver: zodResolver(waitlistSchema),
        defaultValues: {
            email: '',
        },
    })

    const onSubmit = (values: z.infer<typeof waitlistSchema>) => {
        // Only proceed if form is valid
        if (!form.formState.isValid) {
            return
        }

        createWaitlistEntry.mutate(values)

        // confetti({
        //     particleCount: 100,
        //     spread: 70,
        //     origin: { y: 0.6 }
        // });
    }

    // Handle input changes and trigger validation
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        form.setValue('email', value, {
            shouldValidate: true,
            shouldDirty: true,
        })
    }

    const email = form.watch('email')
    const isSubmitting = createWaitlistEntry.isPending
    const isFormValid = form.formState.isValid && email?.trim() !== ''

    return (
        <div className="min-h-screen">
            <DynamicGradient />

            <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
                <div
                    className={clsx(
                        'mx-auto flex w-full max-w-[500px] flex-col overflow-hidden rounded-2xl bg-gray-900/95',
                        'shadow-[0px_170px_48px_0px_rgba(0,_0,_0,_0.00),_0px_109px_44px_0px_rgba(0,_0,_0,_0.01),_0px_61px_37px_0px_rgba(0,_0,_0,_0.15),_0px_27px_27px_0px_rgba(0,_0,_0,_0.25),_0px_7px_15px_0px_rgba(0,_0,_0,_0.30)]'
                    )}
                >
                    <div className="flex w-full flex-col items-center p-6 text-center sm:p-8">
                        <Image
                            src="/TypoLogo/TypoCircle.svg"
                            alt="JustLink Logo"
                            width={120}
                            height={40}
                            className="mb-8"
                            priority
                            draggable={false}
                        />

                        {/* Heading */}
                        <div className="mb-8 space-y-2">
                            <h1 className="text-2xl font-medium text-white sm:text-3xl">
                                Join Our Waitlist
                            </h1>
                            <p className="max-w-md text-sm text-gray-300 sm:text-base">
                                All Your Links, Always in Reach
                            </p>
                        </div>

                        {/* Form */}
                        <div className="w-full max-w-md">
                            <form
                                className="relative"
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <PlaceholdersAndVanishInput
                                    placeholders={['Enter your email']}
                                    onChange={handleChange}
                                    isSubmitting={isSubmitting}
                                    value={email || ''}
                                    register={(name: string) =>
                                        form.register(name as 'email')
                                    }
                                    name="email"
                                    required
                                    isFormValid={isFormValid}
                                />

                                {form.formState.errors.email && (
                                    <p className="mt-2 px-4 text-left text-xs text-red-400">
                                        {form.formState.errors.email.message}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Waitlist Counter */}
                    <div className="flex items-center justify-center border-t border-gray-700 bg-gray-800/30 py-3">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                            <span>
                                {waitlistCount.data
                                    ? `${waitlistCount.data.toLocaleString()} people joined`
                                    : 'Loading...'}
                            </span>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="flex w-full flex-col items-center justify-between gap-2 bg-gray-800/30 px-6 py-4 text-sm sm:flex-row sm:gap-0 sm:px-8">
                        <p className="text-xs text-gray-400">
                            © {new Date().getFullYear()} JustLink. All rights
                            reserved.
                        </p>
                        <div className="flex gap-1">
                            <Link
                                href="/privacy-policy"
                                className="text-xs text-gray-500 transition-colors hover:text-gray-300"
                            >
                                Privacy
                            </Link>
                            <span className="text-xs text-gray-600">/</span>
                            <Link
                                href="/t&c"
                                className="text-xs text-gray-500 transition-colors hover:text-gray-300"
                            >
                                Terms
                            </Link>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}
