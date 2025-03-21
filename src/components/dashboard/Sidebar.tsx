'use client';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  FolderPlus,
  Tag,
  MessageCircle,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

export default function DashboardSidebar() {
    const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <div className="flex items-center px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="text-lg font-bold text-primary-foreground">
                B
              </span>
            </div>
            <span className="text-lg font-semibold">Blog</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-hidden p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
              <Link href="/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/dashboard/posts'}>
              <Link href="/dashboard/posts">
                <FileText className="h-4 w-4" />
                <span>Tin tức</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/dashboard/categories'}>
              <Link href="/dashboard/categories">
                <FolderPlus className="h-4 w-4" />
                <span>Loại tin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/dashboard/group'}>
              <Link href="/dashboard/groups" >
                <Tag className="h-4 w-4" />
                <span>Nhóm tin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/dashboard/comments'}>
              <Link href="/dashboard/comments" >
                <MessageCircle className="h-4 w-4" />
                <span>Bình luận</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
 
      <SidebarRail />
    </Sidebar>
  );
}
