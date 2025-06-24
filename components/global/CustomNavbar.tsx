import { SidebarTrigger, StudentSidebarTrigger } from '@/components/ui/sidebar'

import { BoardResponse, CountryResponse } from '@/types/student'
import { useEffect, useState } from 'react'

import CustomLogo from './CustomLogo'
import ThemeToggleButton from '../customized/button/button-16'
import ComplexDropdownMenu from '../customized/dropdown-menu/dropdown-menu-07'

interface Props {
    role: string;
}
const CustomNavbar = ({ role }: Props) => {

    // const [board, setBoard] = useState<BoardResponse | null>(null);
    // const [country, setCountry] = useState<CountryResponse | null>(null);
    // const [user, setUser] = useState<any | null>(null);
    // // const { selectedPaper } = usePaper();

    // const handleSelectCountry = (value: CountryResponse) => {
    //     setCountry(value);
    //     localStorage.setItem('selectedCountry', JSON.stringify(value));
    // };

    // const handleSelectBoard = (value: BoardResponse) => {
    //     setBoard(value);
    //     localStorage.setItem('selectedBoard', JSON.stringify(value));
    // };

    // useEffect(() => {
    //     const savedCountry = localStorage.getItem('selectedCountry');
    //     if (savedCountry) {
    //         try {
    //             setCountry(JSON.parse(savedCountry));
    //         } catch (e) {
    //             console.error('Failed to parse saved Country', e);
    //         }
    //     }
    //     const savedBoard = localStorage.getItem('selectedBoard');
    //     if (savedBoard) {
    //         try {
    //             setBoard(JSON.parse(savedBoard));
    //         } catch (e) {
    //             console.error('Failed to parse saved Board', e);
    //         }
    //     }
    //     const savedUser = localStorage.getItem('currentUser');
    //     if (savedUser) {
    //         try {
    //             setUser(JSON.parse(savedUser));
    //         } catch (e) {
    //             console.error('Failed to parse saved user', e);
    //         }
    //     }
    // }, []);

    return (
        <nav className='h-24 bg-primary-bg-color flex items-center justify-between z-10 px-6'>
            {/* <SidebarTrigger className="-ml-1" /> */}
            <div>
                <div className='lg:hidden'>
                    <CustomLogo
                        logoSrc="/ILM_AI_Logo_deep_blue.png"

                    />
                </div>
                <div className='hidden lg:block'>
                    <SidebarTrigger className="" />
                </div>
            </div>

            <div className="flex flex-row lg:gap-6 gap-4 lg:pr-5 items-center">
                <ThemeToggleButton />
                <div className='lg:hidden'>
                    <SidebarTrigger className="" />
                </div>
                <div className="hidden lg:block">
                    <ComplexDropdownMenu
                        // user={user}
                        // country={country}
                        // setCountry={handleSelectCountry}
                        // board={board}
                        // setBoard={handleSelectBoard}
                        role={role}
                    />
                </div>

            </div>
        </nav>
    )
}

export default CustomNavbar