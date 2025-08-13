"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@/components/app-sidebar";
import CustomNavbar from "@/components/global/CustomNavbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { studentSideMenu } from "@/constants/Helpers";
import { PaperProvider } from "@/context/PaperContext";

const SubjectLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isSlugPage = /\/subjects\/[^\/]+\/[^\/]+\/[^\/]+$/.test(pathname || "");

  if (isSlugPage) {
    return <PaperProvider>{children}</PaperProvider>;
  }

  return (
    <SidebarProvider>
      <PaperProvider>
        <AppSidebar projects={studentSideMenu} role={"student"} />
        <SidebarInset>
          <div className="sticky top-0 z-50">
            <CustomNavbar role={"student"} />
          </div>
          <div className="flex flex-1 flex-col items-center bg-background gap-4 px-6 md:px-10 py-4">
            {children}
          </div>
        </SidebarInset>
      </PaperProvider>
    </SidebarProvider>
  );
};

export default SubjectLayout;
