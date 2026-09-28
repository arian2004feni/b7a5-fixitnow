import { Heading } from "../../_components/technician/Heading";
import { Suspense } from "react";
import TechnicianBookingLists from "../../_components/technician/BookingLists";
import { ApiResponse } from "@/types/api";
import { getMe } from "@/services/getMe";
import { User } from "@/types/user";

export default async function TechnicianBookings() {
  const user: ApiResponse<User> = await getMe();
  const bookings = user.data.technicianProfile?.bookings;
  return (
    <div className="flex flex-col gap-7">
      <Heading
        title="Bookings"
        description="Manage requests and keep customers updated."
      />
      <Suspense>
        {bookings && <TechnicianBookingLists bookings={bookings} />}
      </Suspense>
    </div>
  );
}
