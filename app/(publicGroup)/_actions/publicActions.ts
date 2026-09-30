"use server";

export const getServices = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  // Bad Approach
  // const searchTerm = `${search?.searchTerm ? `?searchTerm=${search.searchTerm}` : ""}`;

  const params = new URLSearchParams();

  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }

  const res = await fetch(
    `${process.env.BACKEND_APP_URL}/api/services?${params.toString()}`,
    {
      cache: "force-cache",
      next: {
        tags: ["public-services"],
        revalidate: 60 * 60 * 24,
      },
    },
  );

  const result = await res.json();

  return result;
};

export const getTechnicians = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const params = new URLSearchParams();

  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }

  const res = await fetch(
    `${process.env.BACKEND_APP_URL}/api/technician?${params.toString()}`,
    {
      cache: "force-cache",
      next: {
        tags: ["public-technicians"],
        revalidate: 60 * 60 * 24,
      },
    },
  );

  const result = await res.json();

  return result;
};

export const getSingleTechnician = async (id: string) => {
  const res = await fetch(
    `${process.env.BACKEND_APP_URL}/api/technician/${id}`,
    {
      cache: "force-cache",
      next: {
        tags: [`public-technician-${id}`],
        revalidate: 60 * 60 * 24,
      },
    },
  );

  const result = await res.json();

  return result;
};
