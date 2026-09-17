import { Booking } from "./booking";
import { CustomerProfile, TechnicianProfile } from "./user";

export interface Review {
  id: string;

  bookingId: string;
  booking?: Booking;

  customerId: string;
  customer?: CustomerProfile;

  technicianId: string;
  technician?: TechnicianProfile;

  comment: string;
  rating?: number | null;

  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewRequest {
  bookingId: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewRequest {
  rating?: number;
  comment?: string;
}
