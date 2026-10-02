import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLayoutSkeleton() {
  return (
    <>
      {/* 1. HERO SECTION SKELETON */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-28">
          <div>
            {/* Tag / Badge */}
            <Skeleton className="mb-6 h-8 w-56 rounded-full bg-slate-800" />

            {/* Hero Heading */}
            <div className="space-y-3">
              <Skeleton className="h-12 w-4/5 bg-slate-800 sm:h-14" />
              <Skeleton className="h-12 w-3/5 bg-slate-800 sm:h-14" />
              <Skeleton className="h-12 w-2/3 bg-slate-800 sm:h-14" />
            </div>

            {/* Description Text */}
            <div className="mt-6 space-y-2">
              <Skeleton className="h-4 w-full bg-slate-800" />
              <Skeleton className="h-4 w-4/5 bg-slate-800" />
            </div>

            {/* SearchBar Input */}
            <Skeleton className="mt-9 h-14 w-full max-w-2xl rounded-xl bg-slate-800" />

            {/* Bottom Badges */}
            <div className="mt-6 flex items-center gap-5">
              <Skeleton className="h-5 w-36 bg-slate-800" />
              <Skeleton className="h-5 w-32 bg-slate-800" />
            </div>
          </div>

          {/* Right Image Container (Hidden below lg screen sizes) */}
          <div className="relative hidden lg:block">
            <Skeleton className="aspect-[.9] w-full rounded-[2rem] bg-slate-800" />
            {/* Absolute floating floating review badge */}
            <div className="absolute -bottom-5 -left-8 flex h-20 w-48 items-center gap-3 rounded-2xl bg-white p-4 shadow-xl">
              <Skeleton className="size-11 rounded-full shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION SKELETON */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        {/* Section Heading Placeholder */}
        <div className="mb-8 space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-64" />
        </div>
        {/* Grid matching HomeCategories layout */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center"
            >
              <Skeleton className="mx-auto size-14 rounded-2xl" />
              <Skeleton className="mx-auto mt-4 h-4 w-20" />
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS SKELETON */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-8 space-y-2">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-8 w-60" />
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-7"
              >
                <Skeleton className="size-12 rounded-xl" />
                <Skeleton className="mt-6 h-5 w-40" />
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED SERVICES SKELETON */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-8 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-56" />
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="relative rounded-xl border border-slate-200 bg-white overflow-hidden pb-4"
            >
              <Skeleton className="aspect-video w-full rounded-b-none" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex justify-between items-center px-5 pt-2 border-t border-slate-50">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TOP RATED TECHNICIANS SKELETON */}
      <section className="bg-blue-50">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-8 space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-60" />
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-5 space-y-4"
              >
                <div className="flex gap-2 items-center">
                  <Skeleton className="size-12 rounded-full" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-5/6" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
