"use server";

import { LoginResponse } from "@/types/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "@/types/user";

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

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

    if (decodedToken.role === Role.CUSTOMER) {
      redirect("/customer-dashboard");
    } else if (decodedToken.role === Role.TECHNICIAN) {
      redirect("/technician-dashboard");
    } else if (decodedToken.role === Role.ADMIN) {
      redirect("/admin-dashboard");
    } else redirect("/");
  }

  return result;
};
