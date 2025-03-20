import Header from "@/components/dashboard/Header"
import DashboardSidebar from "@/components/dashboard/Sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import type { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
     <SidebarProvider>
         <div className="flex min-h-screen w-full">
           <DashboardSidebar />
           <div className="flex flex-col w-full">
             <Header />
             <main className="flex w-full">{children}</main>
           </div>
         </div>
       </SidebarProvider>
  )
}

