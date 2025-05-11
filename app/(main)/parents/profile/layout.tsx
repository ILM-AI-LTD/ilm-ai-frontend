import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"
import ParentsNavbar from "@/feature/parents/profile/components/common/Navbar"


const ParentProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
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