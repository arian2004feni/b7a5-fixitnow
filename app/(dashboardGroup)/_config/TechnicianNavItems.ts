import { ISidebarItem } from "@/types/sidebarItems";
import { BriefcaseBusiness, CalendarDays, Clock3, LayoutDashboard, UserRound } from "lucide-react";

export const TECHNICIAN_NAV_ITEMS: ISidebarItem[] = [
  { href: "/technician-dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    href: "/technician-dashboard/bookings",
    label: "Bookings",
    icon: CalendarDays,
  },
  {
    href: "/technician-dashboard/services",
    label: "Services",
    icon: BriefcaseBusiness,
  },
  {
    href: "/technician-dashboard/availability",
    label: "Availability",
    icon: Clock3,
  },
  { href: "/technician-dashboard/profile", label: "Profile", icon: UserRound },
];