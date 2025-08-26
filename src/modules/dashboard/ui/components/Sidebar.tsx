import {
    LayoutDashboard,
    BarChart3,
    Folder,
    Tag,
    ExternalLink,
    Tags,
    ChevronDown,
    Plus,
    User2,
    Building2,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar'

import { ActiveSection } from './MainDashboard'
import { DashboardTrial } from './DashboardTrial'
import { DashboardUserButton } from './DashboardUserButton'

const justlinkItems = [
    {
        name: 'Dashboard',
        section: 'justlink-dashboard' as ActiveSection,
        icon: LayoutDashboard,
    },
    {
        name: 'Analytics',
        section: 'justlink-analytics' as ActiveSection,
        icon: BarChart3,
    },
    { name: 'Tags', section: 'justlink-tags' as ActiveSection, icon: Tags },
    {
        name: 'Folders',
        section: 'justlink-folders' as ActiveSection,
        icon: Folder,
    },
]

const onelinkItems = [
    {
        name: 'Dashboard',
        section: 'onelink-dashboard' as ActiveSection,
        icon: LayoutDashboard,
    },
    {
        name: 'Analytics',
        section: 'onelink-analytics' as ActiveSection,
        icon: BarChart3,
    },
]

const libraryItems = [
    {
        name: 'Data Library',
        section: 'documents-library' as ActiveSection,
        icon: Folder,
    },
    {
        name: 'Reports',
        section: 'documents-reports' as ActiveSection,
        icon: Tag,
    },
    {
        name: 'Word Assistant',
        section: 'documents-assistant' as ActiveSection,
        icon: ExternalLink,
    },
]

// Mock workspaces data
const workspaces = [
    { id: '1', name: 'Personal Workspace', icon: User2 },
    { id: '2', name: 'Acme Corp', icon: Building2 },
]

interface AppSidebarProps {
    activeSection: ActiveSection
    onSectionChange: (section: ActiveSection) => void
}

export const AppSidebar = ({
    activeSection,
    onSectionChange,
}: AppSidebarProps) => {
    const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0])
    const [isWorkspaceDialogOpen, setIsWorkspaceDialogOpen] = useState(false)

    const handleSectionClick = (section: ActiveSection) => {
        onSectionChange(section)
    }

    const handleWorkspaceSelect = (workspace: (typeof workspaces)[0]) => {
        setSelectedWorkspace(workspace)
        setIsWorkspaceDialogOpen(false)
    }

    return (
        <Sidebar>
            {/* Header with Workspace Selector */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Dialog
                            open={isWorkspaceDialogOpen}
                            onOpenChange={setIsWorkspaceDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <selectedWorkspace.icon className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {selectedWorkspace.name}
                                        </span>
                                        <span className="truncate text-xs">
                                            Free Plan
                                        </span>
                                    </div>
                                    <ChevronDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Select Workspace</DialogTitle>
                                    <DialogDescription>
                                        Choose a workspace to switch to.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-2">
                                    {workspaces.map((workspace) => (
                                        <Button
                                            key={workspace.id}
                                            variant={
                                                selectedWorkspace.id ===
                                                workspace.id
                                                    ? 'default'
                                                    : 'ghost'
                                            }
                                            className="h-12 w-full justify-start"
                                            onClick={() =>
                                                handleWorkspaceSelect(workspace)
                                            }
                                        >
                                            <workspace.icon className="mr-2 size-4" />
                                            {workspace.name}
                                        </Button>
                                    ))}
                                    <SidebarSeparator />
                                    <Button
                                        variant="outline"
                                        className="h-12 w-full justify-start"
                                        onClick={() =>
                                            setIsWorkspaceDialogOpen(false)
                                        }
                                    >
                                        <Plus className="mr-2 size-4" />
                                        Create Workspace
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* <SidebarSeparator /> */}

            {/* Main Content */}
            <SidebarContent>
                {/* Justlink Section */}
                <SidebarGroup>
                    <SidebarGroupLabel>Justlink</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {justlinkItems.map((item) => (
                                <SidebarMenuItem key={item.section}>
                                    <SidebarMenuButton
                                        onClick={() =>
                                            handleSectionClick(item.section)
                                        }
                                        isActive={
                                            activeSection === item.section
                                        }
                                        tooltip={item.name}
                                    >
                                        <item.icon />
                                        <span>{item.name}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* OneLink Section */}
                <SidebarGroup>
                    <SidebarGroupLabel>OneLink</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {onelinkItems.map((item) => (
                                <SidebarMenuItem key={item.section}>
                                    <SidebarMenuButton
                                        onClick={() =>
                                            handleSectionClick(item.section)
                                        }
                                        isActive={
                                            activeSection === item.section
                                        }
                                        tooltip={item.name}
                                    >
                                        <item.icon />
                                        <span>{item.name}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Documents Section */}
                <SidebarGroup>
                    <SidebarGroupLabel>Documents</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {libraryItems.map((item) => (
                                <SidebarMenuItem key={item.section}>
                                    <SidebarMenuButton
                                        onClick={() =>
                                            handleSectionClick(item.section)
                                        }
                                        isActive={
                                            activeSection === item.section
                                        }
                                        tooltip={item.name}
                                    >
                                        <item.icon />
                                        <span>{item.name}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* <SidebarSeparator /> */}

            {/* Footer with Usage Stats and User Menu */}
            <SidebarFooter>
                <DashboardTrial />
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    )
}
