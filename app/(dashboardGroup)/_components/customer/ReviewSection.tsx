"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ApiResponse } from "@/types/api";
import { BookingStatus } from "@/types/enums";
import { User } from "@/types/user";
import { CheckCircle2, Star } from "lucide-react";
import { useState } from "react";

export default function ReviewSection({ user }: { user: ApiResponse<User> }) {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [text, setText] = useState("");

  const toReview = user.data.customerProfile?.customerBookings?.find(
    (bookings) => bookings.status === BookingStatus.COMPLETED,
  );

  return (
    <Card className="mt-7">
      <CardHeader>
        <CardTitle>Review your latest service</CardTitle>
        <CardDescription>
          {toReview?.service?.name} with{" "}
          {toReview?.technicianProfile?.user?.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {submitted && (
            <Alert>
              <CheckCircle2 className="size-4" />
              <AlertDescription>
                Thanks for sharing your feedback with the FixItNow community.
              </AlertDescription>
            </Alert>
          )}
          <form action="" className="flex flex-col gap-6">
            <div>
              <Label>How was your experience?</Label>
              <div className="mt-3 flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={`${value} star${value > 1 ? "s" : ""}`}
                    onClick={() => setRating(value)}
                    className="rounded-md p-1 text-slate-300 transition hover:text-amber-400"
                  >
                    <Star
                      className={`size-8 ${rating >= value ? "fill-amber-400 text-amber-400" : ""}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="review">Your review</Label>
              <textarea
                id="review"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tell us about your experience..."
                className="mt-2 min-h-32 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-blue-500"
                maxLength={500}
              />
              <p className="mt-1 text-right text-xs text-slate-500">
                {text.length}/500
              </p>
            </div>
            <Button
              type="submit"
              className="w-fit bg-blue-600 hover:bg-blue-700"
              disabled={!rating || !text.trim()}
              onClick={() => setSubmitted(true)}
            >
              Submit review
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
