export default async function AdminManageUserByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>AdminManageUserByIdPage: {id}</div>;
}
