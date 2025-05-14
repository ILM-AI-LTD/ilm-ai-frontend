
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Label } from "../ui/label"

type CustomSelectProps = {
    label: string;
    placeholder?: string
    options: { value: string; label: string }[]
    value: string
    onValueChange?: (value: string) => void
}

export function CustomSelect({ label, placeholder, options, value, onValueChange }: CustomSelectProps) {
    return (
        <div className="flex flex-col gap-2">
            <Label className="font-bold text-[min(10vw,16px)]">
                {label}
            </Label>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className="w-full bg-parent-inputField-color data-[size=default]:h-12">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-parent-inputField-color text-white">
                    <SelectGroup>
                        {options.map((option) => (
                            <SelectItem className="focus:bg-parent-chatbox-color focus:text-white" key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
