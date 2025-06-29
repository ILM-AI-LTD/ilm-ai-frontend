import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { boards, countries } from "@/constants/Helpers";
import { BoardResponse, CountryResponse } from "@/types/student";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  ChevronDown,
  ChevronsUpDown,
  Globe,
  LayoutDashboard,
  LogOut,
  Settings,
  User
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  role: string;
}

const ComplexDropdownMenu = ({ role }: Props) => {

  const [board, setBoard] = useState<BoardResponse | null>(null);
  const [country, setCountry] = useState<CountryResponse | null>(null);
  const [user, setUser] = useState<any | null>(null);

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
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            MW
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          <div className="text-start flex flex-col">
            <p className="text-md font-semibold text-secondary-foreground">{user?.name}</p>
            <p className="text-sm font-medium text-muted-foreground">myworkspace.slack.com</p>
          </div>
          <ChevronsUpDown className="text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-2 w-56">

        <DropdownMenuItem className="py-3">
          <p className="font-semibold">My Account</p>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-1" /> Profile
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-1" />Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {role === 'student' && (
          <>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center cursor-pointer">
                <Globe className="mr-2" size={16} />
                Country
                {country && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-primary text-primary-foreground">
                    {country.initial}
                  </span>
                )}
              </DropdownMenuSubTrigger>

              <DropdownMenuSubContent className="">
                <DropdownMenuSub>
                  {countries.map((coun, index) => (
                    <DropdownMenuCheckboxItem key={index}
                      checked={country?.id === coun.id}
                      onCheckedChange={() => handleSelectCountry(coun)} className="cursor-pointer">
                      <Image
                        src={coun?.image || ''}
                        width={16}
                        height={10}
                        alt="ILM Logo"
                        className='rounded-xs object-cover w-[16px] h-[10px]'
                      />
                      {coun.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuSub>
              </DropdownMenuSubContent>
            </DropdownMenuSub>


            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center cursor-pointer">
                <LayoutDashboard className="mr-2" size={16} />
                Board
                {board && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-primary text-primary-foreground">
                    {board.name}
                  </span>
                )}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="">
                <DropdownMenuSub>
                  {boards.map((b, index) => (
                    <DropdownMenuCheckboxItem key={index}
                      checked={board?.id === b.id}
                      onCheckedChange={() => handleSelectBoard(b)} className="cursor-pointer">
                      {b.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuSub>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem className="cursor-pointer">
          <LogOut className="mr-1" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  );
}

export default ComplexDropdownMenu;