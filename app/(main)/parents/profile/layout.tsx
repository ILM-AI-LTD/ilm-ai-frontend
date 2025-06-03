'use client'

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"
import ParentsNavbar from "@/feature/parents/components/profile/common/Navbar"
import { BookOpen, Home, ReceiptText, Settings, UserPlus } from "lucide-react"

const projects = [
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
]

const ParentProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar projects={projects} />
      <SidebarInset>
        <ParentsNavbar />
        <div className="flex flex-1 flex-col bg-primary-bg-color gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default ParentProfileLayout