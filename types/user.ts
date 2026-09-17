import { AvailabilitySlot } from "./availability";
import { Booking } from "./booking";
import { Role, UserStatus } from "./enums";
import { Review } from "./reviews";
import { Service } from "./services";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;

  customerProfile?: CustomerProfile | null;
  technicianProfile?: TechnicianProfile | null;
}

export interface CustomerProfile {
  id: string;
  profilePhoto?: string | null;
  bio?: string | null;
  location?: string | null;
  mobileNumber?: string | null;

  userId: string;
  user?: User;

  createdAt: string;
  updatedAt: string;

  customerBookings?: Booking[];
  reviewsGiven?: Review[];
}

export interface TechnicianProfile {
  id: string;
  profilePhoto?: string | null;
  bio?: string | null;
  location?: string | null;
  mobileNumber?: string | null;

  experienceYears: number;
  averageRating: number;

  userId: string;

  createdAt: string;
  updatedAt: string;

  user?: User;
  services?: Service[];
  availabilitySlots?: AvailabilitySlot[];
  bookings?: Booking[];
  reviewsReceived?: Review[];
}
