"use client"

import AppSidebar from "@/components/app-sidebar";
import CustomNavbar from "@/components/global/CustomNavbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PaperProvider } from "@/context/PaperContext";
import { parentSideMenu } from "@/constants/Helpers";



const ParentsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <PaperProvider>
        <AppSidebar projects={parentSideMenu} role={"parent"} />
        <SidebarInset>
          <CustomNavbar role={"parent"} />
          <div className="flex flex-1 flex-col  bg-background gap-4 p-4">
            {children}
          </div>
        </SidebarInset>
      </PaperProvider>
    </SidebarProvider>
  );
};

export default ParentsLayout;
