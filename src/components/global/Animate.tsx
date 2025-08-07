'use client'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { cn } from '@/lib/utils'

type Props = {
    url: string
    className?: string
    isLoop?: boolean
    isPlayOnHover?: boolean
    onClick?: () => void
}

const Animate = ({ url, className, isLoop, isPlayOnHover, onClick }: Props) => {
    return (
        <DotLottieReact
            playOnHover={isPlayOnHover}
            className={cn(className)}
            src={url}
            loop={isLoop}
            autoplay
            onClick={onClick}
            speed={2}
        />
    )
}

export default Animate
