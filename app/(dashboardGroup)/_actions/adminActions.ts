"use server";

import { isAccessTokenExist } from "@/services/refreshToken";
import { AdminStats } from "@/types/admin";
import { ApiResponse } from "@/types/api";
import { Booking } from "@/types/booking";
import { Category } from "@/types/category";
import { User } from "@/types/user";

const API_URL = process.env.BACKEND_APP_URL;

if (!API_URL) {
  throw new Error("BACKEND_APP_URL is not configured");
}

async function adminFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  const accessToken = await isAccessTokenExist();

  const response = await fetch(`${API_URL}/api/admin${endpoint}`, {
    ...options,

    // credentials: "include",

    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
      ...(options?.headers ?? {}),
    },

    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        "Something went wrong while communicating with the server.",
    );
  }

  return result;
}

export async function getAdminUsers() {
  return adminFetch<User[]>("/users");
}

export async function getAdminUser(id: string) {
  return adminFetch<User>(`/users/${id}`);
}

export async function getAdminBookings() {
  return adminFetch<Booking[]>("/bookings");
}

export async function getAdminCategories() {
  return adminFetch<Category[]>("/categories");
}

export async function createAdminCategory(payload: {
  name: string;
  description: string;
}) {
  return adminFetch<Category>("/categories", {
    method: "POST",

    body: JSON.stringify(payload),
  });
}

export async function getAdminStats() {
  return adminFetch<AdminStats>("/stats");
}
