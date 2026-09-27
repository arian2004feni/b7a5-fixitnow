import { ISidebarItem } from "@/types/sidebarItems";
import {
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  UserRound,
} from "lucide-react";
import { TECHNICIAN_NAV_ITEMS } from "./TechnicianNavItems";
import { ADMIN_NAV_ITEMS } from "./AdminNavItems";

const CUSTOMER_SIDEBAR_ITEMS: ISidebarItem[] = [
  { href: "/customer-dashboard", label: "Overview", icon: LayoutDashboard },
  {
    href: "/customer-dashboard/bookings",
    label: "My bookings",
    icon: CalendarDays,
  },
  { href: "/customer-dashboard/payments", label: "Payments", icon: CreditCard },
  // { href: "/customer-dashboard/reviews", label: "Reviews", icon: Star },
  {
    href: "/customer-dashboard/profile",
    label: "Profile settings",
    icon: UserRound,
  },
];

export const sidebarNavItems = {
  CUSTOMER: CUSTOMER_SIDEBAR_ITEMS,
  TECHNICIAN: TECHNICIAN_NAV_ITEMS,
  ADMIN: ADMIN_NAV_ITEMS,
};
