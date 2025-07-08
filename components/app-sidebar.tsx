"use client";

import {
  type LucideIcon
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader, useSidebar
} from "@/components/ui/sidebar";
import CustomLogo from "./global/CustomLogo";
import ComplexDropdownMenu from "./customized/dropdown-menu/dropdown-menu-07";


interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon | string;
  }[];
  role: string;
}

const AppSidebar = ({ ...props }: AppSidebarProps) => {
  const { open } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader className="mx-2 my-6">
        <CustomLogo logoSrc="/ilmino.svg" />
      </SidebarHeader>

      <SidebarContent className="px-2">
        <NavProjects projects={props.projects} />
      </SidebarContent>
      <SidebarFooter>
        <div className="lg:hidden">
          <ComplexDropdownMenu role={props.role} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
