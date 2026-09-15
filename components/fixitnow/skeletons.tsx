import { Skeleton } from "@/components/ui/skeleton";

export function NavbarSkeleton() {
  return (
    <div className="flex h-16 items-center justify-between border-b px-5">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="size-9 rounded-full" />
    </div>
  );
}
export function ServiceCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-white p-4">
      <Skeleton className="aspect-[1.5] w-full rounded-lg" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
}
export function TechnicianCardSkeleton() {
  return (
    <div className="flex gap-4 rounded-xl border bg-white p-5">
      <Skeleton className="size-14 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}
export function DashboardCardSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-5">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="mt-4 h-8 w-1/2" />
      <Skeleton className="mt-2 h-3 w-2/3" />
    </div>
  );
}
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-white p-5">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="size-9 rounded-full" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}
export function BookingSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="mt-4 h-4 w-1/2" />
      <Skeleton className="mt-2 h-4 w-2/3" />
    </div>
  );
}
export function ProfileSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="size-16 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
    </div>
  );
}
export const TechnicianProfileSkeleton = ProfileSkeleton;
export function PaymentSkeleton() {
  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-white p-6">
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="mt-6 h-10 w-full" />
      <Skeleton className="mt-3 h-10 w-full" />
      <Skeleton className="mt-6 h-11 w-full" />
    </div>
  );
}
export function PageSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-10 w-1/3" />
      <div className="grid gap-4 sm:grid-cols-3">
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
      </div>
      <TableSkeleton />
    </div>
  );
}
