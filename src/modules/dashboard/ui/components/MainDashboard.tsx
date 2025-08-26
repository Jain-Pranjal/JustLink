'use client'
import { AnalyticsDashboard } from './AnalyticsDashboard'
import { LinksPage } from './LinksPage'
import { TagsPage } from './TagsPage'

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
    const renderContent = () => {
        switch (activeSection) {
            case 'justlink-dashboard':
                return <LinksPage />
            case 'justlink-analytics':
                return <AnalyticsDashboard />
            case 'justlink-tags':
                return <TagsPage />
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
                        <h2 className="font-semibual text-2xl">Data Library</h2>
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

    return (
        <div className="flex flex-1 flex-col">
            {/* Content - No header needed here as it's handled in DashboardLayout */}
            <div className="flex-1 overflow-auto">{renderContent()}</div>
        </div>
    )
}
