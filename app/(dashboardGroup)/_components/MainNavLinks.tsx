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
import {
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Star,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/customer-dashboard", label: "Overview", icon: LayoutDashboard },
  {
    href: "/customer-dashboard/bookings",
    label: "My bookings",
    icon: CalendarDays,
  },
  { href: "/customer-dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/customer-dashboard/reviews", label: "Reviews", icon: Star },
  {
    href: "/customer-dashboard/profile",
    label: "Profile settings",
    icon: UserRound,
  },
];

export default function MainNavLinks() {
  const pathname = usePathname();

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="mt-4 mb-2 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
          Customer menu
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="gap-1">
            {links.map((item) => (
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
