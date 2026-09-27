"use client";

import { Separator } from "@/components/ui/separator";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ApiResponse } from "@/types/api";
import { Role } from "@/types/enums";
import { ISidebarItem } from "@/types/sidebarItems";
import { User } from "@/types/user";
import {
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarNavItems } from "../_config/SidebarNavItems";

export default function MainNavLinks({ user }: { user: ApiResponse<User> }) {
  const pathname = usePathname();
  let navItems: ISidebarItem[] = [];

  if (user.data.role === Role.CUSTOMER) {
    navItems = sidebarNavItems.CUSTOMER;
  } else if (user.data.role === Role.TECHNICIAN) {
    navItems = sidebarNavItems.TECHNICIAN;
  } else if (user.data.role === Role.ADMIN) {
    navItems = sidebarNavItems.ADMIN;
  }

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="mt-4 mb-2 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
          {user.data.role.toLowerCase()} menu
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="gap-1">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={item.href === pathname}
                    className={`${item.href === pathname && "bg-blue-50! text-blue-700!"} py-4.5 text-base text-slate-600 hover:bg-slate-50 hover:text-slate-700`}
                  >
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <Separator className="my-6" />
      <Link
        href="/services"
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
      >
        <MessageSquare className="size-4" />
        Find a service
      </Link>
    </SidebarContent>
  );
}
