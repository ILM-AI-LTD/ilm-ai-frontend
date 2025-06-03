import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarTrigger, StudentSidebarTrigger } from '@/components/ui/sidebar'
import { Bolt, ChevronDown, ChevronsUpDown, ExternalLink, Filter, LogOut, Settings2, SunDim, User } from 'lucide-react'
// import ButtonsWithBadge from './ButtonWithBadge'
import CustomDropdown from '@/components/global/CustomDropdown'
import { menuOptions, countries, boards } from '@/constants/Helpers'
import { BoardResponse, CountryResponse } from '@/types/student'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Switch } from '@radix-ui/react-switch'
import SwitchCustomizationDemo from '@/components/customized/switch/switch-07'
// import { Switch } from '@/components/ui/switch'

interface Props {
    role: string;
}
const CustomNavbar = ({ role }: Props) => {
    const [board, setBoard] = useState<BoardResponse | null>(null);
    const [country, setCountry] = useState<CountryResponse | null>(null);
    const [user, setUser] = useState<any | null>(null);
    // const country: CountryResponse | null = localStorage.getItem('selectedCountry');
    // const board = localStorage.getItem('selectedBoard');
    // console.log('c --', country, 'b----', board);
    // const [selectedOption, setSelectedOption] = useState(`Select ${title}`);

    const handleSelectCountry = (value: CountryResponse) => {
        setCountry(value);
        localStorage.setItem('selectedCountry', JSON.stringify(value));
    };

    const handleSelectBoard = (value: BoardResponse) => {
        setBoard(value);
        localStorage.setItem('selectedBoard', JSON.stringify(value));
    };


    useEffect(() => {
        const savedCountry = localStorage.getItem('selectedCountry');
        if (savedCountry) {
            try {
                setCountry(JSON.parse(savedCountry));
            } catch (e) {
                console.error('Failed to parse saved Country', e);
            }
        }
        const savedBoard = localStorage.getItem('selectedBoard');
        if (savedBoard) {
            try {
                setBoard(JSON.parse(savedBoard));
            } catch (e) {
                console.error('Failed to parse saved Board', e);
            }
        }
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error('Failed to parse saved user', e);
            }
        }
    }, []);
    return (
        <nav className='h-24 bg-primary-bg-color flex items-center justify-between z-10 px-6'>
            <SidebarTrigger className="-ml-1" />
            <div className="flex flex-row gap-6">
                {/* <CustomDropdown title={'Board'} menuOptions={menuOptions} /> */}
                {role === 'student' && (
                    <div className='flex items-center gap-6 border px-3 border-blue-50 rounded-full'>
                        <DropdownMenu>
                            {/* <Avatar>
                            <AvatarImage src={`${country?.image}`} />
                        </Avatar> */}
                            <DropdownMenuTrigger className="flex items-center gap-3">
                                <Image
                                    src={country?.image || ''}
                                    width={30}
                                    height={30}
                                    alt="ILM Logo"
                                    className=' rounded-full object-cover w-[30px] h-[30px]'
                                />
                                <ChevronDown />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                // sideOffset={5}
                                className="bg-primary-bg-color border rounded shadow-md p-2"
                            >
                                {countries.map((option, index) => (
                                    <DropdownMenuItem
                                        key={index}
                                        onSelect={() => handleSelectCountry(option)}
                                        className="px-4 py-2 hover:bg-gray-100 hover:text-black  cursor-pointer text-white"
                                    >
                                        {/* <Avatar>
                                        <AvatarImage src={`${option?.image}`} />
                                    </Avatar> */}
                                        <Image
                                            src={`${option?.image}`}
                                            width={30}
                                            height={30}
                                            alt="ILM Logo"
                                            className=' rounded-full object-cover w-[30px] h-[30px]'
                                        />
                                        {option?.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-3">
                                {/* <p className="text-sm font-medium">{board?.name}</p> */}
                                {board?.name}
                                <ChevronDown />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                // sideOffset={5}
                                className="bg-primary-bg-color border rounded shadow-md p-2"
                            >
                                {boards.map((option, index) => (
                                    <DropdownMenuItem
                                        key={index}
                                        onSelect={() => handleSelectBoard(option)}
                                        className="px-4 py-2 hover:bg-gray-100 hover:text-black  cursor-pointer text-white"
                                    >
                                        {/* <p className="text-sm font-medium">{option?.name}</p> */}
                                        {option?.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>


                    </div>
                )}

                <div className=' flex items-center gap-8 border p-3 border-blue-50 rounded-full'>
                    <SwitchCustomizationDemo />
                    <div className=' justify-center'>
                        <div className="flex items-center gap-1">
                            <SunDim />
                            <p>Good Morning</p>
                        </div>
                        <p>{user?.name}</p>
                    </div>
                    <User />
                </div>

            </div>
        </nav>
    )
}

export default CustomNavbar