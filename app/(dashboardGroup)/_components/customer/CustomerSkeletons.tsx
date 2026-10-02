import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function BookingListsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Filter Tabs Skeleton */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className={`h-9 bg-slate-200 rounded-md ${
              i === 0 ? "w-12 bg-slate-300" : i === 5 ? "w-24" : "w-20"
            }`}
          />
        ))}
      </div>

      {/* Main Card Wrapper */}
      <Card className="border-slate-200">
        <CardHeader className="space-y-2">
          {/* Card Title Skeleton */}
          <Skeleton className="h-5 w-36 bg-slate-200" />
          {/* Card Description Counter Skeleton */}
          <Skeleton className="h-4 w-24 bg-slate-200" />
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table View Skeleton (hidden on mobile) */}
          <div className="hidden md:block">
            <div className="border-y bg-slate-50/70 px-6 py-3 flex text-xs font-medium uppercase text-slate-400">
              <div className="w-[25%]">Booking</div>
              <div className="w-[20%]">Technician</div>
              <div className="w-[20%]">Date</div>
              <div className="w-[15%]">Status</div>
              <div className="w-[10%]">Amount</div>
              <div className="w-[10%] text-right">Action</div>
            </div>

            <div className="divide-y divide-slate-100">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-6 py-4 flex items-center">
                  {/* Service & Category Column */}
                  <div className="w-[25%] space-y-1.5 pr-4">
                    <Skeleton className="h-4 w-40 bg-slate-200" />
                    <Skeleton className="h-3 w-24 bg-slate-100" />
                  </div>
                  {/* Technician Profile Column */}
                  <div className="w-[20%] pr-4">
                    <Skeleton className="h-4 w-28 bg-slate-200" />
                  </div>
                  {/* Created At Date Column */}
                  <div className="w-[20%] pr-4">
                    <Skeleton className="h-4 w-24 bg-slate-200" />
                  </div>
                  {/* Status Badge Column */}
                  <div className="w-[15%] pr-4">
                    <Skeleton className="h-6 w-20 rounded-full bg-slate-200" />
                  </div>
                  {/* Price/Amount Column */}
                  <div className="w-[10%] pr-4">
                    <Skeleton className="h-4 w-12 bg-slate-200" />
                  </div>
                  {/* Action Dropdown Trigger Column */}
                  <div className="w-[10%] flex justify-end">
                    <Skeleton className="h-8 w-8 rounded-md bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Cards Stack Skeleton (hidden on desktop) */}
          <div className="flex flex-col gap-3 p-4 md:hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-100 p-4 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    {/* Service Name */}
                    <Skeleton className="h-4.5 w-36 bg-slate-200" />
                    {/* Unique Booking ID String */}
                    <Skeleton className="h-3 w-28 bg-slate-100" />
                  </div>
                  {/* Status Badge */}
                  <Skeleton className="h-6 w-16 rounded-full bg-slate-200" />
                </div>

                {/* Secondary Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Tech Name */}
                  <Skeleton className="h-3.5 w-24 bg-slate-200" />
                  {/* Localized Date */}
                  <Skeleton className="h-3.5 w-20 bg-slate-200" />
                  {/* Amount / Price */}
                  <Skeleton className="h-4 w-12 bg-slate-200" />
                </div>

                {/* Action Trigger Row */}
                <div className="pt-1">
                  <Skeleton className="h-8 w-full rounded-md bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
