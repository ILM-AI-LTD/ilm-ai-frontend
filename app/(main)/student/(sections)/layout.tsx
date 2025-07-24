'use client';

import AppSidebar from "@/components/app-sidebar";
import CustomNavbar from "@/components/global/CustomNavbar";
import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar";
import { studentSideMenu } from "@/constants/Helpers";
import { PaperProvider } from "@/context/PaperContext";

const ParentProfileLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <SidebarProvider>
            <PaperProvider>
                <AppSidebar projects={studentSideMenu} role={'student'} />
                <SidebarInset>
                    <CustomNavbar role={'student'} />
                    <div className="flex flex-1 flex-col bg-background gap-4 px-10 py-4">
                        {children}
                    </div>
                </SidebarInset>
            </PaperProvider>
        </SidebarProvider>
    )
}

export default ParentProfileLayout