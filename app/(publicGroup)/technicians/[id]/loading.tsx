import { Skeleton } from "@/components/ui/skeleton";

export default function TechnicianProfileLoading() {
  return (
    <>
      {/* Profile Header Hero Section */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
            {/* Avatar Placeholder */}
            <Skeleton className="size-28 shrink-0 rounded-3xl" />

            {/* Main Title & Bio Info Placeholders */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-8 w-56" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-5 w-full max-w-xl" />
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>

            {/* Action Buttons Placeholders */}
            <div className="flex gap-2">
              <Skeleton className="size-11 rounded-lg" />
              <Skeleton className="h-11 w-28 rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Container Layout */}
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1fr_380px] lg:px-8">
        <div>
          {/* Tab Navigation Placeholder */}
          <div className="border-b border-slate-200">
            <div className="flex gap-7 pb-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          {/* About Section Skeleton */}
          <section className="py-8">
            <Skeleton className="h-6 w-36" />
            <div className="mt-4 space-y-2 max-w-2xl">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            {/* Performance Stats Cards */}
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 bg-white p-4 space-y-2"
                >
                  <Skeleton className="h-8 w-12" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </section>

          {/* Services Section Skeleton */}
          <section className="border-t border-slate-200 py-8">
            <Skeleton className="h-6 w-40" />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 bg-white p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                  <Skeleton className="h-4 w-28 mt-2" />
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section Skeleton */}
          <section className="border-t border-slate-200 py-8">
            <Skeleton className="h-6 w-44" />
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          </section>
        </div>

        {/* Sidebar Sticky Panel Skeleton */}
        <aside className="lg:sticky lg:top-24 lg:h-fit space-y-4">
          {/* Availability Alert Box Placeholder */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3">
            <div className="flex items-center gap-2">
              <Skeleton className="size-2 rounded-full" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>

          {/* Booking Card Form Box Placeholder */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        </aside>
      </div>
    </>
  );
}
