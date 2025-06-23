"use client";

import AppSidebar from "@/components/app-sidebar";
import CustomNavbar from "@/components/global/CustomNavbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PaperProvider } from "@/context/PaperContext";
// import ParentsNavbar from "@/feature/parents/components/profile/common/Navbar"
// import StudentsNavbar from "@/feature/students/home/component/Navbar"
import { BookOpen, Home, ReceiptText, Settings, UserPlus } from "lucide-react";

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
];

const ParentProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <PaperProvider>
        <AppSidebar projects={projects} role={"parent"} />
        <SidebarInset>
          <CustomNavbar role={"parent"} />
          <div className="flex flex-1 flex-col bg-primary-bg-color gap-4 p-4">
            {children}
          </div>
        </SidebarInset>
      </PaperProvider>
    </SidebarProvider>
  );
};

export default ParentProfileLayout;
