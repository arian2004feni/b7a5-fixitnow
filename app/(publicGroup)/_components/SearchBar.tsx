import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-slate-900/10 sm:flex-row ${compact ? "border border-slate-200 shadow-none" : ""}`}
    >
      <div className="flex flex-1 items-center gap-3 rounded-xl px-3 py-2">
        <Search className="size-5 text-slate-400" />
        <div className="flex-1">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            What service do you need?
          </label>
          <input
            className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            placeholder="e.g. Plumbing, cleaning..."
          />
        </div>
      </div>
      <div className="flex flex-1 items-center gap-3 rounded-xl border-t border-slate-100 px-3 py-2 sm:border-l sm:border-t-0">
        <MapPin className="size-5 text-slate-400" />
        <div className="flex-1">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Location
          </label>
          <input
            className="w-full bg-transparent text-sm text-slate-800 outline-none"
            placeholder="Austin, TX"
          />
        </div>
      </div>
      <Button className="h-12 rounded-xl bg-blue-600 px-6 hover:bg-blue-700">
        <Search className="mr-2 size-4" />
        Search
      </Button>
    </div>
  );
}