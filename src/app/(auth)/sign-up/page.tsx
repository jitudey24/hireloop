
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { isRole, type Role } from "@/lib/auth-fields";

const inputClass =
  "h-10 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#5b6ef7]/60 focus:ring-2 focus:ring-[#5b6ef7]/30";

const ROLES = [
  { value: "seeker", label: "Seeker", hint: "Looking for work" },
  { value: "recruiter", label: "Recruiter", hint: "Hiring talent" },
  { value: "admin", label: "Admin", hint: "Platform access" },
] as const satisfies ReadonlyArray<{ value: Role; label: string; hint: string }>;

export default function SignUpPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState(false);
  const [role, setRole] = React.useState<Role>("seeker");
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(
      formData.get("confirmPassword") ?? "",
    );
    const submittedRole = String(formData.get("role") ?? "");

    setErrorMessage("");

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (!isRole(submittedRole)) {
      setErrorMessage("Please select whether you are a seeker, recruiter, or admin.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { data: hireData, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
        role: submittedRole,
      });

      if (error) {
        console.error("Signup error:", error);
        setErrorMessage(error.message || "Registration failed.");
        return;
      }

      console.log("Signup successful:", hireData);

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Create your account
        </h1>
        <p className="mt-1.5 text-sm text-white/50">
          Start landing your next role in minutes
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-white/80">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            className={inputClass}
          />
        </div>

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

        {/* Account type */}
        <div
          className="flex flex-col gap-2"
          role="radiogroup"
          aria-label="I am a"
        >
          <span className="text-sm font-medium text-white/80">
            I am a
          </span>

          <div className="grid grid-cols-3 gap-2">
            {ROLES.map((option) => {
              const selected = role === option.value;

              return (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-lg border px-2 py-2.5 text-center transition-colors focus-within:ring-2 focus-within:ring-[#5b6ef7]/30 ${
                    selected
                      ? "border-[#5b6ef7]/60 bg-[#5b6ef7]/10"
                      : "border-white/10 bg-white/[0.04] hover:border-white/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={selected}
                    onChange={() => setRole(option.value)}
                    className="sr-only"
                  />
                  <span
                    className={`block text-sm font-medium ${
                      selected ? "text-white" : "text-white/80"
                    }`}
                  >
                    {option.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-white/50">
                    {option.hint}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-white/80"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="••••••••"
              className={`${inputClass} pr-10`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition-colors hover:text-white"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-white/80"
          >
            Confirm password
          </label>

          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="••••••••"
              className={`${inputClass} pr-10`}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition-colors hover:text-white"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-2 text-sm text-white/60">
          <input
            name="terms"
            type="checkbox"
            value="accepted"
            required
            className="mt-0.5 size-4 shrink-0 rounded border-white/20 bg-white/5 accent-[#5b6ef7]"
          />
          I agree to the Terms of Service and Privacy Policy
        </label>

        {errorMessage && (
          <p className="text-sm text-red-400" role="alert">
            {errorMessage}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="mt-1 h-10 w-full bg-[#5b6ef7] text-white hover:bg-[#4c5fe6] focus-visible:border-[#5b6ef7]/40 focus-visible:ring-[#5b6ef7]/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-white/50">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-[#5b6ef7] transition-colors hover:text-[#7c8dff] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#5b6ef7]/40"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
