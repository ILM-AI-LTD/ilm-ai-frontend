"use client"

import {
  type LucideIcon
} from "lucide-react"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { usePathname } from "next/navigation"
import React, { useState } from "react"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon | string
  }[]
}) {
  const { isMobile } = useSidebar()
  const pathname = usePathname();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  console.log('selectedIndex ------------', selectedIndex);


  return (
    <SidebarGroup className="mt-4">
      {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
      <SidebarMenu>
        {projects.map((item, index: number) => (
          <React.Fragment key={item.name}>
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton tooltip={item.name} asChild onClick={() => setSelectedIndex(index)} className={cn("hover:bg-primary/80 hover:text-foreground mb-2 rounded-lg p-4 h-12 text-base font-semibold", selectedIndex === index ? "bg-primary text-foreground" : "")}>
                <a href={item.url}>
                  {typeof item.icon === "string" ?
                    <Image
                      src={item.icon}
                      height={24}
                      width={24}
                      alt="ILMI Assistant"
                    /> :
                    <item.icon />
                  }
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
              {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            </SidebarMenuItem>
            {index === projects.length - 2 && (
              <hr className="my-2 mx-1 border-button-color" />

            )}
          </React.Fragment>
        ))}
        {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export function NavProjectStudents({
  projects,
}: {
  projects: {
    name: string
    url: string
    // icon: LucideIcon | string
    icon: string
  }[]
}) {
  // const { isMobile } = useSidebar()
  const { open, state, isMobile } = useSidebar()
  const isExpanded = open && state !== "collapsed" && !isMobile

  return (
    <SidebarGroup className="mt-4">
      {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
      <SidebarMenu className="border border-['#cdd3ec'] rounded-lg">
        {projects.map((item) => (
          <SidebarMenuItem key={item.name} className={isExpanded ? "lg:px-5 lg:pt-5" : ""}>
            <SidebarMenuButton tooltip={item.name} asChild className="hover:bg-[#005E83] hover:text-white mb-2 rounded-lg p-4 h-12 text-base font-semibold">
              <a href={item.url}>
                {/* <item.icon /> */}
                <Image
                  src={item.icon}
                  height={24}
                  width={24}
                  alt="ILMI Assistant"
                />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </SidebarMenuItem>
        ))}
        {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  )
}
