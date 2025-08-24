import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
    title: string
    value: string | number
    change: string
    trend: 'up' | 'down'
    description?: string
}

export const MetricCard = ({
    title,
    value,
    change,
    trend,
    description,
}: MetricCardProps) => {
    return (
        <Card className="bg-card border-border hover:bg-accent/5 transition-colors">
            <CardContent className="p-6">
                <div className="mb-2 flex items-center justify-between">
                    <p className="text-muted-foreground text-sm font-medium">
                        {title}
                    </p>
                    <div
                        className={cn(
                            'flex items-center text-xs font-medium',
                            trend === 'up' ? 'text-primary' : 'text-destructive'
                        )}
                    >
                        {trend === 'up' ? (
                            <TrendingUp className="mr-1 h-3 w-3" />
                        ) : (
                            <TrendingDown className="mr-1 h-3 w-3" />
                        )}
                        {change}
                    </div>
                </div>
                <div className="text-foreground mb-1 text-2xl font-bold">
                    {value}
                </div>
                {description && (
                    <p className="text-muted-foreground text-xs">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
