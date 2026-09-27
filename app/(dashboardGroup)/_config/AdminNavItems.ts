import { ISidebarItem } from "@/types/sidebarItems";
import {
  BookOpen,
  Boxes,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

export const ADMIN_NAV_ITEMS: ISidebarItem[] = [
  { href: "/admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin-dashboard/manage-users", label: "Users", icon: Users },
  {
    href: "/admin-dashboard/manage-bookings",
    label: "Bookings",
    icon: BookOpen,
  },
  { href: "/admin-dashboard/categories", label: "Categories", icon: Boxes },
  { href: "/admin-dashboard/settings", label: "Settings", icon: Settings },
];
