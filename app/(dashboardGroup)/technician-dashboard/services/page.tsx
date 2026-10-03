import { Suspense } from "react";
import TechnicianServiceLists from "../../_components/technician/ServicesLists";
import { getMe } from "@/services/getMe";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";
import { getCategories } from "../../_actions/technicianActions";
import { Category } from "@/types/category";
import { TechnicianServicesLoading } from "../../_components/technician/TechnicianSkeletons";

export default async function TechnicianServices() {
  const user: ApiResponse<User> = await getMe();
  const categories: ApiResponse<Category[]> = await getCategories();

  const servicesData = user.data.technicianProfile?.services;
  return (
    <div className="flex flex-col gap-7">
      {servicesData && (
        <Suspense fallback={<TechnicianServicesLoading />}>
          <TechnicianServiceLists
            services={servicesData}
            categories={categories}
          />
        </Suspense>
      )}
    </div>
  );
}
