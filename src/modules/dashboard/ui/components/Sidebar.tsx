import {
    LayoutDashboard,
    BarChart3,
    Folder,
    Tag,
    ExternalLink,
    Tags,
    X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ActiveSection } from './MainDashboard'

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

interface SidebarProps {
    isOpen?: boolean
    onToggle?: () => void
    activeSection: ActiveSection
    onSectionChange: (section: ActiveSection) => void
}

export const Sidebar = ({
    isOpen = true,
    onToggle,
    activeSection,
    onSectionChange,
}: SidebarProps) => {
    const handleSectionClick = (section: ActiveSection) => {
        onSectionChange(section)
        // Close sidebar on mobile after selection
        if (window.innerWidth < 1024 && onToggle) {
            onToggle()
        }
    }

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'bg-sidebar-background border-sidebar-border fixed top-0 left-0 z-50 h-full border-r transition-transform duration-200 ease-in-out lg:relative',
                    'w-64 shrink-0 lg:translate-x-0',
                    isOpen
                        ? 'translate-x-0'
                        : '-translate-x-full lg:translate-x-0'
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="border-sidebar-border flex items-center justify-between border-b p-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                                <span className="text-primary-foreground text-sm font-bold">
                                    J
                                </span>
                            </div>
                            <span className="text-sidebar-primary font-semibold">
                                Workspace name
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="lg:hidden"
                            onClick={onToggle}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 space-y-6 overflow-y-auto p-4">
                        {/* Justlink Section */}
                        <div>
                            <h3 className="text-sidebar-foreground/70 mb-2 px-3 text-xs font-medium tracking-wider uppercase">
                                Justlink
                            </h3>
                            <nav className="space-y-1">
                                {justlinkItems.map((item) => (
                                    <button
                                        key={item.section}
                                        onClick={() =>
                                            handleSectionClick(item.section)
                                        }
                                        className={cn(
                                            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                                            activeSection === item.section
                                                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                                                : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* OneLink Section */}
                        <div>
                            <h3 className="text-sidebar-foreground/70 mb-2 px-3 text-xs font-medium tracking-wider uppercase">
                                onelink
                            </h3>
                            <nav className="space-y-1">
                                {onelinkItems.map((item) => (
                                    <button
                                        key={item.section}
                                        onClick={() =>
                                            handleSectionClick(item.section)
                                        }
                                        className={cn(
                                            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                                            activeSection === item.section
                                                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                                                : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Documents Section */}
                        <div>
                            <h3 className="text-sidebar-foreground/70 mb-2 px-3 text-xs font-medium tracking-wider uppercase">
                                Documents
                            </h3>
                            <nav className="space-y-1">
                                {libraryItems.map((item) => (
                                    <button
                                        key={item.section}
                                        onClick={() =>
                                            handleSectionClick(item.section)
                                        }
                                        className={cn(
                                            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                                            activeSection === item.section
                                                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                                                : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Usage Stats */}
                    <div className="border-sidebar-border border-t p-4">
                        <div className="text-sidebar-foreground/70 mb-2 text-xs">
                            Usage
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-sidebar-foreground">
                                    Events
                                </span>
                                <span className="text-sidebar-foreground">
                                    2 of 1K
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-sidebar-foreground">
                                    Links
                                </span>
                                <span className="text-sidebar-foreground">
                                    1 of 25
                                </span>
                            </div>
                            <div className="text-sidebar-foreground/50 mt-2 text-xs">
                                Usage will reset Sep 21, 2025
                            </div>
                        </div>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4 w-full">
                            Upgrade Plan
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    )
}
