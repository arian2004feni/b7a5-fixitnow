import { TechnicianProfile } from "@/types/user";
import { getTechnicians } from "../../_actions/publicActions";
import { ApiResponse } from "@/types/api";
import { MobileFilterButton } from "../MobileFilterButton";
import { ChevronDown } from "lucide-react";
import TechnicianCard from "./TechnicianCard";

export default async function TechnicianLists() {
  const result: ApiResponse<TechnicianProfile[]> = await getTechnicians();
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
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
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {result.data.map((tech) => (
          <TechnicianCard key={tech.id} tech={tech} />
        ))}
      </div>
    </div>
  );
}
