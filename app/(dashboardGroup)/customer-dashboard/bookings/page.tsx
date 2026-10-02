import { Button } from "@/components/ui/button";
import PageHeading from "../../_components/customer/PageHeading";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import { getMe } from "@/services/getMe";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";
import BookingLists from "../../_components/customer/BookingLists";
import { BookingListsSkeleton } from "../../_components/customer/CustomerSkeletons";

export default async function BookingsPage() {
  const user: ApiResponse<User> = await getMe();
  const bookings = user.data.customerProfile?.customerBookings;

  return (
    <div className="flex flex-col gap-7">
      <PageHeading
        title="My bookings"
        description="Track and manage all your home services."
        action={
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/services">
              <Plus className="mr-2 size-4" />
              Book a service
            </Link>
          </Button>
        }
      />
      <Suspense fallback={<BookingListsSkeleton />}>
        <BookingLists bookings={bookings} />
      </Suspense>
    </div>
  );
}
