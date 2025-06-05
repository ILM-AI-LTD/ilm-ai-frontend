"use client"

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  type LucideIcon,
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
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   // teams: [
//   //   {
//   //     name: "Acme Inc",
//   //     logo: GalleryVerticalEnd,
//   //     plan: "Enterprise",
//   //   },
//   //   {
//   //     name: "Acme Corp.",
//   //     logo: AudioWaveform,
//   //     plan: "Startup",
//   //   },
//   //   {
//   //     name: "Evil Corp.",
//   //     logo: Command,
//   //     plan: "Free",
//   //   },
//   // ],
//   navMain: [
//     {
//       title: "Dashboard",
//       url: "#",
//       icon: Home,
//       isActive: true,
//       items: [
//         {
//           title: "History",
//           url: "#",
//         },
//         {
//           title: "Starred",
//           url: "#",
//         },
//         {
//           title: "Settings",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Discover",
//       url: "#",
//       icon: Search,
//       items: [
//         {
//           title: "Genesis",
//           url: "#",
//         },
//         {
//           title: "Explorer",
//           url: "#",
//         },
//         {
//           title: "Quantum",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Upcoming Classes",
//       url: "#",
//       icon: BookOpen,
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Add Child",
//       url: "#",
//       icon: UserPlus,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Billing",
//       url: "#",
//       icon: ReceiptText,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   projects: [
//     {
//       name: "Dashboard",
//       url: "#",
//       icon: Home,
//     },
//     {
//       name: "Upcoming Classes",
//       url: "#",
//       icon: BookOpen,
//     },
//     {
//       name: "Add Child",
//       url: "#",
//       icon: UserPlus,
//     },
//     {
//       name: "Billing",
//       url: "#",
//       icon: ReceiptText,
//     },
//     {
//       name: "Settings",
//       url: "#",
//       icon: Settings,
//     },
//   ],
// }

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon | string;
  }[];
}

export function AppSidebar({ ...props }: AppSidebarProps) {

  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props} className=" border-r border-card-border-color">
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div className="inline-flex gap-2 items-center mx-auto mt-3">
          <CustomLogo
            logoSrc="/ILM_AI_Logo_deep_blue.png"

          />
          {/* {open && (
            <p className="animate-fade-slide-in font-bold text-[min(10vw,32px)]">
              ILM AI
            </p>
          )} */}
        </div>
      </SidebarHeader>

      <SidebarContent >
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={props.projects} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  )
}
