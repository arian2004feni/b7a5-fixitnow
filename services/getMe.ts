"use server";

import { isAccessTokenExist } from "./refreshToken";

export const getMe = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/me`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["my-profile"]
    },
  });

  const result = await res.json();

  return result;
};
