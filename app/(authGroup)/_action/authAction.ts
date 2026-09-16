"use server";

import { LoginResponse } from "@/lib/types";
import { cookies } from "next/headers";

export const loginAction = async (
  prevState: LoginResponse,
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const result = await res.json();
  console.log("result", result);

  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
  }

  return result;
};
