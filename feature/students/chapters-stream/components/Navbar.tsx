"use client"

import ThemeToggleButton from "@/components/customized/button/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {

    const router = useRouter();

    return (
        <nav className='fixed top-0 h-24 w-full flex items-center justify-between bg-background z-50 px-10'>
            <div className="flex flex-row gap-2 items-center justify-end w-full">
                <div className="inline-flex gap-4">
                    <ThemeToggleButton />
                    <Button
                        className="rounded-full bg-[#676767] cursor-pointer hover:bg-[#676767]"
                        size="icon"
                        onClick={() => router.back()}
                    >
                        <X className="size-4" />
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;