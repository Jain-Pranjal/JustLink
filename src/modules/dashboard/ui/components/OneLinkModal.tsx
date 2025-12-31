'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Twitter, Github, Linkedin, Globe, FileText } from 'lucide-react'

interface LinkItem {
    type: 'social' | 'link' | 'text' | 'image'
    title: string
    url?: string
    icon?: string
    color?: string
    description?: string
    image?: string
}

interface AddLinkModalProps {
    onAdd: (link: LinkItem) => void
}

const linkTypes = [
    { value: 'social', label: 'Social Media', icon: Twitter },
    { value: 'link', label: 'Website Link', icon: Globe },
    { value: 'text', label: 'Text Block', icon: FileText },
]

const socialPlatforms = [
    { value: 'twitter', label: 'Twitter', icon: Twitter, color: '#1DA1F2' },
    { value: 'github', label: 'GitHub', icon: Github, color: '#333333' },
    { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: '#0077B5' },
    { value: 'globe', label: 'Website', icon: Globe, color: '#6366f1' },
]

export const OneLinkModal = ({ onAdd }: AddLinkModalProps) => {
    const [formData, setFormData] = useState<LinkItem>({
        type: 'link',
        title: '',
        url: '',
        description: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title) return

        onAdd(formData)

        // Reset form
        setFormData({
            type: 'link',
            title: '',
            url: '',
            description: '',
        })
    }

    const handleTypeChange = (type: string) => {
        setFormData((prev) => ({
            ...prev,
            type: type as LinkItem['type'],
            icon: type === 'social' ? 'globe' : undefined,
            color: type === 'social' ? '#6366f1' : undefined,
        }))
    }

    const handleSocialPlatformChange = (platform: string) => {
        const selectedPlatform = socialPlatforms.find(
            (p) => p.value === platform
        )
        if (selectedPlatform) {
            setFormData((prev) => ({
                ...prev,
                icon: platform,
                color: selectedPlatform.color,
            }))
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Content Type</Label>
                <Select value={formData.type} onValueChange={handleTypeChange}>
                    <SelectTrigger className="mt-1">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {linkTypes.map((type) => {
                            const IconComponent = type.icon
                            return (
                                <SelectItem key={type.value} value={type.value}>
                                    <div className="flex items-center gap-2">
                                        <IconComponent className="h-4 w-4" />
                                        {type.label}
                                    </div>
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </div>

            {formData.type === 'social' && (
                <div>
                    <Label>Platform</Label>
                    <Select
                        value={formData.icon || 'globe'}
                        onValueChange={handleSocialPlatformChange}
                    >
                        <SelectTrigger className="mt-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {socialPlatforms.map((platform) => {
                                const IconComponent = platform.icon
                                return (
                                    <SelectItem
                                        key={platform.value}
                                        value={platform.value}
                                    >
                                        <div className="flex items-center gap-2">
                                            <IconComponent className="h-4 w-4" />
                                            {platform.label}
                                        </div>
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </div>
            )}

            <div>
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                        }))
                    }
                    className="mt-1"
                    placeholder="Enter title..."
                    required
                />
            </div>

            {formData.type !== 'text' && (
                <div>
                    <Label htmlFor="url">URL</Label>
                    <Input
                        id="url"
                        type="url"
                        value={formData.url || ''}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                url: e.target.value,
                            }))
                        }
                        className="mt-1"
                        placeholder="https://..."
                        required
                    />
                </div>
            )}

            <div>
                <Label htmlFor="description">
                    Description{' '}
                    {formData.type === 'text' ? '(Required)' : '(Optional)'}
                </Label>
                <Textarea
                    id="description"
                    value={formData.description || ''}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                    className="mt-1"
                    rows={3}
                    placeholder={
                        formData.type === 'text'
                            ? 'Enter your text content...'
                            : 'Short description...'
                    }
                    required={formData.type === 'text'}
                />
            </div>

            {/* Preview */}
            {formData.title && (
                <div>
                    <Label>Preview</Label>
                    <Card className="mt-2">
                        <CardContent className="p-3">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded">
                                    {formData.type === 'social' &&
                                        formData.icon === 'twitter' && (
                                            <Twitter className="h-3 w-3" />
                                        )}
                                    {formData.type === 'social' &&
                                        formData.icon === 'github' && (
                                            <Github className="h-3 w-3" />
                                        )}
                                    {formData.type === 'social' &&
                                        formData.icon === 'linkedin' && (
                                            <Linkedin className="h-3 w-3" />
                                        )}
                                    {(formData.type === 'link' ||
                                        (formData.type === 'social' &&
                                            formData.icon === 'globe')) && (
                                        <Globe className="h-3 w-3" />
                                    )}
                                    {formData.type === 'text' && (
                                        <FileText className="h-3 w-3" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium">
                                        {formData.title}
                                    </p>
                                    {formData.description && (
                                        <p className="text-muted-foreground text-xs">
                                            {formData.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <Button type="submit" className="w-full" disabled={!formData.title}>
                Add Link
            </Button>
        </form>
    )
}
