import { SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function DashboardLoading() {
  return (
    <SidebarProvider>
      {/* Sidebar Skeleton Mirroring DashboardSidebarContent Structure */}
      <aside className="w-65 border-r border-slate-200 bg-slate-50/50 p-4 flex-col gap-6 h-screen hidden md:flex">
        <div className="flex items-center gap-2 px-2">
          <Skeleton className="h-8 w-8 rounded-lg bg-slate-200" />
          <Skeleton className="h-5 w-32 bg-slate-200" />
        </div>
        <div className="space-y-3 flex-1 px-2">
          <Skeleton className="h-8 w-full rounded-md bg-slate-200" />
          <Skeleton className="h-8 w-5/6 rounded-md bg-slate-200" />
          <Skeleton className="h-8 w-4/5 rounded-md bg-slate-200" />
          <Skeleton className="h-8 w-full rounded-md bg-slate-200" />
        </div>
        <div className="mt-auto flex items-center gap-3 border-t border-slate-200 pt-4 px-2">
          <Skeleton className="h-9 w-9 rounded-full bg-slate-200" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-24 bg-slate-200" />
            <Skeleton className="h-3 w-16 bg-slate-200" />
          </div>
        </div>
      </aside>

      {/* Main Content Layout Wrapper */}
      <div className="flex flex-col flex-1">
        {/* Header Skeleton */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            {/* Sidebar Trigger Skeleton */}
            <Skeleton className="h-9 w-9 rounded-md bg-slate-200" />
            <Separator orientation="vertical" className="h-6" />
            <div className="space-y-1.5">
              {/* Role Text Skeleton */}
              <Skeleton className="hidden h-3 w-20 bg-slate-200 sm:block" />
              {/* Welcome Title Skeleton */}
              <Skeleton className="h-4 w-36 bg-slate-200 sm:w-48" />
            </div>
          </div>
          {/* Avatar Skeleton */}
          <Skeleton className="h-9 w-9 rounded-full bg-slate-200" />
        </header>

        {/* Dynamic Page Content Skeleton */}
        <main className="max-w-7xl p-5 lg:p-8 space-y-6">
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-8 w-48 bg-slate-200" />
            <Skeleton className="h-4 w-72 bg-slate-200" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-28 rounded-xl bg-slate-100" />
            <Skeleton className="h-28 rounded-xl bg-slate-100" />
            <Skeleton className="h-28 rounded-xl bg-slate-100" />
          </div>
          <Skeleton className="h-100 w-full rounded-xl bg-slate-100" />
        </main>
      </div>
    </SidebarProvider>
  );
}
