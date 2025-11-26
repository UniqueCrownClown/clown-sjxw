"use client";

import { Calendar, Home, Inbox, Search, Settings, Shield } from "lucide-react";
import Navbar from "@/components/navbar";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getUserRole } from "@/lib/user-actions";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Chat",
    url: "/chat",
    icon: Inbox,
  },
  {
    title: "Todo",
    url: "/todo",
    icon: Calendar,
  },
  {
    title: "One",
    url: "/one",
    icon: Search,
  },
];

// 管理员专用菜单项
const adminItems = [
  {
    title: "One Admin",
    url: "/oneadmin",
    icon: Shield,
  },
];

export function AppSidebar() {
  const { user, isLoaded } = useUser();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (isLoaded && user) {
        try {
          const role = await getUserRole(user.id);
          setUserRole(role);
        } catch (error) {
          console.error("Failed to fetch user role:", error);
        } finally {
          setLoading(false);
        }
      } else if (isLoaded && !user) {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [isLoaded, user]);

  // 合并菜单项，如果是管理员则包含管理员菜单
  const menuItems = userRole === "ADMIN" ? [...items, ...adminItems] : items;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Navbar />
      </SidebarFooter>
    </Sidebar>
  );
}