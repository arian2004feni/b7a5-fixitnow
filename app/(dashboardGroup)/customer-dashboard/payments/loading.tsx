import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PaymentsLoading() {
  return (
    <div className="flex flex-col gap-7 animate-pulse">
      {/* PageHeading Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-36 bg-slate-200" />
        <Skeleton className="h-4 w-64 bg-slate-200" />
      </div>

      {/* 3-Column Stat Cards Grid Skeleton */}
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-slate-200 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20 bg-slate-200" />
              <Skeleton className="h-5 w-5 rounded-md bg-slate-200" />
            </div>
            <Skeleton className="h-8 w-24 bg-slate-200" />
            <Skeleton className="h-3.5 w-36 bg-slate-200" />
          </Card>
        ))}
      </div>

      {/* Main Table & List Container Card */}
      <Card className="border-slate-200">
        <CardHeader>
          <Skeleton className="h-5 w-36 bg-slate-200" />
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table Layout Skeleton */}
          <div className="overflow-x-auto hidden md:block">
            <div className="border-y bg-slate-50 px-6 py-3 flex text-xs font-medium uppercase text-slate-400">
              <div className="w-[20%]">Transaction</div>
              <div className="w-[20%]">Service</div>
              <div className="w-[20%]">Technician</div>
              <div className="w-[12%]">Amount</div>
              <div className="w-[16%]">Date</div>
              <div className="w-[12%]">Status</div>
            </div>

            <div className="divide-y divide-slate-100">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-6 py-4 flex items-center text-sm">
                  {/* Transaction ID */}
                  <div className="w-[20%] pr-4">
                    <Skeleton className="h-3.5 w-32 bg-slate-100 font-mono" />
                  </div>
                  {/* Service Name */}
                  <div className="w-[20%] pr-4">
                    <Skeleton className="h-4 w-40 bg-slate-200" />
                  </div>
                  {/* Technician Profile Name */}
                  <div className="w-[20%] pr-4">
                    <Skeleton className="h-4 w-28 bg-slate-200" />
                  </div>
                  {/* Price Amount */}
                  <div className="w-[12%] pr-4">
                    <Skeleton className="h-4 w-12 bg-slate-200" />
                  </div>
                  {/* Created Date */}
                  <div className="w-[16%] pr-4">
                    <Skeleton className="h-4 w-24 bg-slate-200" />
                  </div>
                  {/* Badge Component */}
                  <div className="w-[12%]">
                    <Skeleton className="h-6 w-20 rounded-full bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Stacked Items Layout Skeleton */}
          <div className="flex flex-col gap-3 p-4 md:hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-100 p-4 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    {/* Service Name */}
                    <Skeleton className="h-4.5 w-40 bg-slate-200" />
                    {/* Booking ID reference mapping string */}
                    <Skeleton className="h-3 w-28 bg-slate-100" />
                  </div>
                  {/* Status Variant Badge */}
                  <Skeleton className="h-6 w-20 rounded-full bg-slate-200" />
                </div>

                {/* Meta Rows Column Configuration */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Technician Profile Title */}
                  <Skeleton className="h-3.5 w-24 bg-slate-200" />
                  {/* Formatted Datetime stamp */}
                  <Skeleton className="h-3.5 w-20 bg-slate-200" />
                  {/* Numeric Amount Total */}
                  <Skeleton className="h-4 w-12 bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
