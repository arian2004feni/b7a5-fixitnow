import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function BookingDetailsLoading() {
  return (
    <div className="flex flex-col gap-7 animate-pulse">
      {/* Back Button Skeleton */}
      <Skeleton className="h-9 w-32 -ml-3 rounded-md bg-slate-200" />

      {/* PageHeading Skeleton */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 bg-slate-200" />
          <Skeleton className="h-4 w-64 bg-slate-200 sm:w-80" />
        </div>
        {/* StatusBadge Skeleton */}
        <Skeleton className="h-6 w-24 rounded-full bg-slate-200" />
      </div>

      {/* Two-Column Main Layout */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
        {/* Left Column (Service Info & Stepper) */}
        <div className="flex flex-col gap-6">
          {/* Service Details Card */}
          <Card className="border-slate-200">
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-56 bg-slate-200" />
              <Skeleton className="h-4 w-44 bg-slate-100" />
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div className="flex gap-3" key={i}>
                  {/* Icon Placeholder */}
                  <Skeleton className="mt-0.5 size-4 shrink-0 rounded bg-slate-200" />
                  <div className="space-y-1.5 flex-1">
                    {/* Label */}
                    <Skeleton className="h-3 w-12 bg-slate-200" />
                    {/* Value */}
                    <Skeleton className="h-4 w-32 bg-slate-100" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Progress Tracker Stepper Card */}
          <Card className="border-slate-200">
            <CardHeader>
              <Skeleton className="h-5 w-32 bg-slate-200" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-row items-center sm:flex-1 sm:flex-col sm:items-center relative"
                  >
                    {/* Step Bubble Circle */}
                    <Skeleton className="size-9 shrink-0 rounded-full bg-slate-200" />

                    {/* Step Label Mobile/Desktop text wrapper */}
                    <div className="ml-3 flex-1 sm:ml-0 sm:pt-2 sm:text-center w-full flex justify-start sm:justify-center">
                      <Skeleton className="h-3.5 w-16 bg-slate-200" />
                    </div>

                    {/* Horizontal Line Connector between steps (Desktop Layout only) */}
                    {i < 4 && (
                      <div className="hidden sm:block absolute top-4.5 left-[calc(50%+18px)] right-[calc(-50%+18px)] h-px bg-slate-200 -z-10" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Technician Info & Financial Summary) */}
        <div className="flex flex-col gap-6">
          {/* Technician Profile Card */}
          <Card className="border-slate-200">
            <CardHeader>
              <Skeleton className="h-5 w-24 bg-slate-200" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                {/* Profile Avatar Circle */}
                <Skeleton className="size-12 shrink-0 rounded-full bg-slate-200" />
                <div className="space-y-2 flex-1">
                  {/* Name String */}
                  <Skeleton className="h-4.5 w-32 bg-slate-200" />
                  {/* Bio String line */}
                  <Skeleton className="h-3.5 w-full bg-slate-100" />
                  {/* Review Stars Counter row */}
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="size-3 rounded bg-amber-200" />
                    <Skeleton className="h-3 w-14 bg-slate-200" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment & Action CTA Summary Card */}
          <Card className="border-slate-200">
            <CardHeader>
              <Skeleton className="h-5 w-36 bg-slate-200" />
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {/* Pricing Breakdown Line */}
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-20 bg-slate-200" />
                <Skeleton className="h-4 w-12 bg-slate-200" />
              </div>
              <Separator />
              {/* Grand Total Value Line */}
              <div className="flex justify-between items-center">
                <Skeleton className="h-4.5 w-10 bg-slate-300" />
                <Skeleton className="h-4.5 w-14 bg-slate-300" />
              </div>
              {/* Context-Driven Primary/Secondary CTA Button Slot */}
              <Skeleton className="mt-2 h-10 w-full rounded-md bg-slate-200" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
