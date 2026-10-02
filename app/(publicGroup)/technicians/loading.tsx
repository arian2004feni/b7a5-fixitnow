import { Skeleton } from "@/components/ui/skeleton";
import { ServiceListSkeleton } from "../_components/home/HomeSkeletons";

export default function Loading() {
  return (
    <>
      {/* Header Layout Skeleton matches the exact structural wrapper */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          {/* Marketplace badge placeholder */}
          <Skeleton className="h-5 w-24 bg-slate-200" />

          {/* Main Title placeholder */}
          <Skeleton className="mt-2 h-10 w-80 bg-slate-200" />

          {/* Subtitle paragraph placeholders */}
          <div className="mt-3 max-w-xl space-y-2">
            <Skeleton className="h-4 w-full bg-slate-200" />
            <Skeleton className="h-4 w-5/6 bg-slate-200" />
          </div>

          {/* ServicesSearchBar Placeholder */}
          <div className="mt-6 max-w-2xl">
            <Skeleton className="h-12 w-full rounded-xl bg-slate-200" />
          </div>
        </div>
      </div>

      {/* Main Listing Grid Placeholder */}
      <ServiceListSkeleton />
    </>
  );
}
