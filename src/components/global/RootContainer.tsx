import { FC, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Props {
    children: ReactNode
    className?: string
}

const RootContainer: FC<Props> = ({ children, className }) => {
    return (
        <div
            className={cn(
                'container mx-auto max-w-[1400px] p-4 pt-9 sm:p-6 lg:p-6 xl:p-10',
                className
            )}
        >
            {children}
        </div>
    )
}

export default RootContainer
