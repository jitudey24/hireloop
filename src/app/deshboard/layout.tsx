import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import DashboardSidebar from "@/app/components/deshboardSidebar";
import DeshboardSidebar from "../components/DeshboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DeshboardSidebar/>

      <main className="flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
