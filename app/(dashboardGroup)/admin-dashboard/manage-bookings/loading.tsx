import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AdminCategoriesLoading() {
  return (
    <div className="flex flex-col gap-7 animate-pulse">
      {/* Header Section */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-2">
          {/* Categories Title */}
          <Skeleton className="h-9 w-36" />

          {/* Description Subtext */}
          <Skeleton className="h-5 w-80 mt-2" />
        </div>
      </div>

      {/* Main Categories Container Card */}
      <Card>
        <CardHeader className="space-y-2">
          {/* Card Title and Total Counts */}
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-28" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-y bg-slate-50">
                <tr>
                  {[
                    "Icon",
                    "Category Name",
                    "Total Services",
                    "Created At",
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
                    {/* Icon Column */}
                    <td className="px-5 py-4">
                      <Skeleton className="h-8 w-8 rounded-lg" />
                    </td>
                    {/* Category Name */}
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-44" />
                    </td>
                    {/* Total Services Count */}
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-12" />
                    </td>
                    {/* Created Date */}
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-28" />
                    </td>
                    {/* Action Buttons */}
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
