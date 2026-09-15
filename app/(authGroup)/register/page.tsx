"use client";

import Link from "next/link";
import { Eye, EyeOff, Wrench } from "lucide-react";
import { useState } from "react";
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

export default function RegisterPage() {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("customer");
  const [submitted, setSubmitted] = useState(false);
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10">
      <div className="w-full max-w-md">
        <Link href="/" className="mx-auto mb-6 flex w-fit items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-blue-600 text-white">
            <Wrench className="size-5" />
          </span>
          <span className="text-xl font-bold text-slate-950">
            FixIt<span className="text-blue-600">Now</span>
          </span>
        </Link>
        <Card className="border-slate-200 shadow-xl shadow-slate-900/5">
          <CardHeader>
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>
              Get trusted help for your home in just a few steps.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <FieldGroup>
                <Field>
                  <FieldLabel>I&apos;m joining as</FieldLabel>
                  <RadioGroup
                    value={role}
                    onValueChange={setRole}
                    className="grid grid-cols-2 gap-3"
                  >
                    <label
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm ${role === "customer" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200"}`}
                    >
                      <RadioGroupItem value="customer" />
                      Customer
                    </label>
                    <label
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm ${role === "technician" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200"}`}
                    >
                      <RadioGroupItem value="technician" />
                      Technician
                    </label>
                  </RadioGroup>
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="first">First name</FieldLabel>
                    <Input id="first" required placeholder="Jordan" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="last">Last name</FieldLabel>
                    <Input id="last" required placeholder="Davis" />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="register-email">
                    Email address
                  </FieldLabel>
                  <Input
                    id="register-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="register-password">Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={show ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="At least 8 characters"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      aria-label={show ? "Hide password" : "Show password"}
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
                </Field>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {submitted ? "Account created" : "Create account"}
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
      </div>
    </main>
  );
}
