import { Service } from "./services";

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;

  services?: Service[];

  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
}
