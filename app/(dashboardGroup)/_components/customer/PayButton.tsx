"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getPaymentUrl } from "../../_actions/customerActions";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="mt-2 bg-blue-500 hover:bg-blue-400"
    >
      {pending ? "Generating" : "Continue to secure payment"}

      {pending ? (
        <Spinner data-icon="inline-start" />
      ) : (
        <ArrowRight className="ml-2 size-4" />
      )}
    </Button>
  );
}

export function PayButton({ bookingId }: { bookingId: string }) {
  const handlePaymentInitiate = async () => {
    const result = await getPaymentUrl(bookingId);
    if(!result.success){
      toast.error("payment initialization failed")
    }
  };

  return (
    <form action={handlePaymentInitiate} className="mt-6 text-center">
      <SubmitButton />
    </form>
  );
}
