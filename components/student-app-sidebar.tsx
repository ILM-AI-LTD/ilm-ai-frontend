"use client";

import {
  BookOpen,
  Home,
  ReceiptText,
  Search,
  Settings,
  UserPlus,
} from "lucide-react";
import * as React from "react";

// import { NavMain } from "@/components/nav-main"
// import { NavProjects, NavProjectStudents } from "@/components/nav-projects"
// import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarRail,
  // StudentSidebar,
  // useSidebar,
} from "@/components/ui/sidebar";
import CustomLogo from "./global/CustomLogo";
import { NavProjectStudents } from "./nav-projects";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  // teams: [
  //   {
  //     name: "Acme Inc",
  //     logo: GalleryVerticalEnd,
  //     plan: "Enterprise",
  //   },
  //   {
  //     name: "Acme Corp.",
  //     logo: AudioWaveform,
  //     plan: "Startup",
  //   },
  //   {
  //     name: "Evil Corp.",
  //     logo: Command,
  //     plan: "Free",
  //   },
  // ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Discover",
      url: "#",
      icon: Search,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Upcoming Classes",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Add Child",
      url: "#",
      icon: UserPlus,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Billing",
      url: "#",
      icon: ReceiptText,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Start Learning",
      url: "#",
      icon: "/SidebarMenuIcon/Start_learning_logo.svg",
    },
    {
      name: "Submit Work",
      url: "#",
      icon: "/SidebarMenuIcon/Submit_logo.svg",
    },
    {
      name: "Practise & Test",
      url: "#",
      icon: "/SidebarMenuIcon/Practise_logo.svg",
    },
    {
      name: "Questions",
      url: "/student/questions",
      icon: "/SidebarMenuIcon/Practise_logo.svg",
    },
    {
      name: "ILM Hub",
      url: "#",
      icon: "/SidebarMenuIcon/ILM_hub_logo.svg",
    },
    {
      name: "Leaderboard",
      url: "#",
      icon: "/SidebarMenuIcon/Leaderboard_logo.svg",
    },
    {
      name: "Progress",
      url: "#",
      icon: "/SidebarMenuIcon/Progress_logo.svg",
    },
    {
      name: "Resume",
      url: "#",
      icon: "/SidebarMenuIcon/Resume_logo.svg",
    },
    {
      name: "Settings",
      url: "#",
      icon: "/SidebarMenuIcon/Setting_logo.svg",
    },
  ],
};

export function StudentAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <StudentAppSidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="px-3">
          <CustomLogo logoSrc="/ILM_AI_Logo_deep_blue.png" />
          {/* {open && (
            <p className="animate-fade-slide-in font-bold text-[min(10vw,32px)]">
              ILM AI
            </p>
          )} */}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavProjectStudents projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </StudentAppSidebar>
  );
}
