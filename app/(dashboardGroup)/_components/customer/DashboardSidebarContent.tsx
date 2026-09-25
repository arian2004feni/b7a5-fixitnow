import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "@/components/shared/Logo";
import { ApiResponse } from "@/types/api";
import { User as UserResponse } from "@/types/user";
import MainNavLinks from "../MainNavLinks";

export default function DashboardSidebarContent({
  user,
}: {
  user: ApiResponse<UserResponse>;
}) {
  return (
    <Sidebar className="p-6 bg-white">
      <SidebarHeader>
        <Logo className="px-2" />
      </SidebarHeader>

      <MainNavLinks />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex gap-2">
            <Avatar className="size-9">
              <AvatarFallback className="bg-blue-100 text-blue-700">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="">
              <p className="truncate text-sm font-semibold text-slate-900">
                {user.data.name ?? "N/A"}
              </p>
              <p className="truncate text-xs text-slate-500">
                {user.data.email ?? "N/A"}
              </p>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem className="flex gap-2">
            <SidebarMenuButton>
              <LogOut /> Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
