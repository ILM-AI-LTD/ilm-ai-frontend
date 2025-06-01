'use client';

import { StudentAppSidebar } from "@/components/student-app-sidebar"
import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar"
import StudentsNavbar from "@/feature/students/componets/dashboard/common/Navbar"

const ParentProfileLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <SidebarProvider>
            <StudentAppSidebar />
            <SidebarInset>
                <StudentsNavbar />
                <div className="flex flex-1 flex-col bg-primary-bg-color gap-4 p-4" >
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default ParentProfileLayout