"use client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface FilterProps {
    filters: {
        name: string,
        value: string
    }[],
    otherClasses: string,
    containerClasses: string
}
const Filter = ({
    filters,
    otherClasses,
    containerClasses
}: FilterProps) => {
    return (
        <div className={` relative ${containerClasses}`}>
            <Select>
                <SelectTrigger className={`${otherClasses} bg-input border px-5 py-2.5`}>
                    <div className=" line-clamp-1 flex-1 text-left">
                        <SelectValue placeholder="Filters" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {filters.map((item) => {
                            return (
                                <SelectItem key={item.value} value={item.value}>{item.name}</SelectItem>
                            )
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default Filter