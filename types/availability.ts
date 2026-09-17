import { Booking } from "./booking";
import { DayOfWeek } from "./enums";
import { TechnicianProfile } from "./user";

export interface AvailabilitySlot {
  id: string;

  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;

  technicianId: string;
  technician?: TechnicianProfile;

  booking?: Booking;

  createdAt: string;
  updatedAt: string;
}

export interface CreateAvailabilitySlotRequest {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
}

export interface UpdateAvailabilityRequest {
  availability: CreateAvailabilitySlotRequest[];
}
