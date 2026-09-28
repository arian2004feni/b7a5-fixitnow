import { toast } from "sonner";
import {
  changeBookingStatus,
  completeJob,
  startJob,
} from "../_actions/technicianActions";
import { BookingStatus } from "@/types/enums";
import { ApiResponse } from "@/types/api";
import { Booking } from "@/types/booking";

export const handleBookingStatusChange = async (id: string, action: string) => {
  if (action === "Accept") {
    const result: ApiResponse<Booking> = await changeBookingStatus(id, {
      status: BookingStatus.ACCEPTED,
    });
    if (result.success) {
      toast.success("Accepted");
    } else {
      toast.error("failed");
    }
    return result;
  }
  if (action === "Decline") {
    const result: ApiResponse<Booking> = await changeBookingStatus(id, {
      status: BookingStatus.DECLINED,
    });
    if (result.success) {
      toast.success("Declined");
    } else {
      toast.error("failed");
    }
    return result;
  }
  if (action === "Start") {
    const result: ApiResponse<Booking> = await startJob(id, {
      status: BookingStatus.IN_PROGRESS,
    });
    if (result.success) {
      toast.success("Started");
    } else {
      toast.error("failed");
    }
    return result;
  }
  if (action === "Complete") {
    const result: ApiResponse<Booking> = await completeJob(id, {
      status: BookingStatus.COMPLETED,
    });
    if (result.success) {
      toast.success("Completed");
    } else {
      toast.error("failed");
    }
    return result;
  }
};
