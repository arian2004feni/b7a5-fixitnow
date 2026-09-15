export default async function PublicTechnicianByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>PublicTechnicianByIdPage: {id}</div>;
}
