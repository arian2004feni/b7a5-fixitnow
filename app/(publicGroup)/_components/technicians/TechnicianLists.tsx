import { TechnicianProfile } from "@/types/user";
import { getTechnicians } from "../../_actions/publicActions";
import { ApiResponse } from "@/types/api";
import { MobileFilterButton } from "../MobileFilterButton";
import { ChevronDown } from "lucide-react";
import TechnicianCard from "./TechnicianCard";
import { FilterControls } from "../FilterControls";
import { Category } from "@/types/category";
import { getCategories } from "@/app/(dashboardGroup)/_actions/technicianActions";
import { PaginationControls } from "../PaginationControls";

export default async function TechnicianLists({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) {
  const result: ApiResponse<TechnicianProfile[]> = await getTechnicians({
    query,
  });
  const categories: ApiResponse<Category[]> = await getCategories();
  return (
    <div className="mx-auto flex gap-8 max-w-7xl px-5 py-10 lg:px-8">
      <FilterControls categories={categories} />
      <div className="min-w-0 flex-1">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            <strong className="text-slate-800">
              {result.meta?.total} technicians
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
        {result.data.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {result.data.map((tech) => (
              <TechnicianCard key={tech.id} tech={tech} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
            <h2 className="font-bold">No Technicians found</h2>
            <p className="mt-2 text-sm text-slate-500">
              Try a different search.
            </p>
          </div>
        )}
        <div className="mt-10"></div>
        {result.meta && <PaginationControls meta={result.meta} />}
      </div>
    </div>
  );
}
