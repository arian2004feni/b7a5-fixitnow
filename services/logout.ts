"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function logout() {
  const cookieStore = await cookies();
  
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  revalidateTag("my-profile", "max");
}
