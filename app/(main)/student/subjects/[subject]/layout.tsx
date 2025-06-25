'use client';

import AppSidebar from "@/components/app-sidebar";
import CustomNavbar from "@/components/global/CustomNavbar";
import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar"
import { studentSideMenu } from "@/constants/Helpers";
import { PaperProvider } from "@/context/PaperContext";

const SubjectLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <SidebarProvider>
            <PaperProvider>
                <AppSidebar projects={studentSideMenu} role={'student'} />
                <SidebarInset>
                    <div className="sticky top-0 z-50">
                        <CustomNavbar role={'student'} />
                    </div>
                    <div className="flex flex-1 flex-col bg-primary-bg-color gap-4 p-4">
                        {children}
                    </div>
                </SidebarInset>
            </PaperProvider>
        </SidebarProvider>
    )
}

export default SubjectLayout

//TODO refactor sidebar components