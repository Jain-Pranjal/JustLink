import { FC, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface Props {
    children: ReactNode
    className?: string
}

const Container: FC<Props> = ({ children, className }) => {
    return (
        <div
            className={cn(
                // TODO: remove the rounded properties when the design is finalised
                'border-black-600 rounded-2xl border p-4 backdrop-blur-xl md:rounded-3xl md:p-7',
                className
            )}
        >
            {children}
        </div>
    )
}

export default Container
