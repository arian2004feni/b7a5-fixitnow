"use server";

import { isAccessTokenExist } from "@/services/refreshToken";

export const getCustomerPayments = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_APP_URL}/api/payments`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["my-payments"],
    },
  });

  const result = await res.json();

  return result;
};

export const getSingleBookings = async (id: string) => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_APP_URL}/api/bookings/${id}`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: [`bookingId-${id}`],
    },
  });

  const result = await res.json();

  return result;
};
