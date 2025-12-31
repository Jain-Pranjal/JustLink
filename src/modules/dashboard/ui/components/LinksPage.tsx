/**
 * here hum we are showing all the links to the user. jo bhi. usne create kare honge so yeha bhi aapka client component hoga jo ki aapaka getalllinks ko call krega jo bhib us user ne banaye honge
 *
 *
 */

// TODO: here i am fetching all the links for the current user and workspace so i need to first fetch the workspace data and then pass the workspaceId to getall the links

// we can do one thing ke yeah links page to aapko app.justlink.live/username/workspaceslug me milge na so i can capture th eslug na dpass the sllug instead of id andn find via the slug

// also we can do one thing we can prerender the data and then pass the data to the client component by hydration

'use client'
import { Plus, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SearchBar } from './SearchBar'
import { FilterButton } from './FilterButton'
import { LinkCard } from './LinkCard'
import { useParams } from 'next/navigation'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'

export const LinksPage = () => {
    const trpc = useTRPC()
    // const queryClient = useQueryClient()
    const { workspaceSlug } = useParams() as { workspaceSlug: string } //collect the workspaceSlug from the URL only as we are on the dashboard page dashboard/:username/:workspaceSlug

    //   fetching the allShortLinks data using cache
    const { data, isLoading, error } = useQuery(
        trpc.shortLink.getAllShortLinks.queryOptions({ workspaceSlug })
    )

    // api call to remove the links
    // const removeLink = useMutation(
    //     trpc.shortLink.deleteShortLink.mutationOptions({
    //         onSuccess: async () => {
    //             await queryClient.invalidateQueries(
    //                 trpc.shortLink.getAllShortLinks.queryOptions({
    //                     workspaceSlug,
    //                 })
    //             )
    //         },
    //         onError: (error) => {
    //             toast.error(
    //                 error.message ||
    //                     'Failed to remove link. Please try again later.'
    //             )
    //         },
    //     })
    // )

    return (
        <div className="mx-auto max-w-7xl p-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-foreground mb-1 text-2xl font-semibold">
                        Links
                    </h1>
                </div>

                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create link
                </Button>
            </div>

            {/* Filters and Search */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                <div className="flex gap-3">
                    <FilterButton />
                    <FilterButton label="Display" onClick={() => {}} />
                </div>

                <SearchBar />

                <Button variant="ghost" size="sm" className="gap-2 self-start">
                    <Settings2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Links List */}
            <div className="mb-8 space-y-3">
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="text-muted-foreground">
                            Loading links...
                        </div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="text-destructive">
                            Failed to load links: {error.message}
                        </div>
                    </div>
                ) : (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data?.shortLinks?.map((link: any) => (
                        <LinkCard
                            key={link.short_links.id}
                            shortUrl={link.short_links.slug}
                            originalUrl={link.short_links.destination}
                            clicks={link.short_links.clicks}
                            createdAt={link.short_links.createdAt}
                        />
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="text-muted-foreground flex items-center justify-between text-sm">
                <div>Viewing 1-1 of 1 link</div>

                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                        Next
                    </Button>
                </div>
            </div>

            {/* Bottom Action */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 transform lg:hidden">
                <Button size="lg" className="rounded-full shadow-lg">
                    <Plus className="mr-2 h-5 w-5" />
                    Create link
                </Button>
            </div>
        </div>
    )
}
