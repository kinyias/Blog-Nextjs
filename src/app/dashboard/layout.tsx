import Header from "@/components/dashboard/Header"
import DashboardSidebar from "@/components/dashboard/Sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { checkRole } from "@/utils/roles"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const isAdmin = await checkRole('admin')
  if (!isAdmin) {
    redirect('/')
  }
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

