"use client";

import Logo from "@/components/shared/Logo";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import logout from "@/services/logout";
import { ApiResponse } from "@/types/api";
import { User as UserResponse } from "@/types/user";
import { LogOut, Trash2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import MainNavLinks from "./MainNavLinks";

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

      <MainNavLinks user={user}/>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex gap-2">
            <Avatar className="size-9">
              <AvatarFallback className="bg-blue-100 text-blue-700 uppercase">
                {user.data.name.split(" ").map(j => j.split("")[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 w-32">
              <p className="truncate text-sm font-semibold text-slate-900 line-clamp-1">
                {user.data.name ?? "N/A"}
              </p>
              <p className="truncate text-xs text-slate-500 line-clamp-1">
                {user.data.email ?? "N/A"}
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger className="flex gap-2 text-slate-600 mt-2 text-sm">
                <LogOut className="size-5" />
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                    <Trash2Icon />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Sign Out?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are You Sure Want to Log Out?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel variant="outline">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      await logout();
                      redirect("/login");
                    }}
                    variant="destructive"
                  >
                    Yes, Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
