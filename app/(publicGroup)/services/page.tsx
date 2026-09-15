"use client";
import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { services } from "@/components/fixitnow/data";
import { FilterControls } from "../_components/FilterControls";
import { MobileFilterButton } from "../_components/MobileFilterButton";
import ServiceCard from "../_components/ServiceCard";

export default function PublicServicesPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      services.filter((s) =>
        `${s.title} ${s.category} ${s.tech}`
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
            Marketplace
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
            Find the right service
          </h1>
          <p className="mt-3 max-w-xl text-slate-500">
            Browse trusted professionals and services for every project around
            your home.
          </p>
          <div className="mt-7 flex max-w-2xl items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <Search className="size-5 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, categories, or professionals"
              className="h-9 flex-1 outline-none"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl gap-8 px-5 py-10 lg:px-8">
        <FilterControls />
        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              <strong className="text-slate-800">
                {filtered.length} services
              </strong>{" "}
              available near you
            </p>
            <div className="flex gap-2">
              <MobileFilterButton />
              <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600">
                Sort: Recommended <ChevronDown className="size-4" />
              </button>
            </div>
          </div>
          {filtered.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
              <h2 className="font-bold">No services found</h2>
              <p className="mt-2 text-sm text-slate-500">
                Try a different search.
              </p>
            </div>
          )}
          <div className="mt-10 flex justify-center gap-2">
            <button className="grid size-10 place-items-center rounded-lg bg-blue-600 text-sm font-semibold text-white">
              1
            </button>
            <button className="grid size-10 place-items-center rounded-lg border border-slate-200 bg-white text-sm text-slate-600">
              2
            </button>
            <button className="grid size-10 place-items-center rounded-lg border border-slate-200 bg-white text-sm text-slate-600">
              3
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
