import { useState, useCallback } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { Plus, Eye, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { OneLinkCard } from './OneLinkCard'
import { OneLinkModal } from './OneLinkModal'
import { toast } from 'sonner'
import './grid-layout.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface LinkItem {
    id: string
    type: 'social' | 'link' | 'text' | 'image'
    title: string
    url?: string
    icon?: string
    color?: string
    description?: string
    image?: string
}

interface GridItem {
    i: string
    x: number
    y: number
    w: number
    h: number
}

export const OneLinkDashboard = () => {
    const [links, setLinks] = useState<LinkItem[]>([
        {
            id: '1',
            type: 'social',
            title: 'Twitter',
            url: 'https://twitter.com/username',
            icon: 'twitter',
            color: '#1DA1F2',
        },
        {
            id: '2',
            type: 'link',
            title: 'My Website',
            url: 'https://mywebsite.com',
            description: 'Check out my personal website',
        },
        {
            id: '3',
            type: 'text',
            title: 'About Me',
            description:
                'I am a passionate developer who loves creating amazing experiences.',
        },
    ])

    const [layout, setLayout] = useState<GridItem[]>([
        { i: '1', x: 0, y: 0, w: 2, h: 1 },
        { i: '2', x: 2, y: 0, w: 2, h: 1 },
        { i: '3', x: 0, y: 1, w: 4, h: 2 },
    ])

    const [profileData, setProfileData] = useState({
        name: 'Pranjal Jain',
        bio: 'Just a Tech student :)',
        avatar: '/placeholder.svg',
    })

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const onLayoutChange = useCallback((newLayout: GridItem[]) => {
        setLayout(newLayout)
    }, [])

    const addLink = (newLink: Omit<LinkItem, 'id'>) => {
        const id = Date.now().toString()
        const linkWithId = { ...newLink, id }

        setLinks((prev) => [...prev, linkWithId])

        // Add to grid layout
        const newGridItem: GridItem = {
            i: id,
            x: 0,
            y: Math.max(...layout.map((item) => item.y + item.h), 0),
            w: newLink.type === 'text' ? 4 : 2,
            h: newLink.type === 'text' ? 2 : 1,
        }

        setLayout((prev) => [...prev, newGridItem])
        setIsAddModalOpen(false)
        toast.success('Link added successfully!')
    }

    const removeLink = (id: string) => {
        setLinks((prev) => prev.filter((link) => link.id !== id))
        setLayout((prev) => prev.filter((item) => item.i !== id))
        toast.success('Link removed successfully!')
    }

    const updateLink = (id: string, updates: Partial<LinkItem>) => {
        setLinks((prev) =>
            prev.map((link) =>
                link.id === id ? { ...link, ...updates } : link
            )
        )
        toast.success('Link updated successfully!')
    }

    const handleSave = () => {
        toast.success('Portfolio saved successfully!')
    }

    return (
        <div className="bg-background flex min-h-screen flex-1 flex-col">
            {/* Header */}
            <div className="border-border bg-card border-b">
                <div className="flex items-center justify-between px-6 py-4">
                    <div>
                        <h1 className="text-foreground text-2xl font-semibold">
                            Design your personal page
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                        </Button>
                        <Button onClick={handleSave} size="sm">
                            <Save className="mr-2 h-4 w-4" />
                            Save
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex min-h-0 flex-1">
                {/* Sidebar - Profile Settings */}
                <div className="border-border bg-card w-80 flex-shrink-0 overflow-y-auto border-r p-6">
                    <div className="space-y-6">
                        <div>
                            <h3 className="mb-4 text-lg font-semibold">
                                Profile Settings
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Display Name</Label>
                                    <Input
                                        id="name"
                                        value={profileData.name}
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="bio">Bio</Label>
                                    <Input
                                        id="bio"
                                        value={profileData.bio}
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                bio: e.target.value,
                                            }))
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="avatar">Avatar URL</Label>
                                    <Input
                                        id="avatar"
                                        value={profileData.avatar}
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                avatar: e.target.value,
                                            }))
                                        }
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-4 text-lg font-semibold">
                                Add Content
                            </h3>
                            <Dialog
                                open={isAddModalOpen}
                                onOpenChange={setIsAddModalOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button className="w-full">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Link
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Add New Link</DialogTitle>
                                    </DialogHeader>
                                    <OneLinkModal onAdd={addLink} />
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div>
                            <h3 className="mb-4 text-lg font-semibold">
                                Links ({links.length})
                            </h3>
                            <div className="space-y-2">
                                {links.map((link) => (
                                    <Card key={link.id} className="p-3">
                                        <div className="flex items-center justify-between">
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium">
                                                    {link.title}
                                                </p>
                                                <p className="text-muted-foreground text-xs capitalize">
                                                    {link.type}
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    removeLink(link.id)
                                                }
                                                className="text-destructive hover:text-destructive"
                                            >
                                                ×
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Canvas */}
                <div className="bg-muted/30 flex-1 overflow-auto p-6">
                    <div className="mx-auto h-full max-w-5xl">
                        {/* Profile Header Preview */}
                        <div className="bg-card mb-8 rounded-lg border p-6 text-center">
                            <div className="bg-primary/10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
                                <span className="text-primary text-2xl font-semibold">
                                    {profileData.name.charAt(0)}
                                </span>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold">
                                {profileData.name}
                            </h2>
                            <p className="text-muted-foreground">
                                {profileData.bio}
                            </p>
                        </div>

                        {/* Grid Layout */}
                        <div className="bg-card/50 min-h-[400px] rounded-lg border p-4">
                            <ResponsiveGridLayout
                                className="layout"
                                layouts={{
                                    lg: layout,
                                    md: layout,
                                    sm: layout,
                                    xs: layout,
                                    xxs: layout,
                                }}
                                onLayoutChange={onLayoutChange}
                                breakpoints={{
                                    lg: 1200,
                                    md: 996,
                                    sm: 768,
                                    xs: 480,
                                    xxs: 0,
                                }}
                                cols={{ lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 }}
                                rowHeight={80}
                                margin={[16, 16]}
                                isDraggable={true}
                                isResizable={true}
                                compactType="vertical"
                                preventCollision={false}
                                useCSSTransforms={true}
                                maxRows={20}
                                resizeHandles={['se']}
                                isBounded={true}
                            >
                                {links.map((link) => (
                                    <div key={link.id} className="grid-item">
                                        <OneLinkCard
                                            link={link}
                                            onUpdate={(
                                                updates: Partial<LinkItem>
                                            ) => updateLink(link.id, updates)}
                                            onRemove={() => removeLink(link.id)}
                                            isEditing={true}
                                        />
                                    </div>
                                ))}
                            </ResponsiveGridLayout>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
