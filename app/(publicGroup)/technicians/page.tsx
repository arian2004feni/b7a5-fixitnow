import { Suspense } from "react";
import TechnicianSeachBar from "../_components/technicians/TechnicianSearchBar";
import TechnicianLists from "../_components/technicians/TechnicianLists";

export default function TechniciansPage() {
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
          <TechnicianSeachBar />
        </div>
      </div>
      <Suspense fallback={<span>Loading...</span>}>
        <TechnicianLists />
      </Suspense>
    </>
  );
}
