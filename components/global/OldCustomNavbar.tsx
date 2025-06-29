import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown, SunDim, User } from 'lucide-react'
// import ButtonsWithBadge from './ButtonWithBadge'
import SwitchCustomizationDemo from '@/components/customized/switch/switch-07'
import { boards, countries } from '@/constants/Helpers'
import { usePaper } from '@/context/PaperContext'
import { BoardResponse, CountryResponse } from '@/types/student'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ThemeToggleButton from '../customized/button/button-16'
import CustomLogo from './CustomLogo'
// import { Switch } from '@/components/ui/switch'

interface Props {
    role: string;
}
const CustomNavbar = ({ role }: Props) => {
    const { subject } = useParams();

    const [board, setBoard] = useState<BoardResponse | null>(null);
    const [country, setCountry] = useState<CountryResponse | null>(null);
    const [user, setUser] = useState<any | null>(null);
    const { selectedPaper } = usePaper();

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
        <nav className='h-24  bg-background flex items-center justify-between z-10 px-6'>
            {/* <SidebarTrigger className="-ml-1" /> */}
            <div>
                <div className='lg:hidden'>
                    <CustomLogo
                        logoSrc="/ILM_AI_Logo_deep_blue.png"

                    />
                </div>
            </div>

            <div className="flex flex-row gap-6">
                {/* <CustomDropdown title={'Board'} menuOptions={menuOptions} /> */}

                {role === 'student' && (
                    <div className='flex items-center gap-6 border px-3 border-[#3A3A3A] rounded-full'>

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
                                className=" bg-background border rounded shadow-md p-2"
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
                                className=" bg-background border rounded shadow-md p-2"
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
                        {subject && (<div className='text-button-color text-xl font-bold'>
                            {selectedPaper === "paper1" ? "Paper 1" : "Paper 2"}
                        </div>)}

                    </div>
                )}

                <div className=' flex items-center gap-8 border p-3 border-[#3A3A3A] rounded-full'>
                    <ThemeToggleButton />
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