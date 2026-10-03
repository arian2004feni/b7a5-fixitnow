"use client";

import Link from "next/link";
import { Eye, EyeOff, Loader2, UserRound, Wrench } from "lucide-react";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { registerAction } from "../_action/authAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { ApiResponse } from "@/types/api";

export default function RegisterPage() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [state, action, pending] = useActionState(
    async (prevState: ApiResponse<User>, formData: FormData) => {
      const result = await registerAction(prevState, formData);

      if (result.success && result.data) {
        toast.success(result.message);
        router.push("/login");
      } else {
        toast.error(result.message);
      }
      return result;
    },
    false,
  );

  return (
    <Card className="border-slate-200 shadow-xl shadow-slate-900/5">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create your FixItNow account</CardTitle>
        <CardDescription>
          Choose your role and start using trusted home services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <FieldGroup>
            {state?.success === false && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {state.message ||
                  "Registration failed. Please check your information."}
              </div>
            )}
            <Field>
              <FieldLabel>I&apos;m joining as</FieldLabel>
              <RadioGroup
                name="role"
                defaultValue="CUSTOMER"
                className="grid grid-cols-2 gap-3"
              >
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm">
                  <RadioGroupItem value="CUSTOMER" />{" "}
                  <UserRound className="size-4" />
                  Customer
                </label>
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm">
                  <RadioGroupItem value="TECHNICIAN" />{" "}
                  <Wrench className="size-4" />
                  Technician
                </label>
              </RadioGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input
                id="name"
                name="name"
                required
                placeholder="Your full name"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={show ? "text" : "password"}
                  minLength={8}
                  required
                  placeholder="At least 8 characters"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {show ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              <FieldDescription>Use at least 8 characters.</FieldDescription>
            </Field>
            <Button
              disabled={pending}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
              {pending ? "Creating account" : "Create account"}
            </Button>
            <FieldDescription className="text-center">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-blue-600">
                Sign in
              </Link>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
