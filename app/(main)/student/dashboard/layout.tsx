'use client';

import { AppSidebar } from "@/components/app-sidebar";
import { StudentAppSidebar } from "@/components/student-app-sidebar"
import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar"
import ParentsNavbar from "@/feature/parents/components/profile/common/Navbar";
import StudentsNavbar from "@/feature/students/componets/dashboard/common/Navbar"

export const projects = [
    {
        name: "Start Learning",
        url: "#",
        icon: '/StudentMenuIcon/Start_learning_logo.svg',
    },
    {
        name: "Submit Work",
        url: "#",
        icon: '/StudentMenuIcon/Submit_logo.svg',
    },
    {
        name: "Practise & Test",
        url: "#",
        icon: '/StudentMenuIcon/Practise_logo.svg',
    },
    {
        name: "ILM Hub",
        url: "#",
        icon: '/StudentMenuIcon/ILM_hub_logo.svg',
    },
    {
        name: "Leaderboard",
        url: "#",
        icon: '/StudentMenuIcon/Leaderboard_logo.svg',
    },
    {
        name: "Progress",
        url: "#",
        icon: '/StudentMenuIcon/Progress_logo.svg',
    },
    {
        name: "Resume",
        url: "#",
        icon: '/StudentMenuIcon/Resume_logo.svg',
    },
    {
        name: "Settings",
        url: "#",
        icon: '/StudentMenuIcon/Setting_logo.svg',
    },
]

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
            <AppSidebar projects={projects} />
            <SidebarInset>
                <StudentsNavbar />
                <div className="flex flex-1 flex-col bg-primary-bg-color gap-4 p-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default ParentProfileLayout