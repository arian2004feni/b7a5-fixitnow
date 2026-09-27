export function Heading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="mt-2 text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}
