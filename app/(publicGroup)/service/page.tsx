import ServiceLists from "../_components/services/ServiceLists";
import ServicesSeachBar from "../_components/services/ServicesSeachBar";
import { Suspense } from "react";

export default function PublicServicesPage() {
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
          <ServicesSeachBar />
        </div>
      </div>
      <Suspense fallback={<span>Loading...</span>}>
        <ServiceLists />
      </Suspense>
    </>
  );
}
