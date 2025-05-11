import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Bolt, ChevronsUpDown, ExternalLink, Filter, LogIn, LogOut, Rocket, Settings2, User } from 'lucide-react'
import ButtonsWithBadge from './ButtonWithBadge'

const ParentsNavbar = () => {
    return (
        <nav className='h-24 bg-secondary-bg-color flex items-center justify-between z-10 px-6'>
            <SidebarTrigger className="-ml-1" />

            <div className="flex flex-row gap-4">

                <ButtonsWithBadge />


                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="text-start flex flex-row items-center">
                            <p className="text-sm font-medium">Parents Name</p>
                            <ChevronsUpDown className="ml-6 h-4 w-4 text-muted-foreground" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-2 w-72 bg-primary-bg-color text-white">
                        <DropdownMenuItem className="py-3">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="ml-1 flex flex-col">
                                <p className="text-sm font-medium">Parents Name</p>
                                <p className="text-xs text-muted-foreground">
                                    parent.email@gmail.com
                                </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-1" /> Invite people
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Settings2 className="mr-1" /> Preferences
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <Filter className="mr-1" />
                                Filter sidebar
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Activity</DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuCheckboxItem checked>
                                            All activity
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Unread messaged only
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Mentions only
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Customize by section
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>People</DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuCheckboxItem checked>
                                            Everyone
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Without external people
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Including external people
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <Bolt className="mr-1" />
                                Tools & settings
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className="w-52">
                                <DropdownMenuLabel>Tools</DropdownMenuLabel>
                                <DropdownMenuItem>Customize workspace</DropdownMenuItem>
                                <DropdownMenuItem>Workspace builder</DropdownMenuItem>
                                <DropdownMenuItem>
                                    Workspace analytics <ExternalLink className="ml-auto" />
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Administration</DropdownMenuLabel>
                                <DropdownMenuItem>Manage apps</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="mr-1" /> Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}

export default ParentsNavbar