import { Button } from "@/components/ui/button";
import { Booking } from "@/types/booking";
import { BookingStatus } from "@/types/enums";

export function Actions({
  booking,
  onAction,
}: {
  booking: Booking;
  onAction: (action: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {booking.status === BookingStatus.REQUESTED && (
        <>
          <Button
            size="sm"
            onClick={() => onAction("Accept")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Accept
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAction("Decline")}
          >
            Decline
          </Button>
        </>
      )}
      {booking.status === BookingStatus.PAID && (
        <Button size="sm" onClick={() => onAction("Start")}>
          Start job
        </Button>
      )}
      {booking.status === BookingStatus.IN_PROGRESS && (
        <Button size="sm" onClick={() => onAction("Complete")}>
          Complete job
        </Button>
      )}
      {booking.status === BookingStatus.COMPLETED && (
        <Button size="sm" variant="outline">
          View
        </Button>
      )}
      {booking.status === BookingStatus.DECLINED && (
        <Button size="sm" variant="outline">
          View
        </Button>
      )}
      {booking.status === BookingStatus.CANCELLED && (
        <Button size="sm" variant="outline">
          View
        </Button>
      )}
      {booking.status === BookingStatus.ACCEPTED && (
        <Button size="sm" variant="outline">
          View
        </Button>
      )}
    </div>
  );
}
