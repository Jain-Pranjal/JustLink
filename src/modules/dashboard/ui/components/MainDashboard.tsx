'use client'
import { useState } from 'react'
// import { AnalyticsDashboard } from './AnalyticsDashboard'
import { LinksPage } from './LinksPage'
import { Button } from '@/components/ui/button'
import { Search, Settings, HelpCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'

type ActiveTab = 'dashboard' | 'analytics' | 'links'

export const MainDashboard = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard')

    const renderContent = () => {
        switch (activeTab) {
            case 'analytics':
            // return <AnalyticsDashboard />
            case 'links':
                return <LinksPage />
            default:
            // return <AnalyticsDashboard />
        }
    }

    return (
        <div className="flex flex-1 flex-col">
            {/* Top Header */}
            <div className="border-border hidden items-center justify-between border-b p-6 lg:flex">
                <div className="flex items-center gap-4">
                    <h1 className="text-foreground text-2xl font-semibold">
                        Dashboard
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                        <Input
                            placeholder="Search..."
                            className="bg-background border-border w-64 pl-10"
                        />
                    </div>
                    <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                        <HelpCircle className="h-4 w-4" />
                    </Button>
                    <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
                        <span className="text-primary-foreground text-sm font-medium">
                            N
                        </span>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-border bg-background border-b">
                <div className="flex items-center px-6">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                                activeTab === 'dashboard'
                                    ? 'border-primary text-primary'
                                    : 'text-muted-foreground hover:text-foreground border-transparent'
                            }`}
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                                activeTab === 'analytics'
                                    ? 'border-primary text-primary'
                                    : 'text-muted-foreground hover:text-foreground border-transparent'
                            }`}
                        >
                            Analytics
                        </button>
                        <button
                            onClick={() => setActiveTab('links')}
                            className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                                activeTab === 'links'
                                    ? 'border-primary text-primary'
                                    : 'text-muted-foreground hover:text-foreground border-transparent'
                            }`}
                        >
                            Links
                        </button>
                    </nav>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">{renderContent()}</div>
        </div>
    )
}
