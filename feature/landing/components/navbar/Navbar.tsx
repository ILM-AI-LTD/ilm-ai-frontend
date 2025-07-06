import ThemeToggleButton from "@/components/customized/button/button-16";
import CustomButton from "@/components/global/CustomButton";
import CustomLogo from "@/components/global/CustomLogo";
import { LogIn } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-24 flex items-center justify-between  bg-background z-10 px-6 md:px-10 2xl:px-[135px]">
      <div className="flex flex-row gap-2 items-center">
        <CustomLogo logoSrc="/ilmino.svg" />
        {/* <h1 className="font-bold text-[32px] text-white ">ILM AI</h1> */}
      </div>
      <div className="flex font-bold  gap-4 text-foreground">
        <h1>Home</h1>
        <h1>Features</h1>
        <h1>How it Works</h1>
        <h1>About Us</h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggleButton />
        <Link href="/auth/sign-in">
          {/* <CustomButton
            label="Login"
            className="bg-primary-color text-brand-color font-bold text-base rounded-full hover:bg-[#007AAC] hover:border-[#007AAC] hover:text-white transition-all duration-300 ease-in-out border-1 border-brand-color h-[52px] cursor-pointer"
            icon={<LogIn />}
          /> */}
          <CustomButton
            label="Login"
            className="bg-gradient-to-t from-[#004D6C] to-[#006C98] shadow-[0px_6px_0px_0px_#006C98] text-brand-color font-bold text-base rounded-full hover:bg-[#007AAC] hover:border-[#007AAC] hover:text-white transition-all duration-300 ease-in-out border-1 border-brand-color h-[52px] cursor-pointer"
            icon={<LogIn />}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
