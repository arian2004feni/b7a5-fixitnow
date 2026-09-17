import { AvailabilitySlot } from "./availability";
import { BookingStatus } from "./enums";
import { Payment } from "./payment";
import { Review } from "./reviews";
import { Service } from "./services";
import { CustomerProfile, TechnicianProfile } from "./user";

export interface Booking {
  id: string;

  customerId: string;
  customerProfile?: CustomerProfile;

  technicianId: string;
  technicianProfile?: TechnicianProfile;

  serviceId: string;
  service?: Service;

  timeSlotId: string;
  timeSlot?: AvailabilitySlot;

  status: BookingStatus;
  note?: string | null;

  payments?: Payment | null;
  reviews?: Review[];

  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  technicianId: string;
  serviceId: string;
  timeSlotId: string;
  note?: string;
}

export interface UpdateBookingStatusRequest {
  status: BookingStatus;
}
