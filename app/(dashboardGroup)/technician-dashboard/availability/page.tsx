import { getMe } from "@/services/getMe";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";
import { Suspense } from "react";
import AvailabilityLists from "../../_components/technician/AvailabilityLists";

export default async function TechnicianAvailability() {
  const user: ApiResponse<User> = await getMe();
  const availability = user.data.technicianProfile?.availabilitySlots;
  return (
    <div className="flex flex-col gap-7">
      <Suspense>
        {availability && <AvailabilityLists availability={availability} />}
      </Suspense>
    </div>
  );
}
