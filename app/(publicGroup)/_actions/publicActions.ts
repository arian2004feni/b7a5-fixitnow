"use server";

export const getServices = async () => {
  const res = await fetch(`${process.env.BACKEND_APP_URL}/api/services`, {
    cache: "force-cache",
    next: {
      tags: ["public-services"],
      revalidate: 60 * 60 * 24,
    },
  });

  const result = await res.json();

  return result;
};
