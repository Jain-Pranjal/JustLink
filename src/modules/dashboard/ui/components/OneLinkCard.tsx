'use client'
import { useState } from 'react'
import {
    ExternalLink,
    Edit,
    Trash2,
    Twitter,
    Github,
    Linkedin,
    Globe,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

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

interface LinkCardProps {
    link: LinkItem
    onUpdate: (updates: Partial<LinkItem>) => void
    onRemove: () => void
    isEditing?: boolean
}

const getIconComponent = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
        case 'twitter':
            return Twitter
        case 'github':
            return Github
        case 'linkedin':
            return Linkedin
        case 'globe':
            return Globe
        default:
            return Globe
    }
}

const getSocialColor = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
        case 'twitter':
            return 'bg-[#1DA1F2] hover:bg-[#1DA1F2]/90'
        case 'github':
            return 'bg-[#333333] hover:bg-[#333333]/90'
        case 'linkedin':
            return 'bg-[#0077B5] hover:bg-[#0077B5]/90'
        default:
            return 'bg-primary hover:bg-primary/90'
    }
}

export const OneLinkCard = ({
    link,
    onUpdate,
    onRemove,
    isEditing = false,
}: LinkCardProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editData, setEditData] = useState(link)

    const IconComponent = getIconComponent(link.icon)

    const handleSave = () => {
        onUpdate(editData)
        setIsEditModalOpen(false)
    }

    const handleClick = () => {
        if (!isEditing && link.url) {
            window.open(link.url, '_blank')
        }
    }

    if (link.type === 'text') {
        return (
            <Card
                className={cn(
                    'group relative h-full transition-all duration-200',
                    isEditing
                        ? 'hover:ring-primary/50 cursor-default hover:ring-2'
                        : ''
                )}
            >
                <CardContent className="flex h-full flex-col justify-center p-4">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{link.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {link.description}
                        </p>
                    </div>

                    {isEditing && (
                        <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="flex gap-1">
                                <Dialog
                                    open={isEditModalOpen}
                                    onOpenChange={setIsEditModalOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0"
                                        >
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Edit Text Block
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm font-medium">
                                                    Title
                                                </label>
                                                <Input
                                                    value={editData.title}
                                                    onChange={(e) =>
                                                        setEditData((prev) => ({
                                                            ...prev,
                                                            title: e.target
                                                                .value,
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium">
                                                    Description
                                                </label>
                                                <Textarea
                                                    value={
                                                        editData.description ||
                                                        ''
                                                    }
                                                    onChange={(e) =>
                                                        setEditData((prev) => ({
                                                            ...prev,
                                                            description:
                                                                e.target.value,
                                                        }))
                                                    }
                                                    rows={4}
                                                />
                                            </div>
                                            <Button
                                                onClick={handleSave}
                                                className="w-full"
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive h-6 w-6 p-0"
                                    onClick={onRemove}
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        )
    }

    return (
        <Card
            className={cn(
                'group relative h-full transition-all duration-200',
                isEditing
                    ? 'hover:ring-primary/50 cursor-default hover:ring-2'
                    : 'cursor-pointer hover:scale-[1.02]',
                link.type === 'social'
                    ? getSocialColor(link.icon)
                    : 'bg-card hover:bg-accent/50'
            )}
            onClick={handleClick}
        >
            <CardContent className="flex h-full items-center justify-between p-4">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div
                        className={cn(
                            'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg',
                            link.type === 'social'
                                ? 'bg-white/20'
                                : 'bg-primary/10'
                        )}
                    >
                        <IconComponent
                            className={cn(
                                'h-4 w-4',
                                link.type === 'social'
                                    ? 'text-white'
                                    : 'text-primary'
                            )}
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p
                            className={cn(
                                'truncate text-sm font-medium',
                                link.type === 'social'
                                    ? 'text-white'
                                    : 'text-foreground'
                            )}
                        >
                            {link.title}
                        </p>
                        {link.description && (
                            <p
                                className={cn(
                                    'truncate text-xs',
                                    link.type === 'social'
                                        ? 'text-white/70'
                                        : 'text-muted-foreground'
                                )}
                            >
                                {link.description}
                            </p>
                        )}
                    </div>
                </div>

                {!isEditing && (
                    <ExternalLink
                        className={cn(
                            'h-4 w-4 flex-shrink-0',
                            link.type === 'social'
                                ? 'text-white/70'
                                : 'text-muted-foreground'
                        )}
                    />
                )}

                {isEditing && (
                    <div className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex gap-1">
                            <Dialog
                                open={isEditModalOpen}
                                onOpenChange={setIsEditModalOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0"
                                    >
                                        <Edit className="h-3 w-3" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Link</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium">
                                                Title
                                            </label>
                                            <Input
                                                value={editData.title}
                                                onChange={(e) =>
                                                    setEditData((prev) => ({
                                                        ...prev,
                                                        title: e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">
                                                URL
                                            </label>
                                            <Input
                                                value={editData.url || ''}
                                                onChange={(e) =>
                                                    setEditData((prev) => ({
                                                        ...prev,
                                                        url: e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">
                                                Description
                                            </label>
                                            <Input
                                                value={
                                                    editData.description || ''
                                                }
                                                onChange={(e) =>
                                                    setEditData((prev) => ({
                                                        ...prev,
                                                        description:
                                                            e.target.value,
                                                    }))
                                                }
                                            />
                                        </div>
                                        <Button
                                            onClick={handleSave}
                                            className="w-full"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive h-6 w-6 p-0"
                                onClick={onRemove}
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
