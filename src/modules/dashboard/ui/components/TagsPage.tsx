'use client'
import { Plus, Settings2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SearchBar } from './SearchBar'
import { FilterButton } from './FilterButton'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

const mockTags = [
    {
        name: 'Marketing',
        createdAt: '2d',
        links: 5,
    },
    {
        name: 'Personal',
        createdAt: '5d',
        links: 2,
    },
]

export const TagsPage = () => {
    const [open, setOpen] = useState(false)
    const [tagName, setTagName] = useState('')

    const handleCreateTag = () => {
        if (!tagName.trim()) return
        console.log('New Tag Created:', tagName)
        // Later => Call TRPC mutation to create tag in DB
        setTagName('')
        setOpen(false)
    }

    return (
        <div className="mx-auto max-w-7xl p-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-foreground mb-1 text-2xl font-semibold">
                        Tags
                    </h1>
                </div>

                {/* Dialog Trigger for Create Tag */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create tag
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create a New Tag</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 space-y-4">
                            <Input
                                placeholder="Enter tag name"
                                value={tagName}
                                onChange={(e) => setTagName(e.target.value)}
                            />
                            <Button
                                onClick={handleCreateTag}
                                className="w-full"
                            >
                                Create Tag
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters and Search */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                <div className="flex gap-3">
                    <FilterButton />
                    <FilterButton label="Display" onClick={() => {}} />
                </div>

                <SearchBar placeholder="Search tags..." />

                <Button variant="ghost" size="sm" className="gap-2 self-start">
                    <Settings2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Tags List */}
            <div className="mb-8 space-y-3">
                {mockTags.map((tag, index) => (
                    <div
                        key={index}
                        className="border-border hover:bg-muted flex items-center justify-between rounded-lg border p-4 transition"
                    >
                        <div>
                            <p className="font-medium">{tag.name}</p>
                            <p className="text-muted-foreground text-sm">
                                {tag.links} links · created {tag.createdAt} ago
                            </p>
                        </div>
                        <Button variant="outline" size="sm">
                            Manage
                        </Button>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="text-muted-foreground flex items-center justify-between text-sm">
                <div>
                    Viewing 1-{mockTags.length} of {mockTags.length} tags
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                        Next
                    </Button>
                </div>
            </div>

            {/* Bottom Action for Mobile */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 transform lg:hidden">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button size="lg" className="rounded-full shadow-lg">
                            <Plus className="mr-2 h-5 w-5" />
                            Create tag
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create a New Tag</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 space-y-4">
                            <Input
                                placeholder="Enter tag name"
                                value={tagName}
                                onChange={(e) => setTagName(e.target.value)}
                            />
                            <Button
                                onClick={handleCreateTag}
                                className="w-full"
                            >
                                Create Tag
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
