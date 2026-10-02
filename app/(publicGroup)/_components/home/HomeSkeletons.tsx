import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function HomeCategoriesSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-200 bg-white p-5 text-center"
        >
          <Skeleton className="mx-auto size-14 rounded-2xl" />
          <Skeleton className="mx-auto mt-4 h-4 w-20" />
        </div>
      ))}
    </div>
  );
}

export function ServiceCardsSkeleton() {
  return (
    <Card className="relative mx-auto w-full pt-0 overflow-hidden">
      {/* Thumbnail Aspect Video Skeleton */}
      <Skeleton className="aspect-video w-full rounded-b-none" />

      {/* Heart Action Button Skeleton */}
      <Skeleton className="absolute right-3 top-3 size-8 rounded-full" />

      <CardHeader>
        {/* Category Label Skeleton */}
        <Skeleton className="h-4 w-24 mb-2" />

        {/* Rating Component Skeleton */}
        <div className="flex items-center gap-1 mb-2">
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Service Title Skeleton */}
        <Skeleton className="h-6 w-3/4 mb-2" />

        {/* Technician Description Skeleton */}
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>

      <CardFooter className="justify-between mt-auto pt-0">
        {/* Pricing Block Skeleton */}
        <div className="space-y-1">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-5 w-20" />
        </div>

        {/* Action Link Skeleton */}
        <Skeleton className="h-4 w-28" />
      </CardFooter>
    </Card>
  );
}

export function TechnicianCardSkeleton() {
  return (
    <Card className="relative mx-auto w-full max-w-sm pb-4">
      {/* Header with Avatar and Name/Bio */}
      <CardHeader>
        <div className="flex gap-2 items-center justify-between w-full">
          <div className="flex gap-2 items-center flex-1">
            {/* Avatar Skeleton */}
            <Skeleton className="size-12 rounded-full shrink-0" />
            
            {/* Name and Bio Skeleton */}
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
          
          {/* Heart Button Skeleton */}
          <Skeleton className="size-8 rounded-full shrink-0" />
        </div>
      </CardHeader>

      {/* Location and Rating Row */}
      <CardHeader className="grid grid-cols-2 gap-3 pt-0">
        <div className="flex items-center gap-1.5">
          <Skeleton className="size-4 rounded-full shrink-0" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-20" />
        </div>
      </CardHeader>

      {/* Stats Breakdown Bar */}
      <div className="flex items-center justify-between border-t border-slate-100 p-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-14" />
      </div>

      {/* Action Button Link */}
      <div className="px-4">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </Card>
  );
}

export function ServiceListSkeleton() {
  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-5 py-10 lg:px-8">
      {/* Sidebar Filter Controls Skeleton */}
      <div className="hidden w-64 shrink-0 flex-col gap-6 lg:flex">
        <Skeleton className="h-8 w-32" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-4/6" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>

      {/* Main Content Area Skeleton */}
      <div className="min-w-0 flex-1">
        {/* Header Meta Info & Sorting Skeleton */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>

        {/* Services Grid Skeleton (Mimicking 6 Cards) */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-xl border border-slate-100 p-5 bg-white shadow-sm"
            >
              {/* Service Image Placeholder */}
              <Skeleton className="aspect-video w-full rounded-lg" />
              
              {/* Service Details Placeholder */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              
              {/* Service Footer / Action Placeholder */}
              <div className="mt-2 flex items-center justify-between">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-24 rounded-md" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls Skeleton */}
        <div className="mt-10 flex justify-center gap-2">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
    </div>
  )
}
