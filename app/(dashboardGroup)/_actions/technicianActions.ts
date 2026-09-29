"use server";

import { isAccessTokenExist } from "@/services/refreshToken";
import { ApiResponse } from "@/types/api";
import { AvailabilitySlot } from "@/types/availability";
import { BookingStatus, DayOfWeek } from "@/types/enums";
import { Service } from "@/types/services";
import { revalidateTag } from "next/cache";

export const changeBookingStatus = async (
  id: string,
  payload: { status: BookingStatus },
) => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_APP_URL}/api/technician/bookings/${id}`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-profile", {
      expire: 0,
    });
  }

  return result;
};

export const startJob = async (
  id: string,
  payload: { status: BookingStatus },
) => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_APP_URL}/api/technician/start/bookings/${id}`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-profile", {
      expire: 0,
    });
  }

  return result;
};

export const completeJob = async (
  id: string,
  payload: { status: BookingStatus },
) => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_APP_URL}/api/technician/complete/bookings/${id}`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-profile", {
      expire: 0,
    });
  }

  return result;
};

export const getCategories = async () => {
  const res = await fetch(
    `${process.env.BACKEND_APP_URL}/api/admin/categories`,
  );

  const result = await res.json();

  return result;
};

export const createService = async (
  prevState: ApiResponse<Service>,
  formData: FormData,
) => {
  const payload = {
    name: formData.get("name"),
    category: formData.get("category"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    duration: Number(formData.get("duration")),
    thumbnail: formData.get("thumbnail"),
  };

  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_APP_URL}/api/services`, {
    method: "POST",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-profile", {
      expire: 0,
    });
    revalidateTag("public-services", {
      expire: 0,
    });
  }

  return result;
};

export const updateService = async (
  prevState: ApiResponse<Service>,
  formData: FormData,
) => {
  const payload = {
    id: formData.get("id"),
    name: formData.get("name"),
    category: formData.get("category"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    duration: Number(formData.get("duration")),
    thumbnail: formData.get("thumbnail"),
  };

  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_APP_URL}/api/services/${payload.id}`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-profile", {
      expire: 0,
    });
    revalidateTag("public-services", {
      expire: 0,
    });
  }

  return result;
};

export const deleteService = async (id: string) => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_APP_URL}/api/services/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-profile", {
      expire: 0,
    });
    revalidateTag("public-services", {
      expire: 0,
    });
  }

  return result;
};

export const createAvailability = async (
  prevState: ApiResponse<AvailabilitySlot[]>,
  formData: FormData,
) => {
  const payload = {
    availability: [
      DayOfWeek.SATURDAY,
      DayOfWeek.SUNDAY,
      DayOfWeek.MONDAY,
      DayOfWeek.TUESDAY,
      DayOfWeek.WEDNESDAY,
      DayOfWeek.THURSDAY,
      DayOfWeek.FRIDAY,
    ].map((d) => {
      return {
        dayOfWeek: formData.get(`dayOfWeek-${d}`),
        startTime: formData.get(`startTime-${d}`),
        endTime: formData.get(`endTime-${d}`),
      };
    }),
  };

  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_APP_URL}/api/technician/availability`,
    {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-profile", {
      expire: 0,
    });
    // revalidateTag("public-services", {
    //   expire: 0,
    // });
  }

  return result;
};

export const updateAvailability = async (
  prevState: ApiResponse<AvailabilitySlot[]>,
  formData: FormData,
) => {
  const payload = {
    id: formData.get("id"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
  };

  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_APP_URL}/api/technician/availability/${payload.id}`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-profile", {
      expire: 0,
    });
    // revalidateTag("public-services", {
    //   expire: 0,
    // });
  }

  return result;
};
