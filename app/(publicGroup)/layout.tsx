import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { getMe } from "@/services/getMe";

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const user = await getMe();
  return (
    <>
      <Navbar user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
