'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface PixelData {
    x: number
    y: number
    r: number
    color: string
}

interface ColorData {
    x: number
    y: number
    color: [number, number, number, number]
}

export function PlaceholdersAndVanishInput({
    placeholders,
    onChange,
    isSubmitting = false,
    value: externalValue = '',
    register,
    name = 'email',
    isFormValid = false,
    ...inputProps
}: {
    placeholders: string[]
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    isSubmitting?: boolean
    value?: string
    register?: (name: string) => {
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
        ref: (instance: HTMLInputElement | null) => void
        name: string
    }
    name?: string
    isFormValid?: boolean
    [key: string]: unknown
}) {
    const [currentPlaceholder, setCurrentPlaceholder] = useState(0)

    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const startAnimation = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length)
        }, 3000)
    }, [placeholders.length])

    const handleVisibilityChange = useCallback(() => {
        if (document.visibilityState !== 'visible' && intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        } else if (document.visibilityState === 'visible') {
            startAnimation()
        }
    }, [startAnimation])

    useEffect(() => {
        startAnimation()
        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            )
        }
    }, [handleVisibilityChange, startAnimation])

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const newDataRef = useRef<PixelData[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState(externalValue)
    const [animating, setAnimating] = useState(false)

    // Update internal value when external value changes
    useEffect(() => {
        setValue(externalValue)
    }, [externalValue])

    const draw = useCallback(() => {
        if (!inputRef.current) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = 800
        canvas.height = 800
        ctx.clearRect(0, 0, 800, 800)
        const computedStyles = getComputedStyle(inputRef.current)

        const fontSize = parseFloat(
            computedStyles.getPropertyValue('font-size')
        )
        ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`
        ctx.fillStyle = '#FFF'
        ctx.fillText(value, 16, 40)

        const imageData = ctx.getImageData(0, 0, 800, 800)
        const pixelData = imageData.data
        const newData: ColorData[] = []

        for (let t = 0; t < 800; t++) {
            const i = 4 * t * 800
            for (let n = 0; n < 800; n++) {
                const e = i + 4 * n
                if (
                    pixelData[e] !== 0 &&
                    pixelData[e + 1] !== 0 &&
                    pixelData[e + 2] !== 0
                ) {
                    newData.push({
                        x: n,
                        y: t,
                        color: [
                            pixelData[e],
                            pixelData[e + 1],
                            pixelData[e + 2],
                            pixelData[e + 3],
                        ],
                    })
                }
            }
        }

        newDataRef.current = newData.map(({ x, y, color }) => ({
            x,
            y,
            r: 1,
            color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
        }))
    }, [value])

    useEffect(() => {
        draw()
    }, [value, draw])

    const animate = useCallback((start: number) => {
        const animateFrame = (pos: number = 0) => {
            requestAnimationFrame(() => {
                const newArr: PixelData[] = []
                for (let i = 0; i < newDataRef.current.length; i++) {
                    const current = newDataRef.current[i]
                    if (current.x < pos) {
                        newArr.push(current)
                    } else {
                        if (current.r <= 0) {
                            current.r = 0
                            continue
                        }
                        current.x += Math.random() > 0.5 ? 1 : -1
                        current.y += Math.random() > 0.5 ? 1 : -1
                        current.r -= 0.05 * Math.random()
                        newArr.push(current)
                    }
                }
                newDataRef.current = newArr
                const ctx = canvasRef.current?.getContext('2d')
                if (ctx) {
                    ctx.clearRect(pos, 0, 800, 800)
                    newDataRef.current.forEach((t) => {
                        const { x: n, y: i, r: s, color } = t
                        if (n > pos) {
                            ctx.beginPath()
                            ctx.rect(n, i, s, s)
                            ctx.fillStyle = color
                            ctx.strokeStyle = color
                            ctx.stroke()
                        }
                    })
                }
                if (newDataRef.current.length > 0) {
                    animateFrame(pos - 8)
                } else {
                    setValue('')
                    setAnimating(false)
                }
            })
        }
        animateFrame(start)
    }, [])

    const vanishAndSubmit = useCallback(() => {
        setAnimating(true)
        draw()

        const currentValue = inputRef.current?.value || ''
        if (currentValue && inputRef.current) {
            const maxX = newDataRef.current.reduce(
                (prev, current) => (current.x > prev ? current.x : prev),
                0
            )
            animate(maxX)
        }
    }, [animate, draw])

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!animating && !isSubmitting) {
                setValue(e.target.value)
                if (onChange) {
                    onChange(e)
                }
            }
        },
        [animating, isSubmitting, onChange]
    )

    // Get register props if provided
    const registerProps = register
        ? register(name)
        : { onChange: undefined, ref: undefined, name: undefined }

    return (
        <div
            className={cn(
                'relative mx-auto h-12 w-full max-w-xl overflow-hidden rounded-full bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 dark:bg-zinc-800',
                value && 'bg-gray-50'
            )}
        >
            <canvas
                className={cn(
                    'pointer-events-none absolute top-[20%] left-2 origin-top-left scale-50 transform pr-20 text-base invert filter sm:left-8 dark:invert-0',
                    !animating ? 'opacity-0' : 'opacity-100'
                )}
                ref={canvasRef}
            />
            <input
                {...registerProps}
                {...inputProps}
                onChange={(e) => {
                    handleInputChange(e)
                    if (registerProps.onChange) {
                        registerProps.onChange(e)
                    }
                }}
                ref={(e) => {
                    inputRef.current = e
                    if (registerProps.ref) {
                        registerProps.ref(e)
                    }
                }}
                value={value}
                type="email"
                className={cn(
                    'relative z-50 h-full w-full rounded-full border-none bg-transparent pr-32 pl-4 text-sm text-black focus:ring-0 focus:outline-none sm:pl-10 sm:text-base dark:text-white',
                    animating && 'text-transparent dark:text-transparent'
                )}
                disabled={isSubmitting}
                autoComplete="email"
            />

            <button
                disabled={!isFormValid || isSubmitting}
                type="submit"
                onClick={(e) => {
                    if (!isSubmitting && isFormValid) {
                        vanishAndSubmit()
                    } else {
                        e.preventDefault()
                    }
                }}
                className={cn(
                    'absolute top-1/2 right-2 z-50 flex h-8 -translate-y-1/2 items-center gap-2 rounded-full px-4 text-sm font-medium transition-all duration-200',
                    'bg-gray-900 text-white hover:bg-gray-800',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    {
                        'bg-gray-700': isSubmitting,
                    }
                )}
            >
                {isSubmitting ? (
                    <>
                        <span>Joining...</span>
                        <div className="h-3 w-3 animate-spin rounded-full border border-white !border-t-transparent" />
                    </>
                ) : (
                    'Join Waitlist'
                )}
            </button>

            <div className="pointer-events-none absolute inset-0 flex items-center rounded-full">
                <AnimatePresence mode="wait">
                    {!value && (
                        <motion.p
                            initial={{
                                y: 5,
                                opacity: 0,
                            }}
                            key={`current-placeholder-${currentPlaceholder}`}
                            animate={{
                                y: 0,
                                opacity: 1,
                            }}
                            exit={{
                                y: -15,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: 'linear',
                            }}
                            className="w-[calc(100%-8rem)] truncate pl-4 text-left text-sm font-normal text-neutral-500 sm:pl-12 sm:text-base dark:text-zinc-500"
                        >
                            {placeholders[currentPlaceholder]}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
