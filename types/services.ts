import { Category } from "./category";
import { TechnicianProfile } from "./user";

export interface Service {
  id: string;
  name: string;
  thumbnail?: string | null;
  description?: string | null;
  price: number;

  technicianId: string;
  technician?: TechnicianProfile;

  categoryId: string;
  category?: Category;

  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceRequest {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
}

export interface UpdateServiceRequest {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
}