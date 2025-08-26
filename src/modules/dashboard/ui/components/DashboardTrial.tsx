'use client'

import { SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'

export function DashboardTrial() {
    return (
        <SidebarGroup className="border-t-2">
            <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs">
                Usage
            </SidebarGroupLabel>
            <div className="space-y-2 px-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-sidebar-foreground">Events</span>
                    <span className="text-sidebar-foreground">2 of 1K</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-sidebar-foreground">Links</span>
                    <span className="text-sidebar-foreground">1 of 25</span>
                </div>
                <div className="text-sidebar-foreground/50 text-xs">
                    Usage will reset Sep 21, 2025
                </div>
                <Button className="mt-2 w-full" size="sm">
                    Upgrade Plan
                </Button>
            </div>
        </SidebarGroup>
    )
}
