'use client'
import { useState } from 'react'
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import { AppSidebar } from './Sidebar'
import { MainDashboard, ActiveSection } from './MainDashboard'
import { authClient } from '@/lib/auth-client'

interface DashboardLayoutProps {
    children?: React.ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [activeSection, setActiveSection] =
        useState<ActiveSection>('justlink-dashboard')

    // Get user session data
    const { data, isPending } = authClient.useSession()

    // Get page title based on active section
    const getPageTitle = () => {
        switch (activeSection) {
            case 'justlink-dashboard':
                return 'JustLink Dashboard'
            case 'justlink-analytics':
                return 'JustLink Analytics'
            case 'justlink-tags':
                return 'Tags'
            case 'justlink-folders':
                return 'Folders'
            case 'onelink-dashboard':
                return 'OneLink Dashboard'
            case 'onelink-analytics':
                return 'OneLink Analytics'
            case 'documents-library':
                return 'Data Library'
            case 'documents-reports':
                return 'Reports'
            case 'documents-assistant':
                return 'Word Assistant'
            default:
                return 'Dashboard'
        }
    }

    return (
        <SidebarProvider>
            <AppSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
            />
            <SidebarInset>
                {/* Top Navigation Bar */}
                <header className="flex h-16 shrink-0 items-center justify-between border-b px-6">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger className="-ml-1 lg:hidden" />
                        <h1 className="text-foreground text-2xl font-semibold">
                            {getPageTitle()}
                        </h1>
                    </div>
                </header>

                {/* Main content area */}
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {children || (
                        <MainDashboard
                            activeSection={activeSection}
                            onSectionChange={setActiveSection}
                        />
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
