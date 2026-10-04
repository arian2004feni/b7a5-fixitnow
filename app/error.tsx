"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Send error to your monitoring service in production
    console.error("FixItNow Error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-lg text-center">
        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>

        {/* Error Code */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Something went wrong
        </p>

        {/* Heading */}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          We couldn&apos;t load this page
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Something unexpected happened while loading this page. You can try
          again or return to the FixItNow homepage.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={() => reset()} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>

          <Button asChild variant="outline" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Secondary Navigation */}
        <div className="mt-6">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href="/services">
              <ArrowLeft className="h-4 w-4" />
              Browse Services
            </Link>
          </Button>
        </div>

        {/* Development-only Error Information */}
        {process.env.NODE_ENV === "development" && (
          <details className="mt-10 rounded-lg border bg-muted/50 p-4 text-left">
            <summary className="cursor-pointer text-sm font-medium">
              Developer error details
            </summary>

            <div className="mt-3 space-y-2">
              <p className="wrap-break-word text-xs text-muted-foreground">
                {error.message}
              </p>

              {error.digest && (
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium">Digest:</span> {error.digest}
                </p>
              )}
            </div>
          </details>
        )}
      </div>
    </main>
  );
}
