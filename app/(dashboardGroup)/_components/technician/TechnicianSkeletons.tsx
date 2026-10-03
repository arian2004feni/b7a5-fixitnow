import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function TechnicianBookingsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Filter Tabs Skeleton */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className={`h-9 rounded-md ${
              i === 0 ? "w-12" : i === 3 ? "w-24" : "w-20"
            }`}
          />
        ))}
      </div>

      {/* Main Container Card */}
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-20" />
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table Skeleton (Hidden on Mobile) */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-y bg-slate-50">
                <tr>
                  {[
                    "Service",
                    "Date",
                    "Time",
                    "Amount",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th key={h} className="px-5 py-3">
                      <Skeleton className="h-3 w-12" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-b last:border-0">
                    <td className="px-5 py-4 space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-28" />
                    </td>
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-10" />
                    </td>
                    <td className="px-5 py-4">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </td>
                    <td className="px-5 py-4">
                      <Skeleton className="h-8 w-16 rounded-md" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Lists Skeleton (Hidden on Desktop) */}
          <div className="flex flex-col gap-3 p-4 md:hidden">
            {Array.from({ length: 3 }).map((_, cardIndex) => (
              <div
                key={cardIndex}
                className="rounded-xl border border-slate-200 p-4 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-[60%]" />
                    <Skeleton className="h-3 w-[75%]" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full shrink-0" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="pt-2">
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function TechnicianServicesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Heading Skeleton */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      {/* Main Container Card */}
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-y bg-slate-50">
                <tr>
                  {[
                    "Service",
                    "Category",
                    "Description",
                    "Price",
                    "Duration",
                    "Actions",
                  ].map((h) => (
                    <th key={h} className="px-5 py-3">
                      <Skeleton className="h-3 w-16" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 4 }).map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-b last:border-0">
                    {/* Service Name */}
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-36" />
                    </td>
                    {/* Category */}
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    {/* Description (max-w-xs with multiple line representation) */}
                    <td className="max-w-xs px-5 py-4 space-y-1">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-4/5" />
                    </td>
                    {/* Price */}
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-12" />
                    </td>
                    {/* Duration */}
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    {/* Actions (Edit and Delete button shapes) */}
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function TechnicianAvailabilityLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Heading Skeleton */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-[340px]" />
        </div>
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>

      {/* Weekly Schedule Main Container Card */}
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-96" />
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {/* Mapping 7 rows to match Sunday through Saturday slots */}
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center justify-between"
            >
              {/* Day Label Placeholder */}
              <div className="w-28 shrink-0">
                <Skeleton className="h-5 w-20" />
              </div>

              {/* Time Badge Placeholder */}
              <div className="flex flex-1 flex-wrap gap-2">
                <Skeleton className="h-6 w-36 rounded-full" />
              </div>

              {/* Edit Button Shape Placeholder */}
              <div className="shrink-0">
                <Skeleton className="h-8 w-16 rounded-md" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
