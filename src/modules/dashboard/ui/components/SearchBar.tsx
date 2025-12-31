import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
}

export const SearchBar = ({
    placeholder = 'Search by short link or URL',
    value,
    onChange,
}: SearchBarProps) => {
    return (
        <div className="relative max-w-md flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="bg-background border-border pl-10"
            />
        </div>
    )
}
