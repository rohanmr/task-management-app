import {
  Home,
  Users,
  Settings,
  CirclePlus,
  List,
  ListChecks,
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
import { useContext } from "react";
import { userContext } from "@/context/userProvider";

const items = [
  {
    title: "Home",
    url: "/dashboard/home",
    icon: Home,
    roles: ["admin", "user"],
  },
  {
    title: "Create Task",
    url: "/dashboard/create-task",
    icon: CirclePlus,
    roles: ["admin"],
  },
  {
    title: "Tasks List",
    url: "/dashboard/all-tasks",
    icon: List,
    roles: ["admin"],
  },
  {
    title: "All Users",
    url: "/dashboard/users",
    icon: Users,
    roles: ["admin"],
  },
  {
    title: "Assigned Task",
    url: "/dashboard/assigned-tasks",
    icon: ListChecks,
    roles: ["admin"],
  },
  {
    title: "Your Task",
    url: "/dashboard/your-tasks",
    icon: ListChecks,
    roles: ["user"],
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    roles: ["admin", "user"],
  },
];

export function AppSidebar() {
  const { user } = useContext(userContext);
  if (!user || !user.role) return null;
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="gap-2">
            <Component size={32} />
            <span className="text-base text-center py-5 font-semibold">
              {" "}
              PTMS Software
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2 mt-4">
            <SidebarMenu>
              {items
                .filter((item) => item.roles.includes(user.role))
                .map((item) => (
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
