"use server";

import { isAccessTokenExist } from "@/services/refreshToken";
import { ApiResponse } from "@/types/api";
import { CreatePaymentResponse } from "@/types/payment";
import { redirect } from "next/navigation";

export const getCustomerPayments = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_APP_URL}/api/payments`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
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
    cache: "no-store",
  });

  const result = await res.json();

  return result;
};

export const getPaymentDetails = async (id: string) => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_APP_URL}/api/payments/${id}`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  });

  const result = await res.json();

  return result;
};

export const getPaymentUrl = async (bookingId: string) => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_APP_URL}/api/payments/create`,
    {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ bookingId }),
    },
  );

  const result: ApiResponse<CreatePaymentResponse> = await res.json();

  if (result.success && result.data.checkoutUrl) {
    redirect(result.data.checkoutUrl);
  }

  return result;
};
