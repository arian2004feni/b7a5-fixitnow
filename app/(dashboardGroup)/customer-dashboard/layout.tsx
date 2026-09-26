import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import DashboardSidebarContent from "../_components/customer/DashboardSidebarContent";
import { Separator } from "@/components/ui/separator";
import { getMe } from "@/services/getMe";
import { ApiResponse } from "@/types/api";
import { User as UserResponse } from "@/types/user";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: ApiResponse<UserResponse> = await getMe();
  return (
    <SidebarProvider>
      <DashboardSidebarContent user={user} />
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <Separator orientation="vertical" />
            <div>
              <p className="hidden text-xs font-medium text-slate-400 sm:block">
                <span className="capitalize">
                  {user.data.role.toLowerCase()}
                </span>{" "}
                account
              </p>
              <h1 className="text-sm font-semibold text-slate-900 sm:text-base">
                Welcome back, {user.data.name ?? "N/A"}
              </h1>
            </div>
          </div>
          <Avatar className="size-9">
            <AvatarFallback className="bg-blue-100 text-blue-700">
              {user.data.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </header>
        <main className="max-w-7xl p-5 lg:p-8">{children}</main>
      </div>
    </SidebarProvider>
  );
}
