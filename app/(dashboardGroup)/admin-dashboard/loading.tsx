import { Skeleton } from "@/components/ui/skeleton";
import { AdminHomeLoading } from "../_components/admin/AdminComponents";

export default function AdminDashboardLoading() {
  return (
    <div className="flex flex-col gap-7 animate-pulse">
      {/* Top Header Shell Section */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-2">
          {/* Dashboard Heading Title */}
          <Skeleton className="h-9 w-40" />

          {/* Subtext description summary */}
          <Skeleton className="h-5 w-80 mt-2" />
        </div>

        {/* Top-Right "Manage Users" Button Shape */}
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>

      {/* Reusing the custom dynamic child components skeleton block immediately below */}
      <AdminHomeLoading />
    </div>
  );
}
