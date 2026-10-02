import { ChevronDown } from "lucide-react";
import { getServices } from "../../_actions/publicActions";
import { ServiceCards } from "./ServiceCards";
import { FilterControls } from "../FilterControls";
import { MobileFilterButton } from "../MobileFilterButton";
import { Service } from "@/types/services";
import { ApiResponse, PaginationMeta } from "@/types/api";
import { Category } from "@/types/category";
import { getCategories } from "@/app/(dashboardGroup)/_actions/technicianActions";
import { PaginationControls } from "../PaginationControls";

export default async function ServiceLists({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const services: ApiResponse<Service[]> = await getServices({ query });
  const categories: ApiResponse<Category[]> = await getCategories();
  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-5 py-10 lg:px-8">
      <FilterControls categories={categories} />
      <div className="min-w-0 flex-1">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            <strong className="text-slate-800">
              {services.meta?.total} services
            </strong>{" "}
            available near you
          </p>
          {/* <div className="flex gap-2">
            <MobileFilterButton />
            <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600">
              Sort: Recommended <ChevronDown className="size-4" />
            </button>
          </div> */}
        </div>
        {services.data.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.data.map((service: Service) => (
              <ServiceCards key={service.id} service={service} />
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
        <div className="mt-10"></div>
        {services.meta && <PaginationControls meta={services.meta} />}
      </div>
    </div>
  );
}
