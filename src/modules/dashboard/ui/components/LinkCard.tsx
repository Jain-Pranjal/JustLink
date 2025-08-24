import { Copy, ExternalLink, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface LinkCardProps {
    shortUrl: string
    originalUrl: string
    clicks: number
    createdAt: string
}

export const LinkCard = ({
    shortUrl,
    originalUrl,
    clicks,
    createdAt,
}: LinkCardProps) => {
    return (
        <div className="border-border bg-card hover:bg-accent/50 flex items-center justify-between rounded-lg border p-4 transition-colors">
            <div className="flex min-w-0 flex-1 items-center gap-4">
                {/* Status indicator */}
                <div className="h-3 w-3 flex-shrink-0 rounded-full bg-green-500" />

                {/* Link info */}
                <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="text-foreground font-medium">
                            {shortUrl}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                        >
                            <Copy className="h-3 w-3" />
                        </Button>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{originalUrl}</span>
                        <span className="text-muted-foreground/70 text-xs">
                            • {createdAt}
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats and actions */}
            <div className="flex flex-shrink-0 items-center gap-4">
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                        {clicks} clicks
                    </Badge>
                </div>

                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
