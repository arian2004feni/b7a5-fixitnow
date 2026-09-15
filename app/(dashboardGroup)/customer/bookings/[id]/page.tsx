export default async function CustomerBookingsByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>CustomerBookingsByIdPage: {id}</div>;
}
