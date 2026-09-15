"use client";
import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { technicians } from "@/components/fixitnow/data";
import { MobileFilterButton } from "../_components/MobileFilterButton";
import TechnicianCard from "../_components/TechnicianCard";
export default function TechniciansPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      technicians.filter((t) =>
        `${t.name} ${t.profession} ${t.location}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );
  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[.15em] text-blue-600">
            Meet the pros
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
            Browse top technicians
          </h1>
          <p className="mt-3 max-w-xl text-slate-500">
            Get to know the skilled, verified professionals ready to help in
            your neighborhood.
          </p>
          <div className="mt-7 flex max-w-2xl items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <Search className="size-5 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, skill, or location"
              className="h-9 flex-1 outline-none"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            <strong className="text-slate-800">
              {filtered.length} technicians
            </strong>{" "}
            found near you
          </p>
          <div className="flex gap-2">
            <MobileFilterButton />
            <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600">
              Sort: Top rated <ChevronDown className="size-4" />
            </button>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((tech) => (
            <TechnicianCard key={tech.slug} tech={tech} />
          ))}
        </div>
      </div>
    </>
  );
}
