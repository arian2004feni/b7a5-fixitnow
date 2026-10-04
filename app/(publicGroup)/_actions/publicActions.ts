"use server";

import { isAccessTokenExist } from "@/services/refreshToken";
import { revalidateTag } from "next/cache";

export const getServices = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  // Bad Approach
  // const searchTerm = `${search?.searchTerm ? `?searchTerm=${search.searchTerm}` : ""}`;

  const params = new URLSearchParams();

  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }

  if (query && query.page) {
    params.set("page", query.page as string);
  }

  if (query && query.limit) {
    params.set("limit", query.limit as string);
  }

  if (query && query.location) {
    params.set("location", query.location as string);
  }

  if (query && query.minPrice) {
    params.set("minPrice", query.minPrice as string);
  }

  if (query && query.maxPrice) {
    params.set("maxPrice", query.maxPrice as string);
  }

  if (query && query.sortBy) {
    params.set("sortBy", query.sortBy as string);
  }

  if (query && query.sortOrder) {
    params.set("sortOrder", query.sortOrder as string);
  }

  if (query && query.category) {
    params.set("category", query.category as string);
  }

  const res = await fetch(
    `${process.env.BACKEND_APP_URL}/api/services?${params.toString()}`,
    {
      cache: "force-cache",
      next: {
        tags: ["public-services"],
        revalidate: 60 * 60 * 24,
      },
    },
  );

  const result = await res.json();

  return result;
};

export const getTechnicians = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const params = new URLSearchParams();

  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }

  const res = await fetch(
    `${process.env.BACKEND_APP_URL}/api/technician?${params.toString()}`,
    {
      cache: "force-cache",
      next: {
        tags: ["public-technicians"],
        revalidate: 60 * 60 * 24,
      },
    },
  );

  const result = await res.json();

  return result;
};

export const getSingleTechnician = async (id: string) => {
  const res = await fetch(
    `${process.env.BACKEND_APP_URL}/api/technician/${id}`,
    {
      cache: "force-cache",
      next: {
        tags: [`public-technician-${id}`],
        revalidate: 60 * 60 * 24,
      },
    },
  );

  const result = await res.json();

  return result;
};

export async function createBookingAction(payload: {
  technicianId: string;
  serviceId: string;
  timeSlotId: string;
  note?: string;
}) {
  const token = await isAccessTokenExist();

  if (typeof token !== "string" && !token?.success) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(`${process.env.BACKEND_APP_URL}/api/bookings`, {
    method: "POST",
    headers: {
      Cookie: `accessToken=${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-profile", {
      expire: 0,
    });
  }
  
  return result;
}
