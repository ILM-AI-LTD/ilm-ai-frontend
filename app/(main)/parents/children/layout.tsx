// "use client";

// import AppSidebar from "@/components/app-sidebar";
// import CustomNavbar from "@/components/global/CustomNavbar";
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { PaperProvider } from "@/context/PaperContext";
// import ParentsNavbar from "@/feature/parents/components/profile/common/Navbar"
// import StudentsNavbar from "@/feature/students/home/component/Navbar"
// import { BookOpen, Home, ReceiptText, Settings, UserPlus } from "lucide-react";

const ParentProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 flex-col  bg-background gap-4 p-4">
      {children}
    </div>
  );
};

export default ParentProfileLayout;
