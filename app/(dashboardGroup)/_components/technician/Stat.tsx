import { Card, CardContent } from "@/components/ui/card";

export function Stat({
  title,
  value,
  detail,
  icon: Icon,
}: {
  title: string;
  value: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <p className="text-sm text-slate-500">{title}</p>
          <span className="grid size-9 place-items-center rounded-lg bg-blue-50 text-blue-600">
            <Icon className="size-4" />
          </span>
        </div>
        <p className="mt-4 text-2xl font-bold text-slate-950">{value}</p>
        <p className="mt-1 text-xs text-slate-500">{detail}</p>
      </CardContent>
    </Card>
  );
}
