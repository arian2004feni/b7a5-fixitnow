import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentResultLoading() {
  return (
    <div className="mx-auto max-w-lg py-8 animate-pulse">
      <Card className="border-slate-200">
        <CardContent className="flex flex-col items-center p-8 text-center">
          {/* Status Icon Circle Placeholder */}
          <Skeleton className="size-16 rounded-full bg-slate-200" />

          {/* Heading Confirmation Title */}
          <Skeleton className="mt-5 h-7 w-48 bg-slate-200" />

          {/* Supporting Summary Label */}
          <Skeleton className="mt-2 h-4 w-60 bg-slate-100" />

          {/* Transaction Metadata Container Details Box */}
          <div className="mt-6 w-full rounded-xl bg-slate-50 p-4 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center gap-10">
                {/* Left Metadata Label */}
                <Skeleton className="h-4 w-24 bg-slate-200" />

                {/* Right Metadata Value Row Config */}
                <Skeleton
                  className={`h-4 bg-slate-200 ${
                    i === 0
                      ? "w-36"
                      : i === 1
                        ? "w-44"
                        : i === 2
                          ? "w-40"
                          : i === 4
                            ? "w-16 rounded-full"
                            : "w-12"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Bottom Dual Action Call-To-Action Button Links Grid */}
          <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
            <Skeleton className="h-10 flex-1 rounded-md bg-slate-200" />
            <Skeleton className="h-10 flex-1 rounded-md bg-slate-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
