"use server";
import { isAccessTokenExist } from "@/services/refreshToken";
import { revalidateTag } from "next/cache";
export async function updateTechnicianProfile(
  payload: Record<string, unknown>,
) {
  const token = await isAccessTokenExist();
  const res = await fetch(
    `${process.env.BACKEND_APP_URL}/api/technician/profile`,
    {
      method: "PUT",
      headers: {
        Cookie: `accessToken=${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    },
  );
  const result = await res.json();
  if (result.success) revalidateTag("my-profile", { expire: 0 });
  return result;
}
export async function updateCustomerProfile(payload: Record<string, unknown>) {
  const token = await isAccessTokenExist();
  const res = await fetch(
    `${process.env.BACKEND_APP_URL}/api/customer/profile`,
    {
      method: "PUT",
      headers: {
        Cookie: `accessToken=${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    },
  );
  const result = await res.json();
  if (result.success) revalidateTag("my-profile", { expire: 0 });
  return result;
}
