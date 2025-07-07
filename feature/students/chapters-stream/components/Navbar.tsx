"use client"

import ThemeToggleButton from "@/components/customized/button/ThemeToggleButton";
import CustomLogo from "@/components/global/CustomLogo";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {

    const router = useRouter();

    return (
        <nav className='h-24 flex items-center justify-between  bg-secondary z-10 px-6'>
            <div className="flex flex-row gap-2 items-center justify-between w-full">
                <CustomLogo logoSrc="/ilmino.svg" />
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