'use client'

import { MeshGradient } from '@paper-design/shaders-react'

export function DynamicGradient() {
    return (
        <MeshGradient
            colors={colorSchemes.dark2}
            speed={0.7}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
            }}
        />
    )
}
const colorSchemes = {
    default: ['#001c80', '#1ac7ff', '#04ffb1', '#ff1ff1'],
    sunset: ['#ff6b6b', '#feca57', '#ff9ff3', '#54a0ff'],
    ocean: ['#0066cc', '#00d4ff', '#0099ff', '#66ccff'],
    forest: ['#2d5016', '#68b738', '#a8e6cf', '#88d8a3'],
    dark: ['#1a1a2e', '#16213e', '#0f3460', '#533483'],
    dark2: ['#ff6b6b', '#ebdada', '#DB2941', '#533483'],
    darkPurple: ['#2d1b69', '#11052c', '#3c096c', '#5a189a'],
    darkRed: ['#660708', '#a4161a', '#ba181b', '#e5383b'],
    darkGreen: ['#144552', '#0b525b', '#1a535c', '#4ecdc4'],
    darkBlue: ['#0d1b2a', '#1b263b', '#415a77', '#778da9'],
    darkGray: ['#2b2d42', '#3c3c3c', '#525252', '#737373'],
}
