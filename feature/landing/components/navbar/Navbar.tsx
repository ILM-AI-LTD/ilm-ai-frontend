"use client";
import CustomButton from "@/components/global/CustomButton";
import CustomLogo from "@/components/global/CustomLogo";
import { LogIn, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AlignRight } from "lucide-react";
import ThemeToggleButton from "@/components/customized/button/ThemeToggleButton";

{
  /* <div className="flex flex-row lg:gap-6 gap-4 items-center">
                <ThemeToggleButton />
                <div className='lg:hidden'>
                    <SidebarTrigger className="" />
                </div>
                <div className="hidden lg:block">
                    <ComplexDropdownMenu role={role} />
                </div>

            </div> */
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // <nav className="h-24 flex items-center justify-between bg-background z-10 px-6 md:px-10 2xl:px-[135px]">
    <nav className="h-24 bg-background z-10 px-6 md:px-10 2xl:px-[135px]">
      <div className="max-w-[1170px] mx-auto w-full h-full flex items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <Link href="/">
            <CustomLogo logoSrc="/ilmino.svg" />
          </Link>
          {/* <h1 className="font-bold text-[32px] text-white ">ILM AI</h1> */}
        </div>

        {/* <div className="flex font-bold  gap-4 text-foreground">
          <h1>Home</h1>
          <h1>Features</h1>
          <h1>How it Works</h1>
          <h1>About Us</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggleButton />
          <Link href="/auth/sign-in">
            <CustomButton
              label="Login"
              className="bg-gradient-to-t from-[#004D6C] to-[#006C98] shadow-[0px_6px_0px_0px_#006C98] text-brand-color font-bold text-base rounded-full hover:bg-[#007AAC] hover:border-[#007AAC] hover:text-white transition-all duration-300 ease-in-out border-1 border-brand-color h-[52px] cursor-pointer"
              icon={<LogIn />}
            />
          </Link>
        </div> */}
        {/* Desktop Menu */}
        <div className="hidden lg:flex font-normal gap-6 text-foreground items-center">
          <h1 className="text-[#006C98] font-bold">Home</h1>
          <h1>Features</h1>
          <h1>How it Works</h1>
          <h1>About Us</h1>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggleButton size="lg" />
          <Link href="/auth/sign-in">
            <CustomButton
              label="Login"
              className=" font-bold text-base rounded-full hover:text-white transition-all duration-300 ease-in-out h-[48px] w-[155px] cursor-pointer"
              icon={<LogIn />}
            />
          </Link>
        </div>

        {/* Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggleButton />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="w-6 h-6 text-black dark:text-white" />
            ) : (
              <AlignRight className="w-6 h-6  text-black dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-background shadow-md px-6 py-4 absolute top-24 right-0 w-full z-20">
          <div className="flex flex-col gap-4 font-normal text-foreground items-center">
            <h1 className="text-[#006C98] font-bold">Home</h1>
            <h1>Features</h1>
            <h1>How it Works</h1>
            <h1>About Us</h1>
            <Link href="/auth/sign-in">
              <CustomButton
                label="Login"
                className="mt-2 font-bold text-base rounded-full 
                hover:text-white transition-all duration-300 ease-in-out h-[48px] max-w-[350px] cursor-pointer"
                icon={<LogIn />}
              />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
