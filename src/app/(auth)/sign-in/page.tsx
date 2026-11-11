"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const inputClass =
  "h-10 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#5b6ef7]/60 focus:ring-2 focus:ring-[#5b6ef7]/30";

export default function SignInPage() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget));

    // TODO: integrate auth (e.g. authClient.signIn) here.
    console.log("[sign-in] form data:", formData);
  }

  return (
    <div>
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-white/50">
          Sign in to continue to hireLoop
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-white/80">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-white/80"
            >
              Password
            </label>
            <button
              type="button"
              className="text-xs text-white/50 transition-colors hover:text-[#7c8dff] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#5b6ef7]/40"
            >
              Forgot password?
            </button>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className={inputClass}
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-white/60">
          <input
            name="rememberMe"
            type="checkbox"
            value="true"
            className="size-4 rounded border-white/20 bg-white/5 accent-[#5b6ef7]"
          />
          Remember me
        </label>

        <Button
          type="submit"
          className="mt-1 h-10 w-full bg-[#5b6ef7] text-white hover:bg-[#4c5fe6] focus-visible:border-[#5b6ef7]/40 focus-visible:ring-[#5b6ef7]/30"
        >
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-white/50">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-[#5b6ef7] transition-colors hover:text-[#7c8dff] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#5b6ef7]/40"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
