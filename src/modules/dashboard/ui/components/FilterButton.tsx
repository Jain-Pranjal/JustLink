import { Filter, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FilterButtonProps {
    label?: string
    onClick?: () => void
}

export const FilterButton = ({
    label = 'Filter',
    onClick,
}: FilterButtonProps) => {
    return (
        <Button variant="outline" className="gap-2" onClick={onClick}>
            <Filter className="h-4 w-4" />
            {label}
            <ChevronDown className="h-4 w-4" />
        </Button>
    )
}
