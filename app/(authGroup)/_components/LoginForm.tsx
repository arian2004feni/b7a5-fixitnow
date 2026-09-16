"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { loginAction } from "../_action/authAction";

export default function LoginForm() {
  const [show, setShow] = useState(false);
  return (
    <form action={loginAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email address</FieldLabel>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </Field>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="text-xs font-medium text-blue-600 hover:underline cursor-pointer">
              Forgot password?
            </div>
          </div>
          <InputGroup>
            <InputGroupInput
              name="password"
              id="password"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputGroupAddon align="inline-end" className="cursor-pointer">
              <span onClick={() => setShow(!show)}>
                {show ? (
                  <EyeIcon className="size-4" />
                ) : (
                  <EyeOffIcon className="size-4" />
                )}
              </span>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Sign in
        </Button>
        <FieldDescription className="text-center">
          New to FixItNow?{" "}
          <Link href="/register" className="font-semibold text-blue-600">
            Create an account
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
