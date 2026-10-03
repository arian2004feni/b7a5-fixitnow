import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
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
  );
}
