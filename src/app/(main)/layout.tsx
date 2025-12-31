import { GlobalNavbar } from '@/components/global/Navbar'

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <GlobalNavbar />
            {children}
        </>
    )
}
