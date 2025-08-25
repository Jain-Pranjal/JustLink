'use client'
import { AnalyticsDashboard } from './AnalyticsDashboard'
import { LinksPage } from './LinksPage'
import { Button } from '@/components/ui/button'
import { Search, Settings, HelpCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { generatedAvatar } from '@/components/GeneratedAvatar'

export type ActiveSection =
    | 'justlink-dashboard'
    | 'justlink-analytics'
    | 'justlink-tags'
    | 'justlink-folders'
    | 'onelink-dashboard'
    | 'onelink-analytics'
    | 'documents-library'
    | 'documents-reports'
    | 'documents-assistant'

interface MainDashboardProps {
    activeSection: ActiveSection
    onSectionChange: (section: ActiveSection) => void
}
 
export const MainDashboard = ({
    activeSection,
    onSectionChange,
}: MainDashboardProps) => {
    const { data, isPending } = authClient.useSession()

    if (isPending || !data?.user) {
        return null
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'justlink-dashboard':
                return <LinksPage />
            case 'justlink-analytics':
                return <AnalyticsDashboard />
            case 'justlink-tags':
                // TODO: Implement TagsPage component
                return (
                    <div className="p-8">
                        <h2 className="text-2xl font-semibold">
                            Tags Management
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            Tags component will be rendered here
                        </p>
                    </div>
                )
            case 'justlink-folders':
                // TODO: Implement FoldersPage component
                return (
                    <div className="p-8">
                        <h2 className="text-2xl font-semibold">
                            Folders Management
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            Folders component will be rendered here
                        </p>
                    </div>
                )
            case 'onelink-dashboard':
                // TODO: Implement OneLinkDashboard component
                return (
                    <div className="p-8">
                        <h2 className="text-2xl font-semibold">
                            OneLink Dashboard
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            OneLink dashboard component will be rendered here
                        </p>
                    </div>
                )
            case 'onelink-analytics':
                // TODO: Implement OneLinkAnalytics component
                return (
                    <div className="p-8">
                        <h2 className="text-2xl font-semibold">
                            OneLink Analytics
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            OneLink analytics component will be rendered here
                        </p>
                    </div>
                )
            case 'documents-library':
                // TODO: Implement DocumentsLibrary component
                return (
                    <div className="p-8">
                        <h2 className="text-2xl font-semibold">Data Library</h2>
                        <p className="text-muted-foreground mt-2">
                            Data library component will be rendered here
                        </p>
                    </div>
                )
            case 'documents-reports':
                // TODO: Implement DocumentsReports component
                return (
                    <div className="p-8">
                        <h2 className="text-2xl font-semibold">Reports</h2>
                        <p className="text-muted-foreground mt-2">
                            Reports component will be rendered here
                        </p>
                    </div>
                )
            case 'documents-assistant':
                // TODO: Implement WordAssistant component
                return (
                    <div className="p-8">
                        <h2 className="text-2xl font-semibold">
                            Word Assistant
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            Word assistant component will be rendered here
                        </p>
                    </div>
                )
            default:
                return <LinksPage />
        }
    }

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

    // User avatar component
    const UserAvatar = ({ className = 'size-9' }: { className?: string }) =>
        data.user.image ? (
            <Avatar className={className}>
                <AvatarImage
                    src={data.user.image}
                    alt={data.user.name || 'User Profile'}
                />
            </Avatar>
        ) : (
            generatedAvatar({
                seed: data.user.name || 'User',
                variant: 'openPeeps',
                className,
            })
        )

    return (
        <div className="flex flex-1 flex-col">
            {/* Top Header - Only visible on desktop */}
            <div className="border-border hidden items-center justify-between border-b p-6 lg:flex">
                <div className="flex items-center gap-4">
                    <h1 className="text-foreground text-2xl font-semibold">
                        {getPageTitle()}
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
                            <UserAvatar className="size-9" />
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">{renderContent()}</div>
        </div>
    )
}
