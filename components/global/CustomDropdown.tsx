'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';

interface Props {
    title: string;
    menuOptions: string[]
}
const CustomDropdown: React.FC<Props> = ({ title, menuOptions }) => {
    const [selectedOption, setSelectedOption] = useState(`Select ${title}`);

    const handleSelect = (value: string) => {
        setSelectedOption(value);
    };

    // const router = useRouter();
    // const searchParams = useSearchParams();
    // const current = searchParams.get('view') || 'parent';
    // const handleSelect = (value: string) => {
    //     const newParams = new URLSearchParams(searchParams);
    //     newParams.set('view', value);
    //     router.push(`?${newParams.toString()}`);
    // };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="px-4 py-2  rounded cursor-pointer">
                {selectedOption}
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
                sideOffset={5}
                className=" bg-background border rounded shadow-md p-2"
            >
                {menuOptions.map(option => (
                    <DropdownMenu.Item
                        key={option}
                        onSelect={() => handleSelect(option)}
                        className="px-4 py-2 hover:bg-gray-100 hover:text-black  cursor-pointer text-white"
                    >
                        {option}
                    </DropdownMenu.Item>
                ))}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}

export default CustomDropdown;