"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "cn";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession , signOut } from "@/lib/auth-client";

const navLinks = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/company", label: "Company" },
  { href: "/pricing", label: "Pricing" },
] as const;

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const {data:session} = useSession();
  console.log("hire session", session);
  const close = () => setOpen(false);

  const logo = (
    <Link
      href="/"
      aria-label="hireLoop home"
      className="inline-flex items-center outline-none focus-visible:rounded-md focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Image
        src="/images/logo.png"
        alt="hireLoop"
        width={154}
        height={44}
        className="h-6 w-auto sm:h-7"
        preload
      />
    </Link>
  );

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="dark sticky top-0 z-50 text-foreground">
      <div className="mx-auto w-full max-w-6xl px-3 py-3 sm:px-5 sm:py-4">
        <nav
          aria-label="Main"
          className={cn(
            "flex h-12 items-center justify-between gap-3 rounded-2xl px-4 sm:h-14 sm:px-5",
            // On the home hero the nav sits over the glow: keep it borderless
            // and unfilled so the background reads like the design.
            pathname === "/"
              ? "border border-transparent"
              : "border border-white/[0.06] bg-white/[0.04]",
          )}
        >
          {logo}

          {/* Desktop navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/80 transition-colors hover:text-foreground focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {link.label}
              </Link>
            ))}

            <span aria-hidden className="h-4 w-px bg-white/10" />

           { session?.user ?
            <>
              <span className="text-[#ededef]">Wellcome, {session.user.name}</span>
                <Button
              onClick={handleSignOut}
              className="text-sm font-medium text-[#5b6ef7] transition-colors hover:text-[#7c8dff] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Sign out
            </Button>
            </>
           :
            <>
               <Link
              href="/sign-in"
              className="text-sm font-medium text-[#5b6ef7] transition-colors hover:text-[#7c8dff] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({
                  className:
                    "h-9 px-4 bg-[#5b6ef7] text-white hover:bg-[#4c5fe6] focus-visible:border-[#5b6ef7]/40 focus-visible:ring-[#5b6ef7]/30",
                })
              )}
            >
              Get Started
            </Link>
            </>
           }
          </div>

          {/* Mobile navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="-mr-2 size-9 text-foreground md:hidden"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="dark gap-0 border-white/10 p-0 sm:max-w-xs"
            >
              <SheetHeader className="border-b border-white/10 p-4">
                <SheetTitle className="text-base text-foreground">
                  {logo}
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-1 flex-col gap-1 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="rounded-lg px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-white/[0.06] hover:text-foreground focus-visible:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {link.label}
                  </Link>
                ))}

                <div aria-hidden className="my-2 h-px bg-white/10" />

                <Link
                  href="/sign-in"
                  onClick={close}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#5b6ef7] transition-colors hover:bg-white/[0.06] hover:text-[#7c8dff] focus-visible:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  Sign In
                </Link>
              </div>

              <div className="flex flex-col gap-2 border-t border-white/10 p-4">
                <Link
                  href="/sign-up"
                  onClick={close}
                  className={cn(
                    buttonVariants({
                      className:
                        "h-9 w-full bg-[#5b6ef7] text-white hover:bg-[#4c5fe6] focus-visible:border-[#5b6ef7]/40 focus-visible:ring-[#5b6ef7]/30",
                    })
                  )}
                >
                  Get Started
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
