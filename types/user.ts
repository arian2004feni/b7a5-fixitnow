import { CustomerProfile } from "./customer";
import { TechnicianProfile } from "./technician";

export enum Role {
  CUSTOMER = "CUSTOMER",
  TECHNICIAN = "TECHNICIAN",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BANNED = "BANNED",
}

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
