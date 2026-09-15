import { Star } from "lucide-react";

export default function Rating({
  value,
  reviews,
}: {
  value: number;
  reviews?: number;
}) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <Star className="size-4 fill-amber-400 text-amber-400" />
      <span className="font-semibold text-slate-800">{value.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className="text-slate-400">({reviews})</span>
      )}
    </div>
  );
}