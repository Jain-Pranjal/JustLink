'use client'

import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from '@/components/ui/sidebar'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from '@/components/ui/drawer'
import { ChevronUp, ChevronDown, Settings, User2, LogOut } from 'lucide-react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { authClient } from '@/lib/auth-client'
import { generatedAvatar } from '@/components/GeneratedAvatar'
import { useRouter } from 'next/navigation'
import { useSidebar } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'

export function DashboardUserButton() {
    const { data, isPending } = authClient.useSession()
    const router = useRouter()
    const { isMobile } = useSidebar()

    if (isPending || !data?.user) {
        return null
    }

    const handleLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push('/sign-in'),
            },
        })
    }

    // Avatar renderer
    const UserAvatar = ({ className = 'size-8' }: { className?: string }) =>
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

    // Mobile (Drawer)
    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-auto w-full justify-start p-2 hover:bg-white/10"
                    >
                        <div className="flex w-full items-center gap-3">
                            <UserAvatar />
                            <div className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden text-left">
                                <p className="truncate text-sm font-medium">
                                    {data.user.name}
                                </p>
                                <p className="text-muted-foreground truncate text-xs">
                                    {data.user.email}
                                </p>
                            </div>
                            <ChevronDown className="size-4 shrink-0" />
                        </div>
                    </Button>
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{data.user.name}</DrawerTitle>
                        <DrawerDescription>{data.user.email}</DrawerDescription>
                    </DrawerHeader>

                    <div className="space-y-2 px-4">
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-2"
                        >
                            <Settings className="size-4" />
                            Account Settings
                        </Button>

                        <Button
                            variant="destructive"
                            className="w-full justify-start gap-2"
                            onClick={handleLogout}
                        >
                            <LogOut className="size-4" />
                            Sign Out
                        </Button>
                    </div>

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }

    //  Desktop (Dropdown)
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <UserAvatar className="size-8" />
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {data.user.name || 'User'}
                                </span>
                                <span className="truncate text-xs">
                                    {data.user.email || 'user@example.com'}
                                </span>
                            </div>
                            <ChevronUp className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side="top"
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel>
                            <div className="flex flex-col gap-1">
                                <span className="truncate font-medium">
                                    {data.user.name}
                                </span>
                                <span className="text-muted-foreground truncate text-xs font-normal">
                                    {data.user.email}
                                </span>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Settings className="mr-2 size-4" />
                            Account Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-2 size-4" />
                            Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
