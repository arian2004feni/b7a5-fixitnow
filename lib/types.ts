// login

export interface LoginData {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: LoginData;
}

// registratin

export interface CustomerProfile {
  id: string;
  profilePhoto: string | null;
  bio: string | null;
  location: string | null;
  mobileNumber: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TechnicianProfile {
  id: string;
  profilePhoto: string | null;
  bio: string | null;
  location: string | null;
  mobileNumber: string | null;
  experienceYears: number;
  averageRating: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  status: "ACTIVE" | string;
  createdAt: string;
  updatedAt: string;
  customerProfile: CustomerProfile | null;
  technicianProfile: TechnicianProfile | null;
}

export interface RegistrationData {
  user: User;
}

export interface RegisterUserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: RegistrationData;
}

// getMe
