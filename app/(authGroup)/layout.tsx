import Logo from "../../components/shared/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex flex-col gap-8 min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
          <Logo />
        <div className="w-full max-w-sm space-y-8">
          {children}
        </div>
      </main>
    </>
  );
}
