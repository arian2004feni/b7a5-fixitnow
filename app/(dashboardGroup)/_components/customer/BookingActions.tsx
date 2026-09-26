import { Button } from "@/components/ui/button";
import { Booking } from "@/types/booking";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function BookingActions({
  booking,
  onCancel,
}: {
  booking: Booking;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" asChild>
        <Link href={`/customer-dashboard/bookings/${booking.id}`}>
          <Eye className="mr-1.5 size-3.5" />
          View
        </Link>
      </Button>
      {booking.status === "ACCEPTED" && (
        <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href={`/customer-dashboard/bookings/${booking.id}/pay`}>
            Pay now
          </Link>
        </Button>
      )}
      {booking.status === "COMPLETED" && (
        <Button variant="outline" size="sm" asChild>
          <Link href="/customer-dashboard/reviews">Leave review</Link>
        </Button>
      )}
      {["REQUESTED", "ACCEPTED"].includes(booking.status) && (
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      )}
    </div>
  );
}