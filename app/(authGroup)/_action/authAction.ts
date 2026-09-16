"use server";

import { LoginResponse } from "@/lib/types";

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

  return result;
};
