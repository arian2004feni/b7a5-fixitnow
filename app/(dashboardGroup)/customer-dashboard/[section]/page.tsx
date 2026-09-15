import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CustomerSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const title = section.charAt(0).toUpperCase() + section.slice(1);
  return (
    <div className="mx-auto max-w-3xl">
      <Button variant="ghost" asChild className="mb-6 -ml-3 text-slate-500">
        <Link href="/customer-dashboard">
          <ArrowLeft className="mr-2 size-4" />
          Back to overview
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-slate-500">
            This customer area is ready for your account data.
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl bg-slate-50 p-10 text-center">
            <CalendarDays className="mx-auto size-10 text-blue-600" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Your {section} will appear here
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Connect your backend to make this section fully functional. For
              now, explore the FixItNow marketplace to find your next service.
            </p>
            <Button asChild className="mt-6 bg-blue-600 hover:bg-blue-700">
              <Link href="/services">Browse services</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
