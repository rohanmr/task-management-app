import {
  PencilIcon,
  Home,
  Users,
  Settings,
  CirclePlus,
  List,
  ClipboardList,
  Component,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard/home",
    icon: Home,
  },
  {
    title: "Create Task",
    url: "/dashboard/create-task",
    icon: CirclePlus,
  },
  {
    title: "Tasks List",
    url: "/dashboard/all-tasks",
    icon: List,
  },

  {
    title: "All Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="gap-2">
            <Component size={32} />
            <span className="text-base text-center py-5 font-semibold">
              {" "}
              Task Management System
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2 mt-4">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
