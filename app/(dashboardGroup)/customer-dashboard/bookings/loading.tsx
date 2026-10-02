import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function BookingsLoading() {
  return (
    <div className="flex flex-col gap-7">
      {/* PageHeading Skeleton */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <Skeleton className="h-8 w-44 bg-slate-200" />
          <Skeleton className="h-4 w-64 bg-slate-200 sm:w-80" />
        </div>
        <Skeleton className="h-10 w-36 rounded-md bg-slate-200" />
      </div>

      {/* BookingLists Skeleton List */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-slate-200">
            <CardContent className="p-5">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div className="flex gap-4">
                  {/* Service Icon Shape */}
                  <Skeleton className="size-12 shrink-0 rounded-xl bg-slate-200" />

                  <div className="space-y-2">
                    {/* Service Name Title */}
                    <Skeleton className="h-5 w-40 bg-slate-200 sm:w-56" />
                    {/* Technician Subtext */}
                    <Skeleton className="h-4 w-28 bg-slate-200" />

                    {/* Metadata Row (Date, Time, Location) */}
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                      <Skeleton className="h-3.5 w-20 bg-slate-200" />
                      <Skeleton className="h-3.5 w-16 bg-slate-200" />
                      <Skeleton className="h-3.5 w-24 bg-slate-200" />
                    </div>
                  </div>
                </div>

                {/* Status, Price & Actions Stack */}
                <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:border-0 sm:pt-0">
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:justify-center">
                    {/* Status Badge */}
                    <Skeleton className="h-6 w-20 rounded-full bg-slate-200" />
                    {/* Price Tag */}
                    <Skeleton className="h-5 w-14 bg-slate-200" />
                  </div>
                  {/* Action Menu/Button */}
                  <Skeleton className="h-9 w-28 rounded-md bg-slate-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
