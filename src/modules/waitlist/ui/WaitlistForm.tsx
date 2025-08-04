"use client";
import { DynamicGradient } from "@/modules/waitlist/ui/components/DynamicGradient"
import { useTRPC } from "@/trpc/client";
import { useMutation ,useSuspenseQuery} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import clsx from "clsx";
import confetti from "canvas-confetti";




const waitlistSchema = z.object({
    email: z.string().email("Please enter a valid email address").toLowerCase()
});


export default function WaitlistForm() {
    const trpc = useTRPC();


    const waitlistCount = useSuspenseQuery(trpc.waitlist.getTotalWaitlistEntries.queryOptions({
        refetchOnWindowFocus: true,
        refetchInterval: 1000, // Refetch every 1 second
    }));
    

    const createWaitlistEntry = useMutation(
        trpc.waitlist.create.mutationOptions({
            onSuccess: () => {
                toast.success("Successfully joined the waitlist!");
                form.reset();
            },
            onError: (error) => {
                toast.error(error.message || "Failed to join waitlist");
            }
        })
    );
    
    
    const form = useForm<z.infer<typeof waitlistSchema>>({
        resolver: zodResolver(waitlistSchema),
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = (values: z.infer<typeof waitlistSchema>) => {
        createWaitlistEntry.mutate(values);

        confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
        });
    };

    const email = form.watch("email");
    const isSubmitting = createWaitlistEntry.isPending;

    return (
        <div className="min-h-screen">
            <DynamicGradient />

            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div
                    className={clsx(
                        "w-full mx-auto max-w-[500px] flex flex-col bg-white/85 overflow-hidden rounded-2xl",
                        "shadow-[0px_170px_48px_0px_rgba(18,_18,_19,_0.00),_0px_109px_44px_0px_rgba(18,_18,_19,_0.01),_0px_61px_37px_0px_rgba(18,_18,_19,_0.05),_0px_27px_27px_0px_rgba(18,_18,_19,_0.09),_0px_7px_15px_0px_rgba(18,_18,_19,_0.10)]",
                    )}
                >
                    <div className="flex flex-col items-center text-center w-full p-6 sm:p-8">
                        {/* Heading */}
                        <div className="space-y-2 mb-8">
                            <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">
                                Join Our Waitlist
                            </h1>
                            <p className="text-gray-600 text-sm sm:text-base max-w-md">
                                One page to handle all your links
                            </p>
                        </div>

                        {/* Form */}
                        <div className="w-full max-w-md">
                            <form className="relative" onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...form.register("email")}
                                        className={clsx(
                                            "w-full text-sm pl-4 pr-28 py-3 h-12 bg-gray-100/50 rounded-full text-gray-900 placeholder:text-gray-500 border border-gray-200",
                                            "focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all",
                                        )}
                                        disabled={isSubmitting}
                                        autoComplete="email"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !email?.trim()}
                                        className={clsx(
                                            "absolute h-8 px-4 bg-gray-900 text-white text-sm top-1/2 transform -translate-y-1/2 right-2 rounded-full font-medium flex gap-2 items-center",
                                            "disabled:cursor-not-allowed disabled:opacity-50",
                                            "hover:bg-gray-800 transition-colors",
                                            {
                                                "bg-gray-700": isSubmitting,
                                            },
                                        )}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span>Joining...</span>
                                                <div className="w-3 h-3 rounded-full border border-white !border-t-transparent animate-spin" />
                                            </>
                                        ) : (
                                            "Join Waitlist"
                                        )}
                                    </button>
                                </div>
                                {form.formState.errors.email && (
                                    <p className="text-xs text-red-500 mt-2 text-left px-4">
                                        {form.formState.errors.email.message}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>

                  

                    {/* Waitlist Counter */}
                    <div className="flex items-center justify-center py-3 bg-gray-50/50 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>
                                {waitlistCount.data 
                                    ? `${waitlistCount.data.toLocaleString()} people joined`
                                    : 'Loading...'
                                }
                            </span>
                        </div>
                    </div>

                      {/* Footer */}
                    <footer className="flex flex-col sm:flex-row justify-between items-center w-full px-6 sm:px-8 py-4 text-sm bg-gray-900/5 gap-2 sm:gap-0">
                        <p className="text-xs text-gray-500">© 2025 Pagr. All rights reserved.</p>
                        <div className="flex gap-1">
                            {/* TODO: ADD THE LINKS FOR PRIVACY AND TERMS */}
                            <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Privacy</button>
                            <span className="text-xs text-gray-300">/</span>
                            <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Terms</button>
                        </div>
                    </footer>

                </div>
            </div>
        </div>

    )
}
