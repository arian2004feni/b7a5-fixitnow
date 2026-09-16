import Logo from "./_components/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
        <div className="w-full max-w-md">
          <Logo />
          {children}
        </div>
      </main>
    </>
  );
}
