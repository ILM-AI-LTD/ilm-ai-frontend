import { Dot } from "lucide-react"

export function TypingIndicator() {
    return (
        <div className="justify-left flex space-x-1">
            <div className="rounded-lg bg-secondary p-3">
                <div className="flex -space-x-2.5">
                    <Dot className="h-5 w-5 animate-typing-dot-bounce text-muted-foreground" />
                    <Dot className="h-5 w-5 animate-typing-dot-bounce [animation-delay:90ms] text-muted-foreground" />
                    <Dot className="h-5 w-5 animate-typing-dot-bounce [animation-delay:180ms] text-muted-foreground" />
                </div>
            </div>
        </div>
    )
}
