export interface CustomerProfile {
  id: string;
  profilePhoto?: string | null;
  bio?: string | null;
  location?: string | null;
  mobileNumber?: string | null;

  userId: string;

  createdAt: string;
  updatedAt: string;
}