import CustomButton from "@/components/global/CustomButton";
import CustomLogo from "@/components/global/CustomLogo";
import { LogIn } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className='h-24 border-b-1 border-border-color flex items-center justify-between bg-primary-bg-color z-10 px-6 md:px-10 2xl:px-[135px]'>
            <div className="flex flex-row gap-2 items-center">
                <CustomLogo />
                <h1 className="font-bold text-[32px] text-white ">ILM AI</h1>
            </div>

            <Link href="/auth/sign-in">
                <CustomButton
                    label="Login"
                    className="bg-primary-color text-brand-color font-bold text-base rounded-full hover:bg-primary-color-hover hover:text-brand-color transition-all duration-300 ease-in-out border-1 border-brand-color h-[52px] cursor-pointer"
                    icon={<LogIn color="#19BDFF" />}
                />
            </Link>
        </nav>
    )
}

export default Navbar;