import {
    Area,
    AreaChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const data = [
    { date: 'Apr 7', mobile: 245, desktop: 312 },
    { date: 'Apr 13', mobile: 280, desktop: 340 },
    { date: 'Apr 19', mobile: 320, desktop: 298 },
    { date: 'Apr 26', mobile: 350, desktop: 327 },
    { date: 'May 2', mobile: 290, desktop: 285 },
    { date: 'May 8', mobile: 410, desktop: 398 },
    { date: 'May 14', mobile: 380, desktop: 420 },
    { date: 'May 21', mobile: 450, desktop: 445 },
    { date: 'May 28', mobile: 420, desktop: 390 },
    { date: 'Jun 3', mobile: 380, desktop: 410 },
    { date: 'Jun 9', mobile: 390, desktop: 435 },
    { date: 'Jun 15', mobile: 460, desktop: 480 },
    { date: 'Jun 22', mobile: 440, desktop: 465 },
    { date: 'Jun 30', mobile: 480, desktop: 490 },
]

export const AnalyticsChart = () => {
    return (
        <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                    <CardTitle className="text-foreground">
                        Total Visitors
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                        Total for the last 3 months
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-accent">
                        Last 3 months
                    </Button>
                    <Button variant="ghost" size="sm">
                        Last 30 days
                    </Button>
                    <Button variant="ghost" size="sm">
                        Last 7 days
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient
                                    id="mobileGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="hsl(var(--chart-1))"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="hsl(var(--chart-1))"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient
                                    id="desktopGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="hsl(var(--chart-2))"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="hsl(var(--chart-2))"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fontSize: 12,
                                    fill: 'hsl(var(--muted-foreground))',
                                }}
                            />
                            <YAxis hide />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--popover))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px',
                                    color: 'hsl(var(--popover-foreground))',
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="mobile"
                                stackId="1"
                                stroke="hsl(var(--chart-1))"
                                fill="url(#mobileGradient)"
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="desktop"
                                stackId="1"
                                stroke="hsl(var(--chart-2))"
                                fill="url(#desktopGradient)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="bg-chart-1 h-3 w-3 rounded-sm"></div>
                        <span className="text-foreground font-medium">
                            Mobile
                        </span>
                        <span className="text-muted-foreground">350</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-chart-2 h-3 w-3 rounded-sm"></div>
                        <span className="text-foreground font-medium">
                            Desktop
                        </span>
                        <span className="text-muted-foreground">327</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
