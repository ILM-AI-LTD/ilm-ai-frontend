"use client"

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  PieChart,
  ReceiptText,
  Search,
  Settings,
  Settings2,
  SquareTerminal,
  UserPlus,
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import CustomLogo from "./global/CustomLogo"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },


  projects: [
    {
      name: "Dashboard",
      url: "#",
      icon: Home,
    },
    {
      name: "Upcoming Classes",
      url: "#",
      icon: BookOpen,
    },
    {
      name: "Add Child",
      url: "#",
      icon: UserPlus,
    },
    {
      name: "Billing",
      url: "#",
      icon: ReceiptText,
    },
    {
      name: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const {open} = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div className="inline-flex gap-2 items-center mx-auto mt-3">
          <CustomLogo
            logoSrc="/ILM_AI_Logo_gold.svg"

          />
          {open && (
            <p className="animate-fade-slide-in font-bold text-[min(10vw,32px)]">
              ILM AI
            </p>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  )
}
