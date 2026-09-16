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
}
