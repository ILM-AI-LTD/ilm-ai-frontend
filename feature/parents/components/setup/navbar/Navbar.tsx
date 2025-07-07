import ThemeToggleButton from "@/components/customized/button/ThemeToggleButton";
import CustomLogo from "@/components/global/CustomLogo";

const Navbar = () => {
    return (
        <nav className='h-24 flex items-center justify-between  bg-secondary z-10 px-6 md:px-10 2xl:px-[135px]'>
            <div className="flex flex-row gap-2 items-center w-full justify-between">
                <CustomLogo logoSrc="/ilmino.svg" />
                <ThemeToggleButton />
            </div>
        </nav>
    )
}

export default Navbar;