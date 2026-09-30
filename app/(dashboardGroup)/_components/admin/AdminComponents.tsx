import { Card, CardContent } from "@/components/ui/card";

export function Stat({
  title,
  value,
  detail,
  icon: Icon,
  tone,
}: {
  title: string;
  value: string;
  detail: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  tone: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <p className="text-sm text-slate-500">{title}</p>

          <span className={`grid size-9 place-items-center rounded-lg ${tone}`}>
            <Icon className="size-4" />
          </span>
        </div>

        <p className="mt-4 text-2xl font-bold text-slate-950">{value}</p>

        <p className="mt-1 text-xs text-slate-500">{detail}</p>
      </CardContent>
    </Card>
  );
}

export function MiniChart({
  data,
  valueKey,
}: {
  data:
    | {
        month: string;
        bookings: number;
      }[]
    | {
        month: string;
        revenue: number;
      }[];

  valueKey: "bookings" | "revenue";
}) {
  const values = data.map((item) =>
    valueKey === "bookings" && "bookings" in item
      ? item.bookings
      : valueKey === "revenue" && "revenue" in item
        ? item.revenue
        : 0,
  );

  const max = Math.max(...values, 1);

  return (
    <div className="flex h-44 items-end gap-2 border-b border-slate-200 px-2">
      {data.map((item) => {
        const value =
          valueKey === "bookings" && "bookings" in item
            ? item.bookings
            : valueKey === "revenue" && "revenue" in item
              ? item.revenue
              : 0;

        const height = (value / max) * 100;

        return (
          <div
            key={item.month}
            className="flex flex-1 flex-col items-center gap-2 h-full"
          >
            <div className="flex h-full w-full items-end">
              <div
                className="w-full rounded-t-md bg-blue-500"
                style={{
                  height: `${height}%`,
                }}
                title={`${item.month}: ${value}`}
              />
            </div>

            <span className="text-[10px] text-slate-400">{item.month}</span>
          </div>
        );
      })}
    </div>
  );
}

export function HealthRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-slate-600">{label}</span>

      <span className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
        <span className="size-2 rounded-full bg-emerald-500" />

        {value}
      </span>
    </div>
  );
}

export function AdminHomeLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index}>
          <CardContent className="p-5">
            <div className="h-24 animate-pulse rounded-lg bg-slate-100" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
