"use server";

import { isAccessTokenExist } from "@/services/refreshToken";
import { BookingStatus } from "@/types/enums";
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
