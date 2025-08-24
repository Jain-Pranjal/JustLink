'use client'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sidebar } from './Sidebar'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="bg-background flex h-screen">
            {/* Sidebar - Always visible on desktop, overlay on mobile */}
            <Sidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
            />

            {/* Main content */}
            <div className="flex min-w-0 flex-1 flex-col">
                {/* Mobile header */}
                <div className="lg:hidden">
                    <div className="border-border bg-background flex items-center justify-between border-b p-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-md">
                                <span className="text-primary-foreground text-xs font-bold">
                                    A
                                </span>
                            </div>
                            <span className="text-sm font-semibold">
                                JustLink
                            </span>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    )
}
