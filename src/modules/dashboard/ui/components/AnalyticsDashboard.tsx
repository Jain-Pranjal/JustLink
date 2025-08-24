import { MetricCard } from './MetricCard'
import { AnalyticsChart } from './AnalyticsChart'

export const AnalyticsDashboard = () => {
    return (
        <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Total Revenue"
                    value="$1,250.00"
                    change="+12.5%"
                    trend="up"
                    description="Trending up this month"
                />
                <MetricCard
                    title="New Customers"
                    value="1,234"
                    change="-20%"
                    trend="down"
                    description="Down 20% this period"
                />
                <MetricCard
                    title="Active Accounts"
                    value="45,678"
                    change="+12.5%"
                    trend="up"
                    description="Strong user retention"
                />
                <MetricCard
                    title="Growth Rate"
                    value="4.5%"
                    change="+4.5%"
                    trend="up"
                    description="Steady performance increase"
                />
            </div>

            {/* Analytics Chart */}
            <AnalyticsChart />
        </div>
    )
}
