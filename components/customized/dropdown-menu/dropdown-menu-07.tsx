import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { boards, countries } from "@/constants/Helpers";
import { BoardResponse, CountryResponse } from "@/types/student";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  LogOut,
  Settings,
  User,
  ChevronDown,
  Globe,
  LayoutDashboard
} from "lucide-react";
import Image from "next/image";

interface Props {
  user: any;
  country: CountryResponse | null;
  setCountry: (value: CountryResponse) => void;
  board: BoardResponse | null;
  setBoard: (value: BoardResponse) => void;
  role: string;
}

const ComplexDropdownMenu = ({ user, country, setCountry, board, setBoard, role }: Props) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            MW
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          <div className="text-start flex flex-col">
            <p className="text-md font-semibold">{user?.name}</p>
            <p className="text-sm text-[#858D9D] font-medium">myworkspace.slack.com</p>
          </div>
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-56 bg-profile-dropdown-card border-card-border-color text-white">
        <DropdownMenuItem className="py-3">
          <p className="font-semibold">My Account</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="group hover:text-black cursor-pointer">
          <User className="mr-1 text-white group-hover:text-black" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center group hover:text-black cursor-pointer">
          <Settings className="mr-1 text-white group-hover:text-black" />Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {role === 'student' && (
          <>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center ">
                <Globe className="mr-2" size={16} />
                Country
                {country && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-button-color text-white">
                    {country.initial}
                  </span>
                )}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-profile-dropdown-card border-card-border-color text-white">
                <DropdownMenuSub>
                  {countries.map((coun, index) => (
                    <DropdownMenuCheckboxItem key={index}
                      checked={country?.id === coun.id}
                      onCheckedChange={() => setCountry(coun)}>
                      <Image
                        src={coun?.image || ''}
                        width={16}
                        height={10}
                        alt="ILM Logo"
                        className=' rounded-xs object-cover w-[16px] h-[10px]'
                      />
                      {coun.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuSub>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center ">
                <LayoutDashboard className="mr-2" size={16} />
                Board
                {board && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-button-color text-white">
                    {board.name}
                  </span>
                )}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-profile-dropdown-card border-card-border-color text-white">
                <DropdownMenuSub>
                  {boards.map((b, index) => (
                    <DropdownMenuCheckboxItem key={index}
                      checked={board?.id === b.id}
                      onCheckedChange={() => setBoard(b)}>
                      {b.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuSub>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem className="group hover:text-black cursor-pointer">
          <LogOut className="mr-1 text-white group-hover:text-black" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  );
}

export default ComplexDropdownMenu;