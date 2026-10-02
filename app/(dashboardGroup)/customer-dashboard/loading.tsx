import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CustomerDashboardLoading() {
  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Heading Skeleton */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40 bg-slate-200" />
          <Skeleton className="h-9 w-64 bg-slate-200 sm:w-80" />
          <Skeleton className="h-4 w-72 bg-slate-200" />
        </div>
        <Skeleton className="h-10 w-36 rounded-md bg-slate-200" />
      </div>

      {/* Stat Cards Grid Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-slate-200 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28 bg-slate-200" />
              <Skeleton className="h-5 w-5 rounded-md bg-slate-200" />
            </div>
            <Skeleton className="h-8 w-16 bg-slate-200" />
            <Skeleton className="h-3.5 w-32 bg-slate-200" />
          </Card>
        ))}
      </div>

      {/* Main Content Layout Grid Skeleton */}
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        {/* Booking Card Skeleton (Mirrors the populated state structure) */}
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-40 bg-slate-200" />
              <Skeleton className="h-4 w-52 bg-slate-200" />
            </div>
            <Skeleton className="h-6 w-24 rounded-full bg-slate-200" />
          </CardHeader>
          <CardContent>
            <div className="rounded-xl bg-slate-50 p-5">
              <div className="flex flex-col justify-between gap-5 sm:flex-row">
                <div className="flex gap-4">
                  {/* Service Icon Container */}
                  <Skeleton className="size-12 shrink-0 rounded-xl bg-slate-200" />
                  <div className="space-y-2">
                    {/* Service Name */}
                    <Skeleton className="h-5 w-36 bg-slate-200" />
                    {/* Tech Name */}
                    <Skeleton className="h-4 w-28 bg-slate-200" />
                    {/* Metadata Items */}
                    <div className="mt-3 flex gap-4">
                      <Skeleton className="h-3.5 w-20 bg-slate-200" />
                      <Skeleton className="h-3.5 w-20 bg-slate-200" />
                      <Skeleton className="h-3.5 w-16 bg-slate-200" />
                    </div>
                  </div>
                </div>
                {/* Price and Button Action */}
                <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:justify-center space-y-1">
                  <Skeleton className="h-6 w-12 bg-slate-200" />
                  <Skeleton className="h-9 w-32 rounded-md bg-slate-200" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card Skeleton */}
        <Card className="border-slate-200">
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-32 bg-slate-200" />
            <Skeleton className="h-4 w-48 bg-slate-200" />
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-slate-200 p-3"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="size-4 rounded bg-slate-200" />
                  <Skeleton className="h-4 w-32 bg-slate-200" />
                </div>
                <Skeleton className="size-4 rounded bg-slate-200" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
