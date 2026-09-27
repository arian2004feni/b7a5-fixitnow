import PageHeading from "../../_components/customer/PageHeading";
import { Suspense } from "react";
import ReviewSection from "../../_components/customer/ReviewSection";
import { getMe } from "@/services/getMe";

export default async function ReviewsPage() {
  const user = await getMe();
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeading
        title="Reviews"
        description="Share feedback about your completed services."
      />

      <Suspense fallback={<span>Loading</span>}>
        <ReviewSection user={user}/>
      </Suspense>
    </div>
  );
}
