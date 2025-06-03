import CustomLogo from "@/components/global/CustomLogo";

const Navbar = () => {
    return (
        <nav className='h-24 border-b-1 border-button-hover-color flex items-center justify-between bg-primary-bg-color z-10 px-6 md:px-10 2xl:px-[135px]'>
            <div className="flex flex-row gap-2 items-center">
                <CustomLogo logoSrc="/ILM_AI_Logo_deep_blue.png" />
                {/* <h1 className="font-bold text-[32px] text-white ">ILM AI</h1> */}
            </div>
        </nav>
    )
}

export default Navbar;