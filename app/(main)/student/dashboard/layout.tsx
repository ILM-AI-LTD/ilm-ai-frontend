'use client';

import { AppSidebar } from "@/components/app-sidebar";
import CustomNavbar from "@/components/global/CustomNavbar";
import { StudentAppSidebar } from "@/components/student-app-sidebar"
import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar"
import { studentSideMenu } from "@/constants/Helpers";
import { PaperProvider } from "@/context/PaperContext";
import ParentsNavbar from "@/feature/parents/components/profile/common/Navbar";
import StudentsNavbar from "@/feature/students/home/component/Navbar"

const ParentProfileLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <SidebarProvider>
            {/* <StudentAppSidebar />
            <SidebarInset>
                <StudentsNavbar />
                <div className="flex flex-1 flex-col bg-primary-bg-color gap-4 p-4" >
                    {children}
                </div>
            </SidebarInset> */}
            <PaperProvider>
                <AppSidebar projects={studentSideMenu} />
                <SidebarInset>
                    <CustomNavbar role={'student'} />
                    <div className="flex flex-1 flex-col bg-primary-bg-color gap-4 p-4">
                        {children}
                    </div>
                </SidebarInset>
            </PaperProvider>
        </SidebarProvider>
    )
}

export default ParentProfileLayout