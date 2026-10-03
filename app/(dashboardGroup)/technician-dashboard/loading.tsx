import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function TechnicianDashboardLoading() {
  return (
    <div className="flex flex-col gap-7 animate-pulse">
      {/* Heading Skeleton */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-44 rounded-md" />
      </div>

      {/* Stats Cards Skeleton (4 Columns) */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Layout Skeleton (Two Columns) */}
      <div className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        {/* Pending Requests Card Skeleton */}
        <Card>
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="rounded-xl border border-slate-100 p-4 space-y-4">
              <div className="flex flex-col justify-between gap-3 sm:flex-row">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-12" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-20 rounded-md" />
                <Skeleton className="h-9 w-20 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-9 w-32 mt-1" />
          </CardContent>
        </Card>

        {/* Earnings Card Skeleton */}
        <Card>
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="flex items-end gap-2 pt-6 h-50">
            {/* Simulating Earning Chart Bars */}
            <Skeleton className="h-[40%] w-full" />
            <Skeleton className="h-[60%] w-full" />
            <Skeleton className="h-[35%] w-full" />
            <Skeleton className="h-[75%] w-full" />
            <Skeleton className="h-[50%] w-full" />
            <Skeleton className="h-[90%] w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
