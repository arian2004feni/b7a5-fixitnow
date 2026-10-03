import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CustomerPaymentLoading() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse">
      {/* Back Button Skeleton */}
      <Skeleton className="mb-6 h-9 w-32 -ml-3 rounded-md bg-slate-200" />

      {/* PageHeading Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-56 bg-slate-200" />
        <Skeleton className="h-4 w-72 bg-slate-200" />
      </div>

      {/* Dual Column Grid */}
      <div className="mt-7 grid gap-6 md:grid-cols-2">
        {/* Booking Summary Card Skeleton */}
        <Card className="border-slate-200">
          <CardHeader>
            <Skeleton className="h-5 w-36 bg-slate-200" />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="flex gap-3" key={i}>
                {/* Meta Icon Shape */}
                <Skeleton className="mt-0.5 size-4 shrink-0 rounded bg-slate-200" />
                <div className="space-y-1.5 flex-1">
                  {/* Field Label */}
                  <Skeleton className="h-3 w-16 bg-slate-200" />
                  {/* Field Value Text Line */}
                  <Skeleton className="h-4 w-44 bg-slate-100" />
                </div>
              </div>
            ))}
            <Separator />
            {/* Grand Total Pricing Breakdown Block */}
            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-5 w-12 bg-slate-300" />
              <Skeleton className="h-5 w-16 bg-slate-300" />
            </div>
          </CardContent>
        </Card>

        {/* Payment Provider Card Skeleton */}
        <Card className="border-slate-200">
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-36 bg-slate-200" />
            <Skeleton className="h-4 w-28 bg-slate-100" />
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Stripe Redirection Notice Box Placeholder */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 space-y-2">
              <Skeleton className="h-3.5 w-full bg-slate-200" />
              <Skeleton className="h-3.5 w-2/3 bg-slate-200" />
            </div>
            {/* PayButton Action Trigger Component Skeleton */}
            <Skeleton className="h-10 w-full rounded-md bg-slate-200" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
