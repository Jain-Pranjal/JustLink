import { Plus, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SearchBar } from './SearchBar'
import { FilterButton } from './FilterButton'
import { LinkCard } from './LinkCard'

const mockLinks = [
    {
        shortUrl: 'justlink.live/bjp1',
        originalUrl: 'pranjaljain.live',
        clicks: 2,
        createdAt: '7h',
    },
]

export const LinksPage = () => {
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
                {mockLinks.map((link, index) => (
                    <LinkCard
                        key={index}
                        shortUrl={link.shortUrl}
                        originalUrl={link.originalUrl}
                        clicks={link.clicks}
                        createdAt={link.createdAt}
                    />
                ))}
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
