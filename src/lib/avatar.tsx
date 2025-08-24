import { createAvatar } from '@dicebear/core'
import { rings, openPeeps } from '@dicebear/collection'

interface AvatarProps {
    seed: string
    variant: 'rings' | 'openPeeps'
}

export const generatedAvatarURI = ({ seed, variant }: AvatarProps) => {
    let avatar

    if (variant === 'rings') {
        avatar = createAvatar(rings, {
            seed,
        })
    } else if (variant === 'openPeeps') {
        avatar = createAvatar(openPeeps, {
            seed,
            size: 48,
        })
    } else {
        throw new Error('Invalid avatar variant')
    }

    return avatar.toDataUri()
}

//this will be used to generate the avatar URI based on the seed and variant provide for the JustLink

// this dataURI can be directly used in the src attribute of an img tag
