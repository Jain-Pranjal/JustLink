import { createAvatar } from '@dicebear/core'
import { rings, openPeeps } from '@dicebear/collection'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface GeneratedAvatarProps {
    seed: string
    className?: string
    variant: 'openPeeps' | 'rings'
}

export const generatedAvatar = ({
    seed,
    className,
    variant,
}: GeneratedAvatarProps) => {
    // Create an avatar based on the variant
    let avatar
    if (variant === 'openPeeps') {
        avatar = createAvatar(openPeeps, { seed })
    } else if (variant === 'rings') {
        avatar = createAvatar(rings, { seed })
    } else {
        throw new Error('Invalid variant provided')
    }

    // Return the Avatar component with the generated image
    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar.toDataUri()} alt="Generated Avatar" />
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    )
}

// it will generate the svg string for the avatar
