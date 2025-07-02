import { SidebarTrigger } from '@/components/ui/sidebar';


import ThemeToggleButton from '../customized/button/button-16';
import ComplexDropdownMenu from '../customized/dropdown-menu/dropdown-menu-07';
import CustomLogo from './CustomLogo';

interface Props {
    role: string;
}
const CustomNavbar = ({ role }: Props) => {

    return (
        <nav className='h-24  bg-secondary flex items-center justify-between lg:justify-end z-10 px-6'>
            <div className='lg:hidden'>
                <CustomLogo
                    logoSrc="/ilmino.svg"
                />
            </div>

            <div className="flex flex-row lg:gap-6 gap-4 items-center">
                <ThemeToggleButton />
                <div className='lg:hidden'>
                    <SidebarTrigger className="" />
                </div>
                <div className="hidden lg:block">
                    <ComplexDropdownMenu role={role} />
                </div>

            </div>
        </nav>
    )
}

export default CustomNavbar